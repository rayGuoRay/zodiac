import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationComponent from './component/navigation/NavigationComponent';
import SignComponent from './component/sign/SignComponent';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      <div>
        <NavigationComponent title="ray test"/>
        <SignComponent />
      </div>
    );
  }
}

export default App;
