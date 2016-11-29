import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BirthdayInput from './BirthdayInput';
import SignUpForm from './TeamSignUp.js';
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<App />, div);
});

describe(<BirthdayInput />, () => {
   var wrapper;

   beforeEach(function() {
      wrapper = mount(<SignUpForm />);
   });

   it('error; the Date of Birth is needed', () => {
      const wrapper = shallow(<BirthdayInput />);
      wrapper.setProps({value: ""});
      expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"\"/><p class=\"help-block error-missing\">we need to know your birthdate</p></div>");
   });

   it('error; value Date is not valid', () => {
      const wrapper = shallow(<BirthdayInput />);
      wrapper.setProps({value: "Cheese"});
      expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"Cheese\"/><p class=\"help-block error-invalid\">&quot;that isn&#x27;t a valid date&quot;</p></div>");
   });

   it('error; value Date shows that user is not old enough', () => {
      const wrapper = shallow(<BirthdayInput />);
      wrapper.setProps({value: "Dec 10 2005"});
      expect(wrapper.html()).toEqual("<div class=\"form-group invalid\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"Dec 10 2005\"/><p class=\"help-block error-not-old\">sorry, you must be at least 13 to sign up</p></div>");
   });
   
   it('no error; value Date is valid', () => {
      const wrapper = shallow(<BirthdayInput />);
      wrapper.setProps({value: "2002-03-25"});
      expect(wrapper.html()).toEqual("<div class=\"form-group\"><label for=\"dob\">Birthdate</label><input type=\"text\" id=\"dob\" name=\"dob\" class=\"form-control\" placeholder=\"your birthdate\" value=\"2002-03-25\"/></div>");
   });

   it('checks if input updates for changing dob', () => {
      wrapper.find('#dob').find('input').simulate('change', {target: {value: "Jan 10 1995"}});
      var state = wrapper.state();
      expect(state.dob).toEqual({value: 'Jan 10 1995', valid: true})
   })

});
