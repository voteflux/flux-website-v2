import React from 'react'
import Formsy from 'formsy-react'

const MySelect = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onChange)
      this.props.onChange(event);
  },
  render() {
    const className = 'form-group relative' + ' ' + (this.props.className || ' ') + ( this.showRequired() ? 'required' : this.showError() ? 'error' : this.isPristine() ? " " : "success");

    const errorMessage = this.getErrorMessage();
    const options = this.props.options.map((option, i) => {
      if (typeof option === 'object') {
        return (<option key={option.title + option.value} value={option.value}
                        disabled={option.value === '' && true}>{option.title}</option>)
      } else {
        return (<option key={option} value={option} disabled={option === '' && true}>
          {option}
        </option>)
      }
    });
    return (
      <div className={className}>
        <label htmlFor={this.props.name} className="gray">{this.props.title}</label>
        { this.isPristine() && <span className="absolute error right-0 top-0 mt3 mr1 h3 h-font bold">*</span> }
        <i className="material-icons absolute right-0 top-0 mt3 pt1 mr1 h1 noselect default no-pointer-events">arrow_drop_down</i>
        <select
          id={this.props.name}
          className={this.props.inputClass}
          name={this.props.name}
          onChange={this.changeValue}
          disabled={this.props.disabled || false}
          value={this.getValue()} >
            {options}
        </select>

        { errorMessage && <h5 className='line-height-2 inline-block mt0 validation-error'>{errorMessage}</h5> }

      </div>
    );
  }

});

export default MySelect;
