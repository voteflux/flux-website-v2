import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';

// var link=document.createElement('link');
// link.rel='stylesheet';
// link.href='main.css';

//
// document.getElementsByTagName('head')[0].appendChild(link);

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
          className={this.props.inputClass}
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

// const CheckBox = React.createClass({
//   mixins: [Formsy.Mixin],
//   changeValue: function (event) {
//     this.setValue(event.currentTarget.value);
//   },
//   render: function () {
//     return (
//       <div>
//         <input
//           type="checkbox"

//           onChange={this.changeValue}
//           value={this.getValue()}
//         />
//         <label htmlFor="{this.props.name}"></label>
//       </div>
//     );
//   }
// });

const SectionTitle = React.createClass({
  render: function() {
    return (
      <h4 className="mb2 bold accent">{this.props.text}</h4>
    )
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

        <section className="px2 sm-px3 py3 bg-light-gray">
          <h3 className="h2 regular mb1">Sign up below, its quick and easy</h3>
          <div className="gray mb3">
            <p className="">Please make sure your details exactly match those on the electoral roll. You can confirm them on the <a href="#!" target="_blank" className="link-reset border-bottom border-thick accent">AEC website</a>.
            </p>
          </div>

          <div className="flex">
            <div className="relative h1 mr2 dark-gray pointer">
              <i className="material-icons icon-adjust">check_box</i>
            </div>
            <div className="mt1">
              <label className="gray" for="first-name">Are you on the Australian Electoral Roll?<span className="warning">*</span></label>
            </div>
          </div>
        </section>

        <MyInput
          inputClass="checkbox"
          type="checkbox"
          name="foo"
          title="Are you a memeer"
          validationError="First name is required"
          required />

        <SectionTitle text="1. Names"/>

        <MyInput
          inputClass="input"
          name="first-name"
          title="Legal first name"
          validations="isAlpha"
          validationError="First name is required"
          required />

        <MyInput
          inputClass="input"
          name="middle-name"
          title="Legal middle name"
          validations="isAlpha"
          validationError="Is this really your middle name?" />

        <MyInput
          inputClass="input"
          name="last-name"
          title="Legal last name"
          validations="isAlpha"
          validationError="last name is required"
          required />

        <SectionTitle text="2. Address"/>

        <MyInput
          inputClass="input"
          name="street-address"
          title="Street address"
          validationError="last name is required"
          required />

        <MyInput
          inputClass="input"
          name="suburb"
          title="Suburb"
          validationError="last name is required"
          required />

        <MyInput
          inputClass="input"
          name="state"
          title="State"
          validationError="last name is required"
          required />

        <MyInput
          inputClass="input"
          name="postcode"
          title="Postcode"
          validationError="last name is required"
          required />

        <MyInput
          inputClass="input"
          name="day"
          title="Day"
          validationError="last name is required"
          required />

        <MyInput
          inputClass="input"
          name="month"
          title="Month"
          validationError="last name is required"
          required />

        <MyInput
          inputClass="input"
          name="year"
          title="Year"
          validationError="last name is required"
          required />

        <MyInput
          inputClass="input"
          name="phone"
          title="Phone"
          validations="isEmail"
          validationError="This is not a valid email"
          required />

        <MyInput
          inputClass="input"
          name="email"
          title="Email"
          validations="isEmail"
          validationError="This is not a valid email"
          required />

        <MyInput
          inputClass="input"
          type="checkbox"
          name="foo"
          title="Are you a memeer"
          validationError="First name is required"
          required />

        <div className="buttons">
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </div>
      </Formsy.Form>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));



