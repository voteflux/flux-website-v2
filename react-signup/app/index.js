import React from 'react'
import ReactDOM from 'react-dom'
import Formsy from 'formsy-react'
import FluxHeader from './components/flux-header'
import HttpHelpers from './utils/http-helpers'
import FormContainer from './containers/form-container'


const App = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      memberCount: {}
    }
  },
  componentDidMount: function () {
    HttpHelpers.getMembers()
    .then( function (d) {
      this.setState({
        isLoading: false,
        memberCount: d
      });
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <FluxHeader memberCount={this.state.isLoading ? "Loading...": this.state.memberCount.n_members}/>
        <FormContainer/>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'));
