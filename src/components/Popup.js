import React from 'react';
import './Popup.css';

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Welcome to Cosmic Dashboard</h2>
        <div className="separator"></div>
        <p>This project is built from scratch and focuses on REST API handling and Data handling, with less emphasis on UI.</p>
        <div className="separator"></div>
        <h3>Project Overview:</h3>
        <ul>
          <li>This is a full-stack application with React.js as the front end and Node.js as the backend.</li>
          <li>The front end makes API calls to the backend, which in turn fetches data from NASA APIs.</li>
          <li>We are using 3 different APIs to demonstrate handling various types of data in API calls:</li>
        </ul>
        <div className="separator"></div>
        <h3>APIs Used:</h3>
        <ul>
          <li><strong>Astronomy Picture Of the Day (APOD):</strong> Main component on the left side displaying the Astronomy Picture of the Day along with its description on hover.</li>
          <li><strong>Near Earth Object Web Service (NEOWS):</strong> D3.js visualization created from scratch. Three asteroid images are dynamically plotted on the background image, with hover functionality to display information.</li>
          <li><strong>Coronal Mass Ejection (DONKI):</strong> Displays the 5 most recent Coronal Mass Ejections in card format, with calculated time elapsed since occurrence.</li>
        </ul>
        <div className="separator"></div>
        <p>This project may not have the most polished UI, as the primary focus is on backend data API calling, full-stack application development, data processing, and creating D3.js visualizations.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
