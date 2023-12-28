import React, { useState, useEffect } from 'react';
import './Neows.css';

const Neows = () => {
  const [neoData, setNeoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNeoData = async () => {
      
      
      try {
        const response = await fetch('http://localhost:3001/neows');
        const data = await response.json();
        setNeoData(Object.values(data.near_earth_objects)[0]); // assuming we want today's NEOs
        setLoading(false);
      } catch (error) {
        console.error("Error fetching NEO data: ", error);
      }

   
    };

    fetchNeoData();
  }, []);

  if (loading) {
    return <div>Loading NEO data...</div>;
  }

  return (
    <div className="card-container">
      <h1>Near Earth Objects (Today)</h1>
      <div className="card">
        {neoData.length > 0 ? (
          <ul>
            {neoData.map(neo => (
              <li key={neo.id}>
                <strong>{neo.name}</strong> - 
                {neo.is_potentially_hazardous_asteroid ? (
                  <span style={{ color: 'red' }}> Potentially Hazardous</span>
                ) : (
                  <span> Not Hazardous</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No near Earth objects for today.</p>
        )}
      </div>
    </div>
  );
};

export default Neows;
