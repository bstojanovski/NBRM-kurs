import React, { Component } from 'react';
import './App.css';
import ExchangeRatesList from './components/ExchangeRateList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ExchangeRatesList />
        </header>
      </div>
    );
  }
}

export default App;
