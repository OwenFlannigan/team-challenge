import React, { Component } from 'react';
import SignUpForm from './TeamSignUp.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { submitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(state) {
    console.log('App received submit!');
    var totalElems = Object.keys(state);
    var totalValid = totalElems.reduce((total, key) => {
      if(state[key].valid)
        total++;
      return total;
    }, 0);
    this.setState({ submitted: true });
  }

  render() {
    var submitMessage = [];
    if(this.state.submitted) {
      submitMessage = <div className="alert alert-success" role="alert">Thank you for signing up!</div>
    }

    return (
      <div className="App">
        <div className="page-header">
          <h1>Sign Up</h1>
          <h2><small>Our service is fun and awesome, but you must be 13 years old to join</small></h2>
        </div>
        {submitMessage}
        <SignUpForm submitCallback={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;
