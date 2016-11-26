import React from 'react';

/**
 * A component representing a controlled input for a birthdate (min age: 13)
 */
class BirthdayInput extends React.Component {
  validate(currentValue){
    if(currentValue === ''){ //check presence
      return {missing:true, isValid:false}
    }

    //check date validity
    var timestamp = Date.parse(currentValue); //use built-in Date type
    if(isNaN(timestamp)) { //it not a valid stamp
      return {notDate:true, isValid:false};
    }

    //check age range
    var d = new Date(); //today
    d.setYear(d.getFullYear() - 13); //subtract 13 from the year
    var minTimestamp = d.getTime();
    if(timestamp < minTimestamp){
      return {notOldEnough:true, isValid:false}
    }

    return {isValid: true}; //no errors
  }  
  
  handleChange(event){  
    //check validity (to inform parent)
    var isValid = this.validate(event.target.value).isValid;

    //what to assign to parent's state
    var stateUpdate = {
      'dob': {
        value:event.target.value,
        valid:isValid
      }
    };

    this.props.updateParent(stateUpdate) //update parent state
  }

  render() {
    var errors = this.validate(this.props.value); //need to validate again, but at least isolated
    var inputStyle = 'form-group';
    if(!errors.isValid) inputStyle += ' invalid';

    return (
      <div className={inputStyle}>
        <label htmlFor="dob">Birthdate</label>
        <input type="text" id="dob" name="dob" className="form-control" placeholder="your birthdate"
                value={this.props.value}
                onChange={(e) => this.handleChange(e)}
        />
        {errors.missing &&
          <p className="help-block error-missing">we need to know your birthdate</p>
        }
        {errors.notDate &&
          <p className="help-block error-invalid">that isn't a valid date</p>
        }
        {errors.notOldEnough &&
          <p className="help-block error-not-old">sorry, you must be at least 13 to sign up</p>
        }
      </div>
    );
  }
}

export default BirthdayInput;