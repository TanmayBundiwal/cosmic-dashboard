import React, { useState, useEffect } from 'react';
import './Donki.css';
import moment from 'moment';

const Donki = () => {
  const [solarEvents, setSolarEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolarEvents = async () => {
     
      try {
        const response = await fetch('http://localhost:3001/donki');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
      
        // console.log(JSON.stringify(data));

        const cmeEvents = data.filter(event => event.messageType === 'CME').slice(0, 5);
        setSolarEvents(cmeEvents);

      } catch (error) {
        console.error("Error fetching solar event data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolarEvents();
  }, []);
  
  if (loading) {
    return <div>Loading solar event data...</div>;
  }

  if (!solarEvents || solarEvents.length === 0) {
    return <div>No recent solar event data available.</div>;
  }

  // Function to calculate time ago
  function timeAgo(timestamp) {
    const now = moment(); // Current time
    const then = moment(timestamp); // Provided timestamp
    const diffDays = now.diff(then, 'days'); // Difference in days
    const diffHours = now.diff(then, 'hours'); // Difference in hours
    if (diffDays > 0) {
        if (diffDays === 1) {
            return `1 day, ${diffHours % 24} hours ago`;
        } else {
            return `${diffDays} days, ${diffHours % 24} hours ago`;
        }
    } else {
        return `${diffHours} hours ago`;
    }
  }

  const formatCardContentNew = (message) => {
    // Initialize an object to store the required information
    const requiredInfo = {
      estimatedSpeed: '',
      estimatedHalfAngle: '',
      direction: {
        longitude: '',
        latitude: '',
        coordinatesText: ''
      },
      messageDateTime: '',
      links: []
    };
  
    // Split the message into lines
    const lines = message.split('\n');
  
    lines.forEach(line => {
      if (line.includes('Estimated speed:')) {
        requiredInfo.estimatedSpeed = line.substring(line.indexOf('Estimated speed:') + 16).trim();
      } else if (line.includes('Estimated opening half-angle:')) {
        requiredInfo.estimatedHalfAngle = line.substring(line.indexOf('Estimated opening half-angle:') + 29).trim();
      } else if (line.includes('Direction (lon./lat.):')) {
        const directionStartIndex = line.indexOf('Direction (lon./lat.):') + 23;
        const directionEndIndex = line.indexOf('in Heliocentric Earth Equatorial coordinates.');
        const directionInfo = line.substring(directionStartIndex, directionEndIndex).trim().split('/');
        requiredInfo.direction.longitude = directionInfo[0].trim();
        requiredInfo.direction.latitude = directionInfo[1].trim();
        requiredInfo.direction.coordinatesText = line.substring(directionEndIndex).trim();
      } else if (line.includes('Message Issue Date:')) {
        requiredInfo.messageDateTime = timeAgo(line.substring(line.indexOf('Message Issue Date:') + 19).trim());
      } else if (line.startsWith('http')) {
        requiredInfo.links.push(line.trim());
      }
    });
  
    return (
      <div>
        <p className="top-right">{requiredInfo.messageDateTime}</p>
        <p><strong>Estimated Speed:</strong> {requiredInfo.estimatedSpeed}</p>
        <p><strong>Estimated Half Angle:</strong> {requiredInfo.estimatedHalfAngle}</p>
        <p><strong>Direction (Longitude/Latitude):</strong> {requiredInfo.direction.longitude}/{requiredInfo.direction.latitude}</p>
        {/* <p><strong>Coordinates Text:</strong> {requiredInfo.direction.coordinatesText}</p> */}
        {/* <p><strong>Mins ago:</strong> {requiredInfo.messageDateTime}</p> */}
        <p><strong>Links to NASA Visualizations:</strong></p>
        <div className="links-container" style={{ display: 'flex' }}>
                {requiredInfo.links.map((link, index) => (
                    <a key={index} href={link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                        <img src={`/link_new_tab.png`} alt={`Link ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                    </a>
                ))}
            </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="separator"></div>
      <h1>Recent Coronal Mass Ejections</h1>
      <div className="card-container">
        {solarEvents.map((event, index) => (
          <div key={index} className="card">
            {formatCardContentNew(event.messageBody)}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Donki;
