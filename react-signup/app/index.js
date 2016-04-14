import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';

const MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {

    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : "success");
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
        />
        { errorMessage && <span className='validation-error'>{errorMessage}</span> }
      </div>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return { canSubmit: false };
  },
  submit(data) {
    console.log(JSON.stringify(data, null, 4));
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  render() {
    return (
      <Formsy.Form
        onSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        className="login">

        <MyInput
          name="first-name"
          title="Legal first name"
          validations="isAlpha"
          validationError="First name is required"
          required />

        <MyInput
          name="middle-name"
          title="Legal middle name"
          validations="isAlpha"
          validationError="Is this really your middle name?" />

        <MyInput
          name="last-name"
          title="Legal last name"
          validations="isAlpha"
          validationError="last name is required"
          required />

        <MyInput
          name="street-address"
          title="Street address"
          validationError="last name is required"
          required />

        <MyInput
          name="email"
          title="Email"
          validations="isEmail"
          validationError="This is not a valid email"
          required />

        <MyInput
          name="password"
          title="Password"
          type="password"
          required />

        <div className="buttons">
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </div>
      </Formsy.Form>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));



