require('es6-promise/auto');
import React from 'react'
import ReactDOM from 'react-dom'
import FluxHeader from './components/flux-header'
import HttpHelpers from './utils/http-helpers'
import FormContainer from './containers/form-container'


const App = React.createClass({
  getInitialState: function() {
    return {
      isLoading: true,
      memberCount: {},
      checkReferrer: false
    }
  },
  componentWillMount() {
    this.checkReferrer();
  },
  componentDidMount: function() {
    HttpHelpers.getMembers()
    .then( function (d) {
      this.setState({
        isLoading: false,
        memberCount: d
      });
    }.bind(this))
  },
  getParam: function(val) {
    // http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
    var result = undefined;
    var tmp = [];
    location.search
    //.replace ( "?", "" )
    // this is better, there might be a question mark inside
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
      });
    return result;
  },
  checkReferrer: function() {
    if (this.getParam('r') !== undefined) {
      localStorage.setItem("signup_referral", this.getParam('r'));
      console.log('Set signup_referral to', this.getParam('r'));
    }
    this.setState({
      checkReferrer: localStorage.getItem("signup_referral")
    })
  },
  render: function() {
    return (
      <div>
        <FluxHeader memberCount={this.state.isLoading ? "Loading...": this.state.memberCount.n_members}/>
        <FormContainer onReferrer={this.state.checkReferrer} />
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
