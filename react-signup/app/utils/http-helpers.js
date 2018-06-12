import React from 'react';
import axios from 'axios';
import superagent from 'superagent';
var _ = require('lodash');
import FormContainer from '../containers/form-container'


const prodServer = 'https://api.voteflux.org';

let useDevDefault = (window.location.hostname === 'localhost' || _.includes(location.hostname, "deploy-preview"));
let useLocalDev = (window.location.hostname === '127.0.0.1')
let useProdOverride = false;

try {
    useProdOverride = window.location.search.includes("useProd")
} catch (e) {}

if (useProdOverride) {
  console.log("using production override (?useProd in get params / search string)")
  useDevDefault = false
  useLocalDev = false
}

if (useDevDefault) {
  console.log("Using dev server for signup submissions");
}

const flux_api = function(path, useDev){
  if (useDev === undefined) {
    return flux_api(path, useDevDefault);
  } else if (useLocalDev === true) {
    return 'http://localhost:5000/api/v0/' + path;
  } else if (useDev === true) {
    return 'https://flux-api-dev.herokuapp.com/api/v0/' + path;
  } else if (useDev === false) {
    return 'https://api.voteflux.org/api/v0/' + path;
  }
  return flux_api(path, true);
}

var HttpHelpers = {
  getMembers: function () {
    return axios.get( "https://api.voteflux.org/api/v0/getinfo" )
      .then(function (response) {
        return response.data
      })
      .catch(function (response) {
        console.log(response);
      });
  },
  sendForm: function (data, callback) {
    return superagent.post(flux_api('register/all_at_once')).send(data)
      .end(function(err, response) {
        if(!err)
          callback(response);
        else {
          callback(err || !response.ok);
          var errorArr = [];
          errorArr.push(data);
          errorArr.push(response);
          axios.post(flux_api('error/all_at_once'), errorArr);
          console.log("Error sent to server --->", errorArr)
        }
      })
  },
  getSuburbs: function(pc, callback) {
    return superagent.get(flux_api('get_suburbs/au/' + pc, false)).end(callback);
  },
  getStreets: function(pc, suburb, callback) {
    return superagent.get(flux_api('get_streets/au/' + pc + '/' + suburb, false)).end(callback);
  }
};

export default HttpHelpers;
