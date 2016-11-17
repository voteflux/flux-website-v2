import React from 'react';
import axios from 'axios';
import superagent from 'superagent';
import FormContainer from '../containers/form-container'


if (window.location.hostname === 'localhost') {
  console.log("Using dev server for signup submissions");
  var postUrl = 'https://flux-api-dev.herokuapp.com';
} else {
  var postUrl = 'https://api.voteflux.org';
}

var HttpHelpers = {
  getMembers: function () {
    return axios.get( "https://api.voteflux.org/getinfo" )
      .then(function (response) {
        return response.data
      })
      .catch(function (response) {
        console.log(response);
      });
  },
  sendForm: function (data, callback) {
    return superagent.post(postUrl + '/api/v0/register/all_at_once').send(data)
      .end(function(err, response) {
        if(!err)
          callback(response);
        else {
          callback(err || !response.ok);
          var errorArr = [];
          errorArr.push(data);
          errorArr.push(response);
          axios.post(postUrl + '/api/v0/error/all_at_once', errorArr);
          console.log("Error sent to server --->", errorArr)
        }
      })
  }
};

export default HttpHelpers;
