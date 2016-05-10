import React from 'react'
import Formsy from 'formsy-react'

const MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + ' ' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : this.isPristine() ? " " : "success");
    const errorMessage = this.getErrorMessage();
    return (
      <div className={ className + " " + "mb1 relative"}>
        { this.props.type != 'checkbox' && <label htmlFor={this.props.name} className="gray">{this.props.title}</label> }
        { this.showRequired() && <span className="absolute error right-0 top-0 mt3 mr1 h3 h-font bold">*</span> }
        <input
          id={this.props.name}
          className={this.props.inputClass + ' ' + 'mb0'}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null  }
          autoComplete={this.props.autocomplete}
          placeholder={this.props.placeholder}
          ref={this.props.inputRef}
        />
      { this.props.type === 'checkbox'&& <label htmlFor={this.props.name} className="noselect mid-gray">{ this.props.title }</label> }
      <div className="relative error-msg-height">
        {errorMessage
          &&
          <h5 className='absolute top-0 left-0 line-height-2 inline-block mt0 validation-error'>{errorMessage}</h5>}
      </div>
    </div>
    );
  }
});

export default MyInput;
