import React, { useState } from 'react';
import Apod from './components/Apod';
import Neows from './components/Neows';
import MarsImages from './components/MarsImages';
import Donki from './components/Donki';
import './App.css';

function App() {
  const [showApod, setShowApod] = useState(true); // State to control display

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h3>Cosmic Dashboard</h3>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-section left-column">
          <Apod /> 
        </section>
        <section className="dashboard-section right-column">
          <h2>Space Events & NEO</h2>
          <Neows /> {/* Near Earth Objects in card format */}
          <Donki /> {/* Space Weather News in card format */}
        </section>
      </main>
    </div>
  );
}

export default App;
