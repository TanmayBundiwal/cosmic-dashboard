import React, { useState, useEffect } from 'react';
import Apod from './components/Apod';
import Neows from './components/Neows';
import MarsImages from './components/MarsImages';
import Donki from './components/Donki';
import Popup from './components/Popup'; // Import Popup component
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(true); // State to control display

  useEffect(() => {
    const popupShown = localStorage.getItem('popupShown');
    if (!popupShown) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    localStorage.setItem('popupShown', 'true');
    setShowPopup(false);
  };

  return (
    <div className="app">
      {showPopup && <Popup onClose={handleClosePopup} />}
      <div className="dashboard">
        <header className="dashboard-header">
          <h3>Cosmic Dashboard - An API, Data Processing and Data visualization Project</h3>
        </header>
        <main className="dashboard-main">
          <section className="dashboard-section left-column">
            <Apod /> 
          </section>
          <section className="dashboard-section right-column">
            <Neows /> {/* Near Earth Objects interactive visualization */}
            <img className="scroll-down-image" src={"./Scroll_Down.png"}  />
            <Donki /> {/* Space Weather News in card format */}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
