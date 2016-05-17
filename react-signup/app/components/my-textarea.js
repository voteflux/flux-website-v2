import React from 'react'
import Formsy from 'formsy-react'

const MyTextarea = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },
  render() {
    const className = 'form-group' + ' ' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : this.isPristine() ? " " : "success");
    const errorMessage = this.getErrorMessage();
    return (
      <div className={ className + " " + "mb1 relative"}>
        <label htmlFor={this.props.name} className="gray inline-block mb0">{this.props.title}</label>
        <h5 className="h5 line-height-2 muted mt0 inline-block">{this.props.subtext}</h5>
        { this.showRequired() && <span className="absolute error right-0 top-0 mt3 mr1 h3 h-font bold">*</span> }
        <textarea
          rows={this.props.rows}
          id={this.props.name}
          className={this.props.inputClass + ' ' + 'mb0'}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          autoComplete={this.props.autocomplete}
          placeholder={this.props.placeholder}
          ref={this.props.inputRef}
        ></textarea>
      <div className="relative error-msg-height">
        {errorMessage
          &&
          <h5 className='absolute top-0 left-0 line-height-2 inline-block mt0 validation-error'>{errorMessage}</h5>}
      </div>
    </div>
    );
  }
});

export default MyTextarea;
