import React, { Component } from 'react';
import SignUpForm from './TeamSignUp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1>Sign Up</h1>
        </header>
        <SignUpForm />
      </div>
    );
  }
}

export default App;
