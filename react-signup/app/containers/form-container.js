import React from 'react'
import Formsy from 'formsy-react'
import Modal from 'react-modal';
import MyInput from '../components/my-input'
import MySelect from '../components/my-select'
import MyTextarea from '../components/my-textarea'
import SectionTitle from '../components/section-title'
import HttpHelpers from '../utils/http-helpers'
var _ = require('lodash');

const redirectUrl = (window.location.href.split("/\?", 2)[0] + '/step2').replace("//step2", "/step2");
const randomEmail = Math.random().toString(36).substr(2,10);

const FormContainer = React.createClass({
  getInitialState() {
    return {
      canSubmit: false,
      isLoading: false,
      validationErrors: {},
      serverErrorMsg: false,
      serverSuccessMsg: false,
      showSubmissionModal: false,
      loading: {
        'street': false,
        'suburb': false,
      },
      suburbs: ['Enter Postcode...'],
      streets: ['Choose Suburb...'],
      postcode: '0000',
      country: 'au',
    };
  },
  submit(data) {
    if (data.mnames === undefined) { data.mnames = ""}
    if (data.referred_by === undefined) { data.referred_by = ""}
    if (data.member_comment === undefined) { data.member_comment = ""}
    data.dob = data.dobYear + '-' + data.dobMonth + '-' + data.dobDay + 'T12:00:00';
    data.address = _.join([data.addr_street_no, data.addr_street, data.addr_suburb, data.addr_postcode], "; ");
    data.name = _.join([data.fname, data.mnames, data.lname], ", ");

    this.setState({isLoading: true, showSubmissionModal: true});
    HttpHelpers.sendForm(data, function(response){

      if (__DEV__) {
        console.log(response);
        console.log(data);
      }

      if (response.ok && response.status === 200 && response.body.success === true) {
        this.setState({
          isLoading: false,
          serverSuccessMsg: "Success"
        });
        setTimeout(function() {
          window.location.assign(redirectUrl)
        }, 1500);

        ga('send', {hitType: 'event', eventCategory: 'Membership Form', eventAction: 'Submission'});
        fbq('track', 'Complete Registration');
        fbq('track', 'NewMember');  // a different pixel thing to the above, keep both.

      } else if (response.status === 409) {
        console.log('Duplicate email detected');
        this.setState({
          isLoading: false,
          serverErrorMsg: "Error. Email already exists. Please update details instead of re-registering."
        });
      } else {
        this.setState({
          isLoading: false,
          serverErrorMsg: "Server error, " + response.statusText ? response.statusText : null
        });
      }
    }.bind(this))
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },
  closeModal() {
    this.setState({ showSubmissionModal: false });
  },

  checkPC(evt) {
    const pcTest = /\d{4}/;
    const pc = evt.currentTarget.value;
    console.log(pc);
    if (pcTest.test(pc)) {
      this.updateSuburbs(pc);
    }
  },

  checkSuburb(evt) {
    const suburb = evt.currentTarget.value;
    this.updateStreets(suburb);
  },

  updateSuburbs(pc){
    this.setState({loading: { suburb: true }, suburbs: ['Loading...'], postcode: pc});
    const outer = this;
    const setStateUnk = function() { outer.setState({suburbs: ["Unknown Postcode"]}); };
    HttpHelpers.getSuburbs(pc, function(err, resp){
      if (err) {
        console.log(err);
        setStateUnk();
      } else {
        console.log(resp);
        if (resp.body.suburbs.length == 0)
          setStateUnk();
        else {
          outer.setState({suburbs: _.concat(["Choose Suburb..."], resp.body.suburbs)});
          outer.updateStreets(resp.body.suburbs[0]);
        }
      }
    });
  },

  updateStreets(suburb){
    const outer = this;
    this.setState({loading: { street: true }, streets:["Loading..."], suburb: suburb});
    HttpHelpers.getStreets(this.state.postcode, suburb, function(err, resp){
      if(err){
        console.log(err);
        outer.setState({streets:["Unknown Suburb"]});
      } else {
        console.log(resp);
        outer.setState({streets: _.concat(["Choose Street..."], resp.body.streets)});
      }
    })
  },

  writeToState(_key){
    return function(evt){
      let newState = {};
      newState[_key] = evt.currentTarget.value;
      this.setState(newState);
    }
  },


  render() {
    return (
      <Formsy.Form
        onSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onChange={this.validateForm}>

        <div className="py3 px2 bg-light-gray">
          <h3 className="h2 regular mb1">Sign up below, it's quick and easy</h3>
          <div className="gray mb3">
            <p className="mb2">
              Please make sure your details exactly match those on the electoral roll. You can confirm them on the
              <a href="https://oevf.aec.gov.au/" target="_blank" className="link-reset border-bottom accent nowrap"> AEC website</a>.
            </p>
          </div>

          <MyInput
            inputClass="checkbox"
            type="checkbox"
            name="onAECRoll"
            title="I am on the Australian Electoral Roll."
            validationError="First name is required"
            value={false} />
        </div>

        <div className="px2 pb4">
          <SectionTitle text="1. Name"/>

          <MyInput
            inputClass="input"
            name="fname"
            title="Legal first name"
            autocomplete="given-name"
            value={__DEV__ ? "asdf" : ""}
            validationErrors={{
              isRequired: 'First name is required'
            }}
            required />

            <MyInput
              inputClass="input"
              name="mnames"
              autocomplete="false"
              title="Legal middle name"
              value={__DEV__ ? "asdf" : ""}
              validationErrors={{
                isSpecialWords: 'Only letters please'
              }}
              formNoValidate />

          <MyInput
            inputClass="input"
            name="lname"
            autocomplete="family-name"
            title="Legal last name"
            value={__DEV__ ? "asdf" : ""}
            validationErrors={{
              isRequired: 'First name is required'
            }}
            required />

          <SectionTitle text="2. Address"/>

          <MySelect
            inputClass="input"
            name="addr_country"
            title="Country"
            validationError="Country Required"
            options={[{title: 'Australia', value: 'au'}]}
            onChange={this.writeToState('country')}
            />

          <MyInput
            inputClass="input"
            name="addr_postcode"
            title="Postcode"
            validations={_.includes(['au'], this.state.country) ? "isNumeric,isLength:4" : null}
            pattern={_.includes(['au'], this.state.country) ? "\\d*" : ""}
            value={__DEV__ ? "2000" : ""}
            validationErrors={{
              isRequired: 'Postcode required',
              isNumeric: 'Only numbers allowed',
              isLength: 'Length needs to be 4 digits'
            }}
            onChange={this.checkPC}
            required />

          <MySelect
            inputClass="input"
            name="addr_suburb"
            title="Suburb"
            validationError="Suburb required"
            options={this.state.suburbs}
            value={__DEV__ ? "HAYMARKET (NSW)" : ""}
            onChange={this.checkSuburb}
            validations={{
              notDefault: function(values, value){
                return !_.includes(value, '...') ? true : "Must choose a suburb";
              }
            }}
            required />

          <div className="flex mxn1">
            <MyInput
              inputClass="input"
              className="col-4 inline-block px1 relative"
              name="addr_street_no"
              title="Unit / Street No."
              validationError="Unit and Street Number required"
              placeholder="eg: u32 / 117"
              value={__DEV__ ? "13 / 37" : ""}
              required
              />

            <MySelect
              className="col-8 mx-auto inline-block px1 relative"
              inputClass="input"
              name="addr_street"
              title="Street"
              validationError="Street address is required"
              value={__DEV__ ? "asdf" : ""}
              validationErrors={{
                isRequired: 'Street address required'
              }}
              options={this.state.streets}
              required />
          </div>

          <SectionTitle text="3. Date of Birth" infoText="(Required by AEC)"/>
          <div className="flex mxn1">
            <div className="col-3 px1 relative">
              <MyInput
                inputClass="input"
                name="dobDay"
                title="Day"
                placeholder="DD"
                pattern="\d*"
                value={__DEV__ ? "01" : ""}
                validations={{
                  isNumeric: true,
                  isLength: 2,
                  matchRegexp: /(0[1-9]|[12]\d|3[01])/
                }}
                validationErrors={{
                  isRequired: 'Day required',
                  isNumeric: 'Only numbers allowed',
                  isLength: 'Length must be 2 digits',
                  matchRegexp: 'Invalid date range'
                }}
                required />
            </div>

            <div className="col-3 px1 relative">
              <MyInput
                inputClass="input"
                name="dobMonth"
                title="Month"
                placeholder="MM"
                pattern="\d*"
                value={__DEV__ ? "01" : ""}
                validations={{
                  isNumeric: true,
                  isLength: 2,
                  matchRegexp: /^(0[1-9]|1[0-2])$/
                }}
                validationErrors={{
                  isRequired: 'Month required',
                  isNumeric: 'Only numbers allowed',
                  isLength: 'Month must be 2 digits',
                  matchRegexp: 'Invalid date range'
                }}
                required />
            </div>

            <div className="col-6 px1 relative">
              <MyInput
                inputClass="input"
                name="dobYear"
                title="Year"
                placeholder="YYYY"
                pattern="\d*"
                value={__DEV__ ? "2000" : ""}
                validations={{
                  isNumeric: true,
                  isLength: 4,
                  matchRegexp: /^(190[0-9]|19[1-9]\d|200\d|201[0-6])$/
                }}
                validationErrors={{
                  isRequired: 'Year required',
                  isNumeric: 'Only numbers allowed',
                  isLength: 'Year must be 4 digits',
                  matchRegexp: 'Invalid date range'
                }}
                required />
            </div>

          </div>

          <SectionTitle text="4. Contact details"/>
          <MyInput
            inputClass="input"
            type="tel"
            name="contact_number"
            pattern="\d*"
            title="Phone"
            value={__DEV__ ? "1234567890" : ""}
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
            type="email"
            pattern="[^ @]*@[^ @]*"
            value={__DEV__ ? randomEmail + "@xk.io" : ""}
            validations="isEmail"
            validationError="This is not a valid email"
            autocomplete="email"
            required />


          <SectionTitle text="5. Get Involved"/>

          { this.props.onReferrer
            ?
            <MyInput
              inputClass="input hide"
              name="referred_by"
              value={this.props.onReferrer} />
             :
             <div>

                <MyInput
                  inputClass="input"
                  name="referred_by"
                  title="How did you hear about Flux?" />
            </div>}

          {/*<MyInput
            inputClass="input"
            type="checkbox"
            name="mailing-list"
            title="Send me Flux news and important updates."
            value={true}
             />*/}

         <MyTextarea
             rows="3"
             inputClass="input"
             name="member_comment"
             title="Comments / Notes"
             value={__DEV__ ? "DEV SUBMISSION - PLEASE DELETE" : ""}
             subtext="(Optional, Anything you'd like to add, about yourself, us, or anything, really.)" />

           <MyInput
             inputClass="input"
             type="checkbox"
             name="volunteer"
             title="I'm interested in volunteering"
             value={false}
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

             <Modal
              isOpen={this.state.showSubmissionModal}
              contentLabel="Processing Registration"
              onRequestClose={this.closeModal}
              style={{
                overlay: {
                  backgroundColor: "rgba(20, 20, 20, 0.5)",
                },
                content: {

                }
              }}
             >
               {this.state.isLoading
                ?
                <div className="ml2 line-height-3 flex col-6 mt1">
                  <p className='h0 center-xy inline'>Registering...</p>
                </div>
                : this.state.serverSuccessMsg
                ?
                <div className="ml2 line-height-3 flex col-6 mt1">
                  <p className='h0 center-xy inline success-color'>{this.state.serverSuccessMsg}
                    <br />
                    Redirecting...
                  </p>
                </div>
                : this.state.serverErrorMsg
                ?
                <div className="ml2 line-height-3 flex col-6 mt1">
                  <div className="center-xy">
                    <p className='h2 center error'>{this.state.serverErrorMsg}<br />
                    <button className="btn btn-primary mx-auto h1" onClick={this.closeModal}>Close</button>
                    </p>
                  </div>
                </div>
                : null}
             </Modal>

          </div>

          <p className="silver">
            <i className="material-icons ">lock</i>
            Your details will be kept absolutely confidential and will only be used for party business.
          </p>
        </div>

      </Formsy.Form>
    );
  }
});

export default FormContainer;
