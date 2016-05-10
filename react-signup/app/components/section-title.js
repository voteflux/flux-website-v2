import React from 'react'

const SectionTitle = React.createClass({
  render: function() {
    return (
      <div>
        <h4 className="mt3 mb2 bold accent inline-block">{this.props.text}</h4>
        {this.props.infoText && <p className="ml2 mt0 gray inline-block">{this.props.infoText}</p>}
      </div>
    )
  }
});

export default SectionTitle;
