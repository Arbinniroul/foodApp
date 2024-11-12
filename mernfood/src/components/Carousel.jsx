import React, { useEffect, useState } from 'react';

const UNSPLASH_ACCESS_KEY = 'pfe1LLpNBqgbjIxuQMpwkQaylTCmrOtGOGuMkY_IQQk'; // Replace with your Unsplash access key

const foodItems = ["pizza", "burger", "sushi", "pasta", "salad"];

export default function Carousel({ setSearch }) {
  const [images, setImages] = useState([]);

  // Fetch random images for the food items
  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = await Promise.all(
        foodItems.map(async (foodItem) => {
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${foodItem}&client_id=${UNSPLASH_ACCESS_KEY}`
          );
          const data = await response.json();
          return data.urls.regular; // Use high-quality regular image
        })
      );
      setImages(fetchedImages);
    };

    fetchImages();
  }, []);

  // Check if images have been loaded
  if (images.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} style={{ position: 'relative' }}>
            <img
              className="d-block"
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '40vh', objectFit: 'cover' }} // Full width, limited height
            />
            <div className="search-bar" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // Center the search bar
              zIndex: 10, // Ensure it's above the image
              background: 'rgba(255, 255, 255, 0.8)', // Optional: semi-transparent background
              padding: '10px',
              borderRadius: '5px',
              width: '80%', // Optional: adjust width of the search bar
            }}>
              <form className="form-inline" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: '100%' }} // Ensure input takes full width
                />
              </form>
            </div>
          </div>
        ))}
      </div>

      <ol className="carousel-indicators">
        {images.map((_, index) => (
          <li
            key={index}
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
          ></li>
        ))}
      </ol>

      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
}
