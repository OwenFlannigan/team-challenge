import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BirthdayInput from './BirthdayInput';
import EmailInput from './EmailInput';
import RequiredInput from './RequiredInput';
import SignUpForm from './TeamSignUp';
import PasswordConfirmationInput from "./PasswordConfirmationInput";
import { shallow, mount } from 'enzyme';

// Gotta include the basics, to make sure our app renders
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// Verifies the function of the birthday input 
describe('<BirthdayInput />', () => {
  var wrapper;

  // set wrapper
  beforeEach(function () {
    wrapper = shallow(<BirthdayInput />);
  });

  // Test to see if an error is presented when date is absent
  it('error; the Date of Birth is needed', () => {
    wrapper.setProps({ value: "" });
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"\"/><p class=\"help-block error-missing\">we need to know your birthdate</p></div>");
  });

  // Test to see if an error is presented when date is an invalid format
  it('error; value Date is not valid', () => {
    wrapper.setProps({ value: "Cheese" });
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"Cheese\"/><p class=\"help-block error-invalid\">that isn&#x27;t a valid date</p></div>");
  });

  // Test to see if an error is presented when date is within the last 13 years
  it('error; value Date shows that user is not old enough', () => {
    wrapper.setProps({ value: "Dec 10 2005" });
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"Dec 10 2005\"/><p class=\"help-block error-not-old\">sorry, you must be at least 13 to sign up</p></div>");
  });

  // Test to see if no error is presented when date is valid
  it('no error; value Date is valid', () => {
    wrapper.setProps({ value: "2002-03-25" });
    expect(wrapper.html()).toEqual("<div class=\"form-group\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"2002-03-25\"/></div>");
  });

  // Test to see if form's state is set properly when valid data is input
  it('checks if input updates for changing dob', () => {
    wrapper = mount(<SignUpForm />);
    wrapper.find('#dob').find('input').simulate('change', { target: { value: "Jan 10 1995" } });
    var state = wrapper.state();
    expect(state.dob).toEqual({ value: 'Jan 10 1995', valid: true });
  });

});


// Verifies the function of the EmailInput
describe('<EmailInput> component', () => {
  var wrapper;

  // set wrapper
  beforeEach(function () {
    wrapper = shallow(<EmailInput />);
  });

  // Test to see if an error is presented when email is left blank
  it('gives error that email cannot be blank', () => {
    wrapper.setProps({ value: "" });
    wrapper.errors = wrapper.instance().validate("");
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"email address\" required=\"\" value=\"\"/><p class=\"help-block error-missing\">Email address required</p></div>");
  });

  // Test to see if an error is presented when email is given in an invalid format
  it('gives error that email is invalid', () => {
    wrapper.setProps({ value: "abc" });
    wrapper.errors = wrapper.instance().validate("abc");
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"email address\" required=\"\" value=\"abc\"/><p class=\"help-block error-invalid\">This is not a valid email address</p></div>");
  });

  // Test to ensure no error is presented when email is given in a valid format
  it('shows no errors because of valid email', () => {
    wrapper.setProps({ value: "email@test.com" });
    wrapper.errors = wrapper.instance().validate("email@test.com");
    expect(wrapper.html()).toEqual("<div class=\"form-group\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"email address\" required=\"\" value=\"email@test.com\"/></div>");
  });

  // Test to see if form's state is set properly when valid data is input  
  it('should update for a changing input', () => {
    wrapper = mount(<SignUpForm />);    
    wrapper.find('#email').find('input').simulate('change', { target: { value: 'email@test.com' } });
    var state = wrapper.state();
    expect(state.email).toEqual({ value: 'email@test.com', valid: true });
  });
});

// Verifies the function of RequiredInput components
describe('<RequiredInput /> component', () => {
  var wrapper;

  // set wrapper
  beforeEach(function () {
    wrapper = shallow(<RequiredInput />);
  });

  // Test to see if an error is presented when name is left blank  
  it('should render error messages for name', () => {
    wrapper.setProps({ errorMessage: "we need to know your name", value: "" });
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label></label><input class=\"form-control\" value=\"\"/><p class=\"help-block error-missing\">we need to know your name</p></div>");
  });

  // Test to ensure np error is presented when name is entered 
  it('should not render error messages for name', () => {
    wrapper.setProps({ errorMessage: "we need to know your name", value: "A" });
    expect(wrapper.html()).toEqual("<div class=\"form-group\"><label></label><input class=\"form-control\" value=\"A\"/></div>");
  });

  // Test to see if form's state is set properly when valid data is input
  it('should update for a changing input', () => {
    wrapper = mount(<SignUpForm />);    
    wrapper.find('#name').find('input').simulate('change', { target: { value: 'Eric' } });
    var state = wrapper.state();
    expect(state.name).toEqual({ value: 'Eric', valid: true });
  });
});

// Verifies the function of RequiredInput and PasswordConfirmationInput components
describe('<RequiredInput /> and <PasswordConfirmationInput /> components', () => {

  // Test to see if an error is presented when password is left blank
  it('should render error messages for password', () => {
    const wrapper = shallow(<RequiredInput />);
    wrapper.setProps({ errorMessage: "we need to know your password", value: "" });
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label></label><input class=\"form-control\" value=\"\"/><p class=\"help-block error-missing\">we need to know your password</p></div>");
  });

  // Test to ensure no error is presented when password is entered
  it('should not render error messages for password', () => {
    const wrapper = shallow(<RequiredInput />);
    wrapper.setProps({ errorMessage: "we need to know your password", value: "A" });
    expect(wrapper.html()).toEqual("<div class=\"form-group\"><label></label><input class=\"form-control\" value=\"A\"/></div>");
  });

  var wrapper;

  // set wrapper
  beforeEach(function () {
    wrapper = shallow(<PasswordConfirmationInput />);
  });

  // Test to ensure no error is presented when passwords match  
  it('should check if passwords match', () => {
    wrapper.setProps({ password: "123456", value: "123456" });
    expect(wrapper.html()).toEqual("<div class=\"form-group\"><label for=\"passwordConf\">Confirm Password</label><input type=\"password\" id=\"passwordConf\" name=\"passwordConf\" class=\"form-control\" value=\"123456\"/></div>");
  });

  // Test to see if an error is presented when passwords do not match  
  it('should check if passwords match', () => {
    wrapper.setProps({ password: "12345", value: "123456" });
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"passwordConf\">Confirm Password</label><input type=\"password\" id=\"passwordConf\" name=\"passwordConf\" class=\"form-control\" value=\"123456\"/><p class=\"help-block error-mismatched\">passwords don&#x27;t match</p></div>");
  });

  // Test to see if form's state is set properly when valid data is input  
  it('should update for a changing password input', () => {
    wrapper = mount(<SignUpForm />);    
    wrapper.find('#password').find('input').simulate('change', { target: { value: '123456' } });
    wrapper.find('#passwordConf').find('input').simulate('change', { target: { value: '123456' } });
    var state = wrapper.state();
    expect(state.password).toEqual({ value: '123456', valid: true });
    expect(state.passwordConf).toEqual({ value: '123456', valid: true });
  });
});

// Verifies the function of the SignUpForm
describe('<SignUpForm> component', () => {

  var wrapper;

  // set wrapper for majority
  beforeEach(function () {
    wrapper = mount(<App />);
  });

  // Test to see if the form's reset button wipes the fields and form state
  it('has a working reset button', () => {
    wrapper = mount(<SignUpForm resetCallback={() => {}}/>);    
    // type something in a field
    var name = wrapper.find('#name');
    name.simulate('change', { target: { value: 'Steve the Pirate' } });
    // on reset, all fields go blank
    var button = wrapper.find('#resetButton');
    button.simulate('click');

    var keys = ['email', 'name', 'dob', 'password', 'passwordConf'];

    var total = keys.reduce(function (total, key) {
      var state = wrapper.state();
      return total = total + state[key].value.length;
    }, 0);

    expect(total).toEqual(0);

  });

  // Test to see if the form's submit button works with valid data
  it('has a working submit button, when valid', () => {
    wrapper.find('EmailInput').find('input')
      .simulate('change', { target: { value: 'a@a.com' } });
    wrapper.find('#name')
      .simulate('change', { target: { value: 'Frank the Rabbit' } });
    wrapper.find('BirthdayInput').find('input')
      .simulate('change', { target: { value: '10/02/1988' } });
    wrapper.find('#password')
      .simulate('change', { target: { value: '28days6hours42minutes12seconds' } });
    wrapper.find('PasswordConfirmationInput').find('input')
      .simulate('change', { target: { value: '28days6hours42minutes12seconds' } });

    wrapper.find('#submitButton').simulate('submit');

    expect(wrapper.find('.alert').text()).toEqual('Thank you for signing up!');
    expect(wrapper.state().submitted).toEqual(true);
  });

  // Test to ensure submit button is disabled with no data
  it('has a disabled submit button, when empty', () => {
    var button = wrapper.find('#submitButton');
    expect(button.props().disabled).toEqual(true);
  });

  // Test to ensure submit button is disabled with invalid data
  it('has a disabled submit button, when invalid', () => {
    wrapper.find('EmailInput').find('input')
      .simulate('change', { target: { value: 'aaaaa' } });
    wrapper.find('#name')
      .simulate('change', { target: { value: '' } });
    wrapper.find('BirthdayInput').find('input')
      .simulate('change', { target: { value: '10/02/2283' } });
    wrapper.find('#password')
      .simulate('change', { target: { value: 'password' } });
    wrapper.find('PasswordConfirmationInput').find('input')
      .simulate('change', { target: { value: 'notpassword' } });

    var button = wrapper.find('#submitButton');
    expect(button.props().disabled).toEqual(true);
  });

});