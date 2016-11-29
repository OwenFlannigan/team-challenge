import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm from './TeamSignUp.js';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<SignUpForm> component', () => {

  var wrapper;
  var validObjects = {};

  beforeEach(() => {
    wrapper = mount(<SignUpForm />);
  });

  it('has a working reset button', () => {
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

  it('has a working submit button', () => {
    var wrapper = mount(<App />);


    wrapper.find('EmailInput')
      .simulate('change', { target: { value: 'a@a.com' } });
    wrapper.find('#name')
      .simulate('change', { target: { value: 'Frank the Rabbit' } });
    wrapper.find('BirthdayInput')
      .simulate('change', { target: { value: '10/02/1988' } });
    wrapper.find('#password')
      .simulate('change', { target: { value: '28days6hours42minutes12seconds' } });
    wrapper.find('PasswordConfirmationInput')
      .simulate('change', { target: { value: '28days6hours42minutes12seconds' } });
      

    wrapper.find('#submitButton')
      .simulate('click');

    expect(wrapper.state().submitted).toEqual(true);
  });

});