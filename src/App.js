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
        <h1>Space Dashboard</h1>
      </header>
      <main className="dashboard-main">
        <section className="dashboard-section left-column">
          <button 
            className="toggle-button"
            onClick={() => setShowApod(!showApod)}>
            {showApod ? 'Show Mars Images' : 'Show Astronomy Picture Of the Day'}
          </button>
          {showApod ? <Apod /> : <MarsImages />}
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
