import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RequiredInput from './RequiredInput';
import SignUpForm from './TeamSignUp';
import PasswordConfirmationInput from "./PasswordConfirmationInput";
import {shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('<RequiredInput /> component', () => {
  var wrapper;
  beforeEach(function() {
    wrapper = mount(<SignUpForm />);
  });

  it ('should render error messages for name', () => {
      wrapper = shallow(<RequiredInput />);
      wrapper.setProps({ errorMessage:"we need to know your name", value: ""});
      expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label></label><input class=\"form-control\" value=\"\"/><p class=\"help-block error-missing\">we need to know your name</p></div>");
  });
  
  it ('should not render error messages for name', () => {
      wrapper = shallow(<RequiredInput />);
      wrapper.setProps({ errorMessage:"we need to know your name", value: "A" });
      expect(wrapper.html()).toEqual("<div class=\"form-group\"><label></label><input class=\"form-control\" value=\"A\"/></div>");
  });
  
  it ('should update for a changing input', () => {
    wrapper.find('#name').find('input').simulate('change', {target:{value:'Eric'}});
    var state = wrapper.state();
    expect(state.name).toEqual({ value: 'Eric', valid: true});
  });
});

