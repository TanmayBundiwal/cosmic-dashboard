import React, { useState, useEffect } from 'react';
import './Apod.css';

const Apod = () => {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch('http://localhost:3001/apod');
        console.log(response);
        const data = await response.json();
        setApod(data);
      } catch (error) {
        console.error("Error fetching APOD data: ", error);
      }
    };

    fetchApod();
  }, []);

  if (!apod) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <h1 style={{ textAlign: 'center' }}>Astronomy Picture of the Day</h1>
      <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%' }} />
      <h2 style={{ textAlign: 'center' }}>{apod.title}</h2>
      <p>{apod.explanation}</p>
    </div>
  );
};

export default Apod;
