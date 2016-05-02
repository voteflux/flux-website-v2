import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import axios from 'axios';


const MyInput = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
  },
  render() {
    const className = 'form-group' + (this.props.className || ' ') + (this.showRequired() ? 'required' : this.showError() ? 'error' : "success");
    const errorMessage = this.getErrorMessage();
    return (
      <div className={className + " " + "mb2"}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          id={this.props.name}
          className={this.props.inputClass + " " + "mb1"}
          type={this.props.type || 'text'}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()}
          checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
          autoComplete={this.props.autocomplete}

        />
      { errorMessage && <h5 className='line-height-2 inline-block mt0 validation-error'>{errorMessage}</h5> }
    </div>
    );
  }
});

const SectionTitle = React.createClass({
  render: function() {
    return (
      <h4 className="mt4 mb2 bold accent">{this.props.text}</h4>
    )
  }
});

const FormContainer = React.createClass({
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
        className="login px2">

        <section className="py3 bg-light-gray">
          <h3 className="h2 regular mb1">Sign up below, its quick and easy</h3>
          <div className="gray mb3">
            <p className="">
              Please make sure your details exactly match those on the electoral roll. You can confirm them on the
                <a href="#!" target="_blank" className="link-reset border-bottom accent">AEC website</a>.
            </p>
          </div>

          <div className="flex">
            <div className="relative h1 mr2 dark-gray pointer">
              <i className="material-icons icon-adjust">check_box</i>
            </div>
            <div className="mt1">
              <label className="gray" >Are you on the Australian Electoral Roll?<span className="warning">*</span></label>
            </div>
          </div>
        </section>

        <MyInput
          inputClass="checkbox"
          type="checkbox"
          name="foo"
          title="Are you a member"
          validationError="First name is required" />

        <SectionTitle text="1. Names"/>

        <MyInput
          inputClass="input"
          name="fname"
          autocomplete="given-name"
          validations="isAlpha"
          validationError="First name is required"
          required />

        <MyInput
          inputClass="input"
          name="mname"
          autocomplete="false"
          title="Legal middle name"
          formNoValidate />

        <MyInput
          inputClass="input"
          name="lname"
          autocomplete="family-name"
          title="Legal last name"
          validations="isAlpha"
          validationError="last name required"
          required />

        <SectionTitle text="2. Address"/>

        <MyInput
          inputClass="input"
          name="address"
          title="Street address"
          validationError="Street address is required"
          autocomplete="address-line1"
          validationErrors={{
            isRequired: 'State required'
          }}
          required />

        <MyInput
          inputClass="input"
          name="city"
          title="Suburb"
          validationError="Suburb required"
          autocomplete="address-line2"
          required />

        <MyInput
          inputClass="input"
          name="state"
          title="State"
          validations="isAlpha,maxLength:3"
          autocomplete="province"
          validationErrors={{
            isRequired: 'State required',
            maxLength: 'Please use abbreviated state code. Eg. NSW'
          }}
          required />

        <MyInput
          inputClass="input"
          name="postal-code"
          title="Postcode"
          validations="isNumeric,isLength:4"
          validationErrors={{
            isRequired: 'Postcode required',
            isNumeric: 'Only numbers allowed',
            isLength: 'Length needs to be 4 digits'
          }}
          autocomplete="postal-code"
          required />

        <SectionTitle text="3. Date of Birth"/>
        <p class="mt0 gray">(Required by AEC)</p>

        <div className="">
          <div className="flex mxn1">

            <div className="col-3 px1 relative">
              <MyInput
                inputClass="input"
                name="day"
                title="Day"
                validations="isNumeric,isLength:2"
                validationErrors={{
                  isRequired: 'Day required',
                  isNumeric: 'Only numbers allowed',
                  isLength: 'Length must be 2 digits'
                }}
                required />
            </div>

            <div className="col-3 px1 relative">
              <MyInput
                inputClass="input"
                name="month"
                title="Month"
                validations="isNumeric,isLength:2"
                validationErrors={{
                  isRequired: 'Month required',
                  isNumeric: 'Only numbers allowed',
                  isLength: 'Month must be 2 digits'
                }}
                required />
            </div>

            <div className="col-6 px1 relative">
              <MyInput
                inputClass="input"
                name="year"
                title="Year"
                validations="isNumeric,isLength:4"
                validationErrors={{
                  isRequired: 'Year required',
                  isNumeric: 'Only numbers allowed',
                  isLength: 'Year must be 4 digits'
                }}
                required />
            </div>

          </div>
        </div>

        <SectionTitle text="4. Contact details"/>

        <MyInput
          inputClass="input"
          type="tel"
          name="phone"
          title="Phone"
          validations="minLength:8"
          validationErrors={{
            isRequired: 'Phone number is required',
            minLength: 'Needs to be at least 8 digits.'
          }}
          autocomplete="tel"
          required />

        <MyInput
          inputClass="input"
          name="email"
          title="Email"
          validations="isEmail"
          validationError="This is not a valid email"
          autocomplete="email"
          required />

        <MyInput
          inputClass="input"
          type="checkbox"
          name="mailing-list"
          title="Add me to the Flux mailing list (We promise no spam)."
           />

        <div className="buttons">
          <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Submit</button>
        </div>
      </Formsy.Form>
    );
  }
});

var helpers = {
  getMembers: function () {
    return axios.get( "https://api.voteflux.org/getinfo" )
      .then(function (response) {
        return response.data
      })
      .catch(function (response) {
        console.log(response);
      });
  }
};

const App = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      memberCount: {}
    }
  },
  componentDidMount: function () {
    helpers.getMembers()
    .then( function (d) {
      this.setState({
        isLoading: false,
        memberCount: d
      });
    }.bind(this))
  },
  render: function() {
    return (
      <div>
        <h1>members {this.state.memberCount.n_members}</h1>
        <FormContainer/>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'));
