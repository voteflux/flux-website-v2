import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import axios from 'axios';

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
            <h1>{this.getErrorMessage()}</h1>
      </div>
    </div>
    );
  }
});

const MySelect = React.createClass({
  mixins: [Formsy.Mixin],
  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },
  render() {
    const className = 'form-group relative' + ' ' + (this.props.className || ' ') + ( this.showRequired() ? 'required' : this.showError() ? 'error' : this.isPristine() ? " " : "success");

    const errorMessage = this.getErrorMessage();
    const options = this.props.options.map((option, i) => (
      <option key={option.title+option.value} value={option.value} disabled={option.value === '' && true} >
        {option.title}
      </option>
    ));
    return (
      <div className={className}>
        <label htmlFor={this.props.name} className="gray">{this.props.title}</label>
        { this.isPristine() && <span className="absolute error right-0 top-0 mt3 mr1 h3 h-font bold">*</span> }
        <i className="material-icons absolute right-0 top-0 mt3 pt1 mr1 h1 noselect default">arrow_drop_down</i>
        <select
          id={this.props.name}
          className={this.props.inputClass}
          name={this.props.name}
          onChange={this.changeValue}
          value={this.getValue()} >
          {options}
        </select>

        { errorMessage && <h5 className='line-height-2 inline-block mt0 validation-error'>{errorMessage}</h5> }

      </div>
    );
  }

});

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

const FormContainer = React.createClass({
  getInitialState() {
    return {
      canSubmit: false,
      validationErrors: {}
    };
  },
  submit(data) {
    data.dob = data.dobYear + '-' + data.dobMonth + '-' + data.dobDay + 'T12:00:00'
    data.address = data.addr_street + ', ' + data.addr_suburb + ', ' + data.addr_postcode
    console.log(JSON.stringify(data, null, 4));
    httpHelpers.sendForm(JSON.stringify(data, null, 4));
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: true }); // false
  },
  someFunction: function () {
    this.refs.form.updateInputsWithError({
      email: 'This email is taken',
      'field[10]': 'Some error!'
    });
  },
  notifyFormError: function(myObject, d, invalidateForm) {
    console.log("test", myObject);
    for (var key in myObject.options) {
      // check also if property is not inherited from prototype
      if (myObject.options.hasOwnProperty(key)) {
        var value = myObject.options[key];
      }
    }
    // invalidateForm({ foo: "foo"})
  },
  render() {
    return (
      <Formsy.Form
        onSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onInvalidSubmit={this.notifyFormError}
        onChange={this.validateForm}
        className="">

        <div className="py3 px3 bg-light-gray">
          <h3 className="h2 regular mb1">Sign up below, its quick and easy</h3>
          <div className="gray mb3">
            <p className="mb2">
              Please make sure your details exactly match those on the electoral roll. You can confirm them on the
              <a href="#!" target="_blank" className="link-reset border-bottom accent nowrap"> AEC website</a>.
            </p>
          </div>

          <MyInput
            inputClass="checkbox"
            type="checkbox"
            name="onAECRoll"
            title="Are you on the Australian Electoral Roll?"
            validationError="First name is required"
            value={false} />
        </div>

        <div className="px3 pb4">
          <SectionTitle text="1. Names"/>

          <MyInput
            inputClass="input"
            name="fname"
            title="Legal first name"
            autocomplete="given-name"
            validations="isAlpha"
            validationErrors={{
              isRequired: 'First name is required',
              isAlpha: 'Only letters please'
            }}
            required
            inputRef="foo"/>

          <MyInput
            inputClass="input"
            name="lname"
            autocomplete="family-name"
            title="Legal last name"
            validations="isAlpha"
            validationErrors={{
              isRequired: 'First name is required',
              isAlpha: 'Only letters please'
            }}
            required />

            <MyInput
              inputClass="input"
              name="mname"
              autocomplete="false"
              title="Legal middle name"
              validations="isAlpha"
              validationErrors={{
                isAlpha: 'Only letters please'
              }}
              formNoValidate />

          <SectionTitle text="2. Address"/>

          <MyInput
            inputClass="input"
            name="addr_street"
            title="Street address"
            validationError="Street address is required"
            autocomplete="address-line1"
            validationErrors={{
              isRequired: 'Street address required'
            }}
            required />

          <MyInput
            inputClass="input"
            name="addr_suburb"
            title="Suburb"
            validationError="Suburb required"
            autocomplete="city"
            required />


          {/*<MySelect
            inputClass="input"
            name="state"
            title="State"
            value="hello"
            validationErrors={{
              isRequired: 'State required'
            }}
            options={[
              { value:"", title: "Select your state" },
              { value:"act", title: "Australian Capital Territory" },
              { value:"nsw", title: "New South Wales" },
              { value:"nt", title: "Northern Territory" },
              { value:"qld", title: "Queensland" },
              { value:"sa", title: "South Australia" },
              { value:"tas", title: "Tasmania" },
              { value:"vic", title: "Victoria" },
              { value:"wa", title: "Western Australia "}
            ]}
            required
          /> */}



          <MyInput
            inputClass="input"
            name="addr_postcode"
            title="Postcode"
            validations="isNumeric,isLength:4"
            validationErrors={{
              isRequired: 'Postcode required',
              isNumeric: 'Only numbers allowed',
              isLength: 'Length needs to be 4 digits'
            }}
            autocomplete="postal-code"
            required />

          <SectionTitle text="3. Date of Birth" infoText="(Required by AEC)"/>


          <div className="">
            <div className="flex mxn1">

              <div className="col-3 px1 relative">
                <MyInput
                  inputClass="input"
                  name="dobDay"
                  title="Day"
                  validations="isNumeric,isLength:2 "
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
                  name="dobMonth"
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
                  name="dobYear"
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
            name="contact_number"
            title="Phone"
            autocomplete="tel"
            validations={{
              minLength: 8
            }}
            validationErrors={{
              isRequired: 'Phone number is required',
              minLength: 'Needs to be at least 8 digits.'
            }}
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
            title="Send me Flux news and important updates."
            value={true}
             />

           <div className="buttons flex items-center mt4 mb3">
             <div>
              <button type="submit" className="h3 btn btn-primary" disabled={!this.state.canSubmit}>Submit <i className="material-icons ">chevron_right</i></button>
             </div>
            {!this.state.canSubmit
              &&
              <div className="ml2 line-height-3 flex col-6 mt1">
                <span className="h3 error inline-block">*</span>
                <p className='h5 inline error'>You can't submit until you fill out all required fields</p>
              </div>}
          </div>

          <p className="silver">
            <i className="material-icons ">lock</i>
            Your details will be kept absolutely confidential and will only be used for party business.</p>
        </div>

      </Formsy.Form>
    );
  }
});

var postDev = 'https://flux-api-dev.herokuapp.com'

var httpHelpers = {

  getMembers: function () {
    return axios.get( "https://api.voteflux.org/getinfo" )
      .then(function (response) {
        return response.data
      })
      .catch(function (response) {
        console.log(response);
      });
  },
  sendForm: function (data) {
    return axios.post( postDev + '/api/v0/register/all_at_once', JSON.parse(data))
      .then(function(response) {
        console.log(response)
      })
      .catch(function(response) {
        console.log("error", response)
      })
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
    httpHelpers.getMembers()
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
        <FluxHeader memberCount={this.state.isLoading ? "Loading...": this.state.memberCount.n_members}/>
        <FormContainer/>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'));
