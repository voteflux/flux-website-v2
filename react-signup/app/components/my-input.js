import React from 'react'
import {withFormsy} from 'formsy-react'
var _ = require('lodash');
import createReactClass from 'create-react-class';

const MyInput = createReactClass({
  changeValue(event) {
    const newValue = event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value'];
    console.log(`MyInput.changeValue -> ${newValue}`)
    console.log(this.props.setValue)
    console.log(this.props.onChange)
    this.props.setValue(newValue);
    if (this.props.onChange)
      this.props.onChange(event);
  },
  componentDidMount(){
    if (this.props.value !== undefined && this.props.value !== "") {
      this.props.setValue(this.props.value);
    }
  },
  render() {
    const className = _.join(
      [ 'form-group'
      , 'mb0'
      , (this.props.className || ' ')
      , (this.props.showRequired ? 'required' : 
          this.props.showError ? 'error' :
            this.props.isPristine ? " " : "success"),
      , (this.props.showRequired && !this.props.isPristine) ? 'error' : ""
      ], ' ');
    const errorMessage = this.props.errorMessage;
    return (
      <div className={ className + " " + "mb1 relative"}>
        { this.props.type != 'checkbox' && <label htmlFor={this.props.name} className="gray block">{this.props.title}</label> }
        { this.props.subtext && <h5 className="h5 line-height-2 muted mt0 inline-block">{this.props.subtext}</h5> }
        { this.props.showRequired && <span className="absolute error right-0 top-0 mt3 mr1 h3 h-font bold">*</span> }
        <input
          id={this.props.name}
          className={this.props.inputClass}
          type={this.props.type || 'text'}
          name={this.props.name}          
          onChange={this.changeValue}
          value={this.props.value || ''}
          checked={this.props.value || false}
          autoComplete={this.props.autocomplete}
          placeholder={this.props.placeholder}
          ref={this.props.inputRef}
          pattern={this.props.pattern || ".*"}
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

export default withFormsy(MyInput);
