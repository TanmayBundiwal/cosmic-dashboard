import React, { useState, useEffect } from 'react';
import './MarsImages.css';

const MarsImages = () => {
  const [marsPhotos, setMarsPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [photosPerPage] = useState(4); // Number of photos you want to display per page

  useEffect(() => {
    const fetchMarsPhotos = async () => {

      try {
        const response = await fetch('http://localhost:3001/marsimages');
        const data = await response.json();
        setMarsPhotos(data.photos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Mars rover photos: ", error);
      }

    };

    fetchMarsPhotos();
  }, []);

  // Calculate the current photos to display
  const indexOfLastPhoto = (currentPage + 1) * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = marsPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading Mars rover photos...</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Mars Rover Photos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currentPhotos.map(photo => (
          <div key={photo.id} style={{ padding: '10px' }}>
            <img src={photo.img_src} alt={`Mars Rover`} style={{ maxWidth: '100%', borderRadius: '10px' }} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastPhoto >= marsPhotos.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MarsImages;
