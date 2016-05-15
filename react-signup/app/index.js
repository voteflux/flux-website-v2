import React from 'react'
import ReactDOM from 'react-dom'
import Formsy from 'formsy-react'
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
  checkReferrer: function() {
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
})

ReactDOM.render(<App />, document.getElementById('app'));
