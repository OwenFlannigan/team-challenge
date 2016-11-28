import React, { Component } from 'react';
import SignUpForm from './TeamSignUp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="page-header">
          <h1>Sign Up</h1>
          <h2><small>Our service is fun and awesome, but you must be 13 years old to join</small></h2>
          <hr />
        </div>
        <SignUpForm />
      </div>
    );
  }
}

export default App;
