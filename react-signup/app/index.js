import React from 'react';
import ReactDOM from 'react-dom';

var SignUp = React.createClass({
  render: function() {
    return (
      <h1>Hello world</h1>
    )
  }
});

ReactDOM.render(
  <SignUp/>,
  document.getElementById('app')
);
