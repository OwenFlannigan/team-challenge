import React from 'react';

/**
 * A component representing a controlled input for a password confirmation
 */
class PasswordConfirmationInput extends React.Component {
  validate(currentValue) {
    if (currentValue === '' || this.props.password === '' || !(currentValue === this.props.password)) { //check both entries
      return { mismatched: true, isValid: false };
    }

    return { mismatched: false, isValid: true }; //no errors
  }

  handleChange(event) {
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {
      'passwordConf': {
        value: event.target.value,
        valid: isValid
      }
    };
    this.props.updateParent(stateUpdate); //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if (!errors.isValid) inputStyle += ' invalid';

    return (
      <div className={inputStyle}>
        <label htmlFor="passwordConf">Confirm Password</label>
        <input type="password" id="passwordConf" name="passwordConf" className="form-control"
          value={this.props.value}
          onChange={(e) => this.handleChange(e)}
          />
        {errors.mismatched &&
          <p className="help-block error-mismatched">passwords don't match</p>
        }
      </div>
    );
  }
}

export default PasswordConfirmationInput;
