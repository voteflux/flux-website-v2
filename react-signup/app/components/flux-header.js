import React from 'react';

const FluxHeader = React.createClass({
  render: function() {
    return (
      <header className="bg-near-black light-silver shadow px2 sm-px3 py3 relative">
        <div className="mb3 mt1">
          Flux logo here
        </div>
        <div className="mt1">
          <h1 className="white m0 mb1 line-height-1">Become a Flux member!</h1>
          <h2 className="silver mb3 line-height-3">Your gateway to participate directly in Parliament</h2>
          <h3 className="accent h4"><span className="regular">{this.props.memberCount}</span> members registered</h3>
        </div>
      </header>
    )
  }
});

export default FluxHeader;
