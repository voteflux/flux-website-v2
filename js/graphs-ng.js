import 'babel-polyfill';
import {processDonationGraphs} from "./dashboardGraphLogic";

var fluxApp = angular.module('fluxApp', []);

// NOTE: This is just for dashboard.html; and is separate to the FluxController in members.html and membership-ng.js, etc
fluxApp.controller('GraphsController', ['$scope', '$log', '$rootScope', '$http', function ($scope, $log, $rootScope, $http) {
  $rootScope._ = _;

  var flux = this;
  flux.membershipError = '';
  $scope._showExtraGraphs = false;
  flux.signupVolunteer = false;
  flux.growthDays = [];  // note: set later on to trigger redraw
  flux.nameTempVar = "Dashboard";
  flux.averageMonthlyGrowth = 0;
  flux.getinfo = {n_members_state: {}, n_members_validated_state: {}, n_members_not_valid_state: {}, validation_queue_state: {}};

  $scope.queueData = {email_queue_length: 0, sms_queue_length: 0}

  flux.debug = false;
  if (document.location.hostname === 'localhost') {
    flux.debug = true;
  }

  flux.handleError = function (error) {
    $log.log('An error occured:');
    $log.log(error);
  };

  flux.api = function (path) {
    if (flux.debug) {
      return "http://localhost:5000/api/v0/" + path;
    } else if (getParam && getParam('useDev')) {
      return "https://flux-api-dev.herokuapp.com/" + path;
    }
    return "https://api.voteflux.org/api/v0/" + path;
  };

  flux.growthStat = function (d) {
    return 0;
  };

  $http.get(flux.api('queue_stats')).then(data => {
    $scope.queueData = data.data
    console.log("got queue data", $scope.queueData)
  }, flux.handleError)


  $http.get(flux.api('getinfo')).then(function (data) {
    flux.getinfo = data.data;
    console.log("Got getinfo: ", flux.getinfo);
  }, flux.handleError);


  // generate graphs from public stats
  $http.get(flux.api('public_stats')).then(function (data) {
    $log.log("Got public stats ---V ");
    $log.log(data['data']);

    // members over time
    var tss = _.map(data.data.signup_times, function (ts) {
      return new Date(ts * 1000);
    });
    if (_.first(tss) > _.last(tss)) {
      tss.reverse();
    }
    var ns = _.range(1, tss.length + 1);
    var plotData = [{x: tss, y: ns, type: 'scatter'}];
    Plotly.newPlot('membershipChart', plotData, {title: 'Members v Time'});

    // dob years histogram
    var years = Object.keys(data.data.dob_years);
    years.sort();
    var year_freq = _.map(years, function (y) {
      return data.data.dob_years[y]
    });
    var plotData2 = [{x: years, y: year_freq, type: 'bar'}];
    Plotly.newPlot('memberDobYearChart', plotData2, {title: 'Member Years of Birth'});

    // states histogram
    var states = Object.keys(data.data['states']);
    states.sort();
    var state_n = _.map(states, function (y) {
      return data.data['states'][y]
    });
    var plotData3 = [{x: states, y: state_n, type: 'bar'}];
    Plotly.newPlot('memberStateChart', plotData3, {title: 'Member States'});

    // members over last 60 days and 7 days (hourly)
    var nDays = 60;
    var nDaysForHours = 7;
    var _now = Date.now();
    var _7_days_ago = _now - (nDaysForHours * 24 * 60 * 60 * 1000);
    var _n_days_ago = _now - (nDays * 24 * 60 * 60 * 1000);
    var recent_tss = _.filter(data.data['signup_times'], function (timestamp) {
      return timestamp * 1000 > (_now - 1000 * 60 * 60 * 24 * (nDays + 1));
    });

    // http://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    function toJSONLocal(date) {
      var local = new Date(date);
      local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return local.toJSON().slice(0, 10);
    }

    var timestamp_counter = {};
    var timestamp_counter_for_hours = {};

    _.map(_.range(_n_days_ago, _now + 1000 * 60 * 60, 1000 * 60 * 60), function (ts) {
      let ts_date = new Date(ts);
      var y_m_d = toJSONLocal(ts_date);
      timestamp_counter[y_m_d] = 0;
      if (ts > _7_days_ago)
        timestamp_counter_for_hours[y_m_d + '-' + ts_date.getHours().toString()] = 0;
    });  // hourly increments set default.

    _.map(recent_tss, function (ts) {
      let ts_date = new Date(ts * 1000);
      var local_y_m_d = toJSONLocal(ts_date);
      timestamp_counter[local_y_m_d] += 1;
      if (ts * 1000 > _7_days_ago) {
        timestamp_counter_for_hours[local_y_m_d + '-' + ts_date.getHours().toString()] += 1;
      }
    });
    var results = timestamp_counter;
    $log.log(results);
    var dates4 = Object.keys(results);
    var datesSignupsHourly = Object.keys(timestamp_counter_for_hours);
    dates4.pop();  // account for the one day added when generating recent_tss;
    var newMembers = _.map(dates4, function (d) {
      return results[d];
    });
    var hourlySignups = _.map(datesSignupsHourly, function (d) {
      return timestamp_counter_for_hours[d];
    });
    var plotData4 = [{x: dates4, y: newMembers, type: 'bar'}];
    var plotDataSignupsHourly = [{type: 'bar', line: {shape: 'spline'}, x: datesSignupsHourly, y: hourlySignups}];

    Plotly.newPlot('memberSignupDaysAgo', plotData4, {
      title: 'Member Signup for Last ' + nDays.toString() + ' Days',
      xaxis: {title: 'Days Ago'}, yaxis: {title: '# Signups'}
    });
    Plotly.newPlot('memberSignupHoursAgo', plotDataSignupsHourly, {
      'title': 'Members Signups last 7 days, hourly',
      xaxis: {title: 'Signup time'}, yaxis: {title: '# Signups'}
    });

    // day and hour popularity
    var day_pop = {};
    var hour_pop = {};
    var day_map = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday'
    };
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    _.map(tss, function (ts) {
      var d = day_map[ts.getDay()];
      if (day_pop[d] === undefined) day_pop[d] = 1;
      else day_pop[d] += 1;

      var h = ts.getHours();
      if (hour_pop[h] === undefined) hour_pop[h] = 1;
      else hour_pop[h] += 1;
    });
    var dp_x = days;
    var dh_x = Object.keys(hour_pop);
    var plotDataDayPop = [{
      x: dp_x, y: _.map(dp_x, function (x) {
        return day_pop[x];
      })
    }];
    var plotDataHourPop = [{
      x: dh_x, y: _.map(dh_x, function (x) {
        return hour_pop[x];
      })
    }];
    Plotly.newPlot('memberDayPopularity', plotDataDayPop, {
      title: 'All Member Signups By Day',
      yaxis: {'rangemode': 'tozero'}
    });
    Plotly.newPlot('memberHourPopularity', plotDataHourPop, {
      title: 'All Member Signups By Hour',
      yaxis: {'rangemode': 'tozero'}
    });

    // state signup times
    //var
    var drawStateSignupTimes = function () {
      var stateSignupTimes = data.data['state_signup_times'];
      var plotStateSignupTimes = [];
      var states = Object.keys(stateSignupTimes);
      states.forEach(function (stateName) {
        plotStateSignupTimes.push({
          x: _.map(stateSignupTimes[stateName], function (ts) {
            return new Date(ts * 1000);
          }),
          y: _.range(1, stateSignupTimes[stateName].length + 1),
          type: 'scatter',
          name: stateName
        })
      });
      Plotly.newPlot('stateSignupTimes', plotStateSignupTimes, {title: 'Members v Time by State'});
    };
    drawStateSignupTimes();

    flux.growthStat = function (d) {
      var ts_now = Date.now();
      var ts_ago = new Date(ts_now - (d * 24 * 60 * 60 * 1000));
      var tss_before = _.filter(tss, function (_ts) {
        return _ts < ts_ago;
      });
      var tss_after = _.filter(tss, function (_ts) {
        return _ts >= ts_ago;
      });
      return Math.round(tss_after.length / tss_before.length * 1000) / 1000;
    };
    flux.growthDays = [30, 7, 2, 1];


    // monthly growth
    flux.calcMonthlyGrowth = function (tss) {
      var month_count = {};
      _.map(tss, function (d) {
        var _month_id = d.toJSON().slice(0, 7);
        month_count[_month_id] = month_count[_month_id] ? month_count[_month_id] + 1 : 1;
      });
      var months = _.keys(month_count);
      months.sort();
      var members_per_month = _.map(months, function (m) {
        return month_count[m];
      });
      var cumulative = {};
      _.map(_.range(months.length), function (_i) {
        cumulative[months[_i]] = _.sum(_.slice(members_per_month, 0, _i + 1));
      });
      console.log(cumulative);
      console.log(members_per_month);
      flux.monthlyGrowth = [];
      var rates = [];
      _.map(_.range(2, months.length), function (_i) {
        var _rate = members_per_month[_i] / cumulative[months[_i - 1]] * 100;
        flux.monthlyGrowth.push({
          name: months[_i],
          rate: (_rate).toString().slice(0, 5)
        });
        rates.push(_rate);
      });
      flux.averageMonthlyGrowth = (_.sum(rates) / rates.length).toString().slice(0, 4);
    };
    flux.calcMonthlyGrowth(tss);


    $http.get(flux_api('api/v1/anon_donation_log')).then(data => {
      try {
        // this might fail for some due to using ES6
        flux.donationLog = processDonationGraphs(data);
      } catch (err) {
        console.log('Got error in donation graphs: ', err);
      }
    }, flux.handleError);


    $log.log('Init\'d charts');
  }, flux.handleError)
}]);
