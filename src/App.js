import React, { Component } from 'react';
import './App.css';
import KursnaLista from './components/kursnalista.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <KursnaLista />
        </header>
      </div>
    );
  }
}

export default App;
