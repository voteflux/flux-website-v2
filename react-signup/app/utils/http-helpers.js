import React from 'react'
import axios from 'axios'
import FormContainer from '../containers/form-container'

var devTest = 'https://flux-api-dev.herokuapp.com';
var prodUrl = 'https://api.voteflux.org';

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
    return axios.post( prodUrl + '/api/v0/register/all_at_once', JSON.parse(data))
      .then(function(response) {
        callback(response)
      })
      .catch(function(response) {
        callback(response)
      })
  }
};

export default HttpHelpers;
