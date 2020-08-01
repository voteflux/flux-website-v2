import 'babel-polyfill';
const moment = require('moment')

const startOfFYGen = () => {
  const now = new Date();
  const month = now.getMonth();
  if (month >= 6) {  // js months [0,11]; 6 => July; days are [1,31] // facepalm
    return new Date(now.getFullYear(), 6, 1);
  }
  return new Date(now.getFullYear() - 1, 6, 1);
}

const startOfFY = startOfFYGen();
console.log('Start of FY', startOfFY);


const isThisFY = x => (x >= startOfFY);


const pushCoords = (d, data, filter = () => true) => {
  if (filter(d.ts, d.amount)) {
    data.x.push(d.ts);
    data.y.push(d.amount);
  }
};


const pushCoordsCumulative = (d, data, filter = () => true) => {
  const last = R.last(data.y) || 0.0;
  pushCoords({...d, amount: last + d.amount}, data, filter);
}

//
// const pushCoordsWeekly = (d, data, filter = () => true) => {
//   const week = d.ts % 604800 || 0;
//   pushCoordsCumulative({...d, ts: week}, data, filter)
// }


export const processDonationGraphs = function (data) {
  const isValidDate = d => !isNaN(d.getTime())
  const donationLog = R.pipe(
    R.map((obj) => ({...obj, ts: isValidDate(moment(obj.date).toDate()) ? moment(obj.date).toDate() : tsToDate(obj.ts), amount: parseFloat(obj.amount)})),
    R.sort((o1, o2) => o1.ts.getTime() - o2.ts.getTime()),
  )(data.data.donations);

  console.log('Donation Log: ', donationLog);

  const stdScatter = {
    x: [], y: [], type: 'scatter',
    mode: 'markers', marker: {size: 10}
  }
  const stdCumulative = {x: [], y: [], type: 'scatter', mode: 'lines+markers', marker: {size: 6, symbol: "diamond-open"}}

  const donationsAll = R.clone(stdScatter)
  const donationsFY = R.clone(stdScatter)
  const donationsCumulativeAll = R.clone(stdCumulative)
  const donationsCumulativeFY = R.clone(stdCumulative)
  const donationsByStateAll = {};
  const donationsByStateCumulativeAll = {};
  const donationsByStateFY = {}
  const donationsByStateCumulativeFY = {}
  const donationsByWeek = {}


  const ensureKeyOrClone = (obj, branch, toClone) => {
    if (obj[branch] === undefined)
      obj[branch] = R.clone(toClone)
  }


  R.map(d => {
    pushCoords(d, donationsAll);
    pushCoords(d, donationsFY, isThisFY);

    ensureKeyOrClone(donationsByStateAll, d.branch, stdScatter)
    ensureKeyOrClone(donationsByStateFY, d.branch, stdScatter)
    pushCoords(d, donationsByStateAll[d.branch]);
    pushCoords(d, donationsByStateFY[d.branch], isThisFY);

    ensureKeyOrClone(donationsByStateCumulativeFY, d.branch, stdCumulative)
    ensureKeyOrClone(donationsByStateCumulativeAll, d.branch, stdCumulative)
    pushCoordsCumulative(d, donationsByStateCumulativeAll[d.branch])
    pushCoordsCumulative(d, donationsByStateCumulativeFY[d.branch], isThisFY)

    // pushCoordsWeekly(d, donationsByWeek, isThisFY)
  }, donationLog);


  let lastY = 0;
  R.map(([x, y]) => {
    let next = lastY + y;
    donationsCumulativeAll.x.push(x);
    donationsCumulativeAll.y.push(next);
    lastY = next;
  }, R.zip(donationsAll.x, donationsAll.y));

  lastY = 0;
  R.map(([x, y]) => {
    let next = lastY + y;
    donationsCumulativeFY.x.push(x);
    donationsCumulativeFY.y.push(next);
    lastY = next;
  }, R.zip(donationsFY.x, donationsFY.y));


  const dataDonationsByStateCumulativeAll = [];
  const dataDonationsByStateCumulativeFY = [];
  const dataDonationsByStateAll = [];
  const dataDonationsByStateFY = [];
  const prepJuriData = (dataObj, dataList) => R.mapObjIndexed((v, k, obj) => dataList.push({...v, name: k}), dataObj);
  prepJuriData(donationsByStateCumulativeAll, dataDonationsByStateCumulativeAll);
  prepJuriData(donationsByStateCumulativeFY, dataDonationsByStateCumulativeFY);
  prepJuriData(donationsByStateAll, dataDonationsByStateAll);
  prepJuriData(donationsByStateFY, dataDonationsByStateFY);


  console.log('DATA -> Donations sigma by state', dataDonationsByStateCumulativeAll);
  console.log('DATA -> Donations Cumulative:', donationsCumulativeAll);
  console.log('DATA -> Donations By Juri:', dataDonationsByStateAll);

  Plotly.newPlot('donationGraphCumulativeFY', [donationsCumulativeFY], {
    title: "Cumulative Donations (this FY)",
    yaxis: {'rangemode': 'tozero', title: '$ AUD'},
    xaxis: {title: 'Date'}
  });

  Plotly.newPlot('donationGraphCumulativeStateFY', dataDonationsByStateCumulativeFY, {
    title: "Cumulative Donations by Branch (this FY)",
    yaxis: {'rangemode': 'tozero', title: '$ AUD'},
    xaxis: {title: 'Date'}
  });

  Plotly.newPlot('donationGraphByStateFY', dataDonationsByStateFY, {
    title: "Donations by Branch (this FY)",
    yaxis: {'rangemode': 'tozero', 'title': '$ AUD (log)', type: 'log'},
    xaxis: {title: 'Date'}
  })

  Plotly.newPlot('donationGraphCumulative', [donationsCumulativeAll], {
    title: "Cumulative Donations (All)",
    yaxis: {'rangemode': 'tozero', title: '$ AUD'},
    xaxis: {title: 'Date'}
  });

  Plotly.newPlot('donationGraphCumulativeState', dataDonationsByStateCumulativeAll, {
    title: "Cumulative Donations by Branch (All)",
    yaxis: {'rangemode': 'tozero', title: '$ AUD'},
    xaxis: {title: 'Date'}
  });

  Plotly.newPlot('donationGraphByState', dataDonationsByStateAll, {
    title: "Donations by Branch (All)",
    yaxis: {'rangemode': 'tozero', 'title': '$ AUD (log)', type: 'log'},
    xaxis: {title: 'Date'}
  })

  // Plotly.newPlot('donationGraphWeekly', donationsByWeek, {
  //   title: "Donations by Week",
  //   yaxis: {'rangemode': 'tozero', 'title': '$ AUD'},
  //   xaxis: {title: 'Week of'}
  // })

  return donationLog;
}
