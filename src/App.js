import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Forum from './Forum';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Forum />
      </div>
    </BrowserRouter>
  );
}

export default App;
