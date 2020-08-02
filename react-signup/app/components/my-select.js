import React from 'react'
import {withFormsy} from 'formsy-react'
import createReactClass from 'create-react-class';

const MySelect = createReactClass({
  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
    if (this.props.onChange)
      this.props.onChange(event);
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
    const options = this.props.options.map((option, i) => {
      if (typeof option === 'object') {
        return (<option key={option.title + option.value} value={option.value}
                        disabled={option.value === '' && true}>{option.title}</option>)
      } else {
        const _v = (option.includes('...') || option === "Unknown Suburb") ? null : options;
        return (<option key={option} value={_v} disabled={option === '' && true}>
          {option}
        </option>)
      }
    });
    return (
      <div className={className}>
        <label htmlFor={this.props.name} className="gray">{this.props.title}</label>
        { this.isPristine && <span className="absolute error right-0 top-0 mt3 mr1 h3 h-font bold">*</span> }
        <i className="material-icons absolute right-0 top-0 mt3 pt1 mr1 h1 noselect default" style={{pointerEvents: "none"}} >arrow_drop_down</i>
        <select
          id={this.props.name}
          className={this.props.inputClass}
          name={this.props.name}
          onChange={this.changeValue}
          disabled={this.props.disabled || false}
          value={this.props.value} >
            {options}
        </select>
        <div className="relative error-msg-height">
          { errorMessage && <h5 className='absolute top-0 left-0 line-height-2 inline-block mt0 validation-error'>{errorMessage}</h5> }
        </div>
      </div>
    );
  }

});

export default withFormsy(MySelect);
