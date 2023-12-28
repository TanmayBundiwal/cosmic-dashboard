import React, { useState, useEffect } from 'react';
import './Donki.css';

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
        setSolarEvents(data.slice(0, 5)); // Get only the top 5 events
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

  // Custom function to extract and format the message details
  const formatCardContent = (message) => {
    const parts = message.split('##').map(part => part.trim()).filter(part => part.length > 0);
    return parts.map((part, index) => <p key={index}>{part}</p>);
  };

  return (
    <div>
      <h1>Space Weather Events</h1>
      <div className="card-container">
        {solarEvents.map((event, index) => (
          <div key={index} className="card">
            {formatCardContent(event.messageBody)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donki;
