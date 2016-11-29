import React from 'react';
import EmailInput from './EmailInput';
import BirthdayInput from './BirthdayInput';
import PasswordConfirmationInput from './PasswordConfirmationInput';
import RequiredInput from './RequiredInput';

/**
 * The overall form component
 */
class SignUpForm extends React.Component {
  constructor(props){
    super(props);
    this.state = { //track values and overall validity of each field
      email:{value:'',valid:false},
      name:{value:'',valid:false},
      dob:{value:'',valid:false},
      password:{value:'',valid:false},
      passwordConf:{value:'',valid:false}
    };

    this.updateState = this.updateState.bind(this); //bind for scope
  }

  //callback for updating the state with child information
  updateState(stateChange){
    this.setState(stateChange);
  }

  //callback for the reset button
  handleReset(event) {
    console.log('Reset!');
    var emptyState = {};
    this.setState(emptyState);
  }

  //callback for the submit button
  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted!');
    this.props.submitCallback(this.state);
  }

  render() {
    //if all fields are valid, button should be enabled
    var buttonEnabled = (this.state.email.valid && this.state.name.valid && this.state.dob.isValid && this.state.password.valid);

    return (
      <form name="signupForm" onSubmit={(e) => this.handleSubmit(e)}>

        <EmailInput value={this.state.email.value} updateParent={this.updateState} />

        <RequiredInput
          id="name" field="name" type="text"
          label="Name" placeholder="your name"
          errorMessage="we need to know your name"
          value={this.state.name.value}
          updateParent={this.updateState} />

        <BirthdayInput value={this.state.dob.value} updateParent={this.updateState}/>

        <RequiredInput
          id="password" field="password" type="password"
          label="Password" placeholder=""
          errorMessage="your password can't be blank"
          value={this.state.password.value}
          updateParent={this.updateState} />

        <PasswordConfirmationInput value={this.state.passwordConf.value} password={this.state.password.value} updateParent={this.updateState}/>

        {/* Submit Buttons */}
        <div className="form-group">
          <button id="resetButton" type="reset" className="btn btn-default" onClick={(e)=>this.handleReset(e)}>Reset</button> {' ' /*space*/}
          <button id="submitButton" type="submit" className="btn btn-primary" disabled={buttonEnabled}>Sign Me Up!</button>
        </div>

      </form>
    );
  }
}

//exports: DO NOT REMOVE OR CHANGE THESE
export default SignUpForm;
export {EmailInput, RequiredInput, BirthdayInput, PasswordConfirmationInput};
