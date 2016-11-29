import React from 'react';
import {shallow, mount} from 'enzyme';
import ReactDOM from 'react-dom';
import App from './App';
import EmailInput from './EmailInput';
import SignUpForm from './TeamSignUp.js';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// Tests for EmailInput
describe('<EmailInput> component', () => {

  var wrapper;

  beforeEach(function() {
    wrapper = mount(<SignUpForm />);
  })

    // field left blank test
    it('gives error that email cannot be blank', () => {
    wrapper = shallow(<EmailInput />);
    wrapper.setProps({value:""});
    wrapper.errors = wrapper.instance().validate("");
    expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"email address\" required=\"\" value=\"\"/><p class=\"help-block error-missing\">Email address required</p></div>");

    });

    // invalid value test
    it('gives error that email is invalid', () => {
        wrapper = shallow(<EmailInput />);
        wrapper.setProps({value:"abc"});
        wrapper.errors = wrapper.instance().validate("abc");
        expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"email address\" required=\"\" value=\"abc\"/><p class=\"help-block error-invalid\">This is not a valid email address</p></div>");
    })

   // valid value test
    it('shows no errors because of valid email', () => {
        wrapper = shallow(<EmailInput />);
        wrapper.setProps({value:"email@test.com"});
        wrapper.errors = wrapper.instance().validate("email@test.com");
        expect(wrapper.html()).toEqual("<div class=\"form-group\"><label for=\"email\">Email</label><input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"email address\" required=\"\" value=\"email@test.com\"/></div>");
    })

    it('should update for a changing input', () => {

      wrapper.find('#email').find('input').simulate('change', {target:{value:'email@test.com'}});
      var state = wrapper.state();
      expect(state.email).toEqual({value:'email@test.com', valid: true});

    })
});



