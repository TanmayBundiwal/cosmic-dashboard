import React, { useState, useEffect } from 'react';
import './Apod.css';

const Apod = () => {
  const [apod, setApod] = useState(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch('http://localhost:3001/apod');
        const data = await response.json();
        setApod(data);
      } catch (error) {
        console.error("Error fetching APOD data: ", error);
      }
    };

    fetchApod();
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  if (!apod) {
    return <div>Loading...</div>;
  }

  return (
    <div className="apod-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <h1 style={{ textAlign: 'center' }}>Astronomy Picture of the Day</h1>
      <div className="separator"></div>
      <img className="apod-image" src={apod.url} alt={apod.title}  />
      <div className={`apod-info ${hovered ? 'show' : 'hide'}`}>
        <h2 style={{ textAlign: 'center' }}>{apod.title}</h2>
        <p>{apod.explanation}</p>
      </div>
    </div>
  );

  
};

export default Apod;
