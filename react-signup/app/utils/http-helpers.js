import React from 'react'
import axios from 'axios'
import FormContainer from '../containers/form-container'


if (window.location.hostname === 'localhost') {
  console.log("Form being set to dev server")
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
    return axios.post( postUrl + '/api/v0/register/all_at_once', JSON.parse(data))
      .then(function(response) {
        callback(response)
      })
      .catch(function(response) {
        callback(response)
      })
  }
};

export default HttpHelpers;
