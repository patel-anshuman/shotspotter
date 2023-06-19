// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import Navbar from '../common/Navbar';
import './StudioPage.css';

const StudioPage = () => {
  const categories = ["Portrait", "Landscape", "Lensmith", "Aperture", "Focalist", "Exposurist", "Shutterpro", "Imagemaker", "Cameralist", "Visualizer", "Lightographer", "Framographer", "Pictor", "Lumino", "Chroma", "Photowizard"];

  const locations = ["Delhi", "Mumbai", "Nagpur", "Kerala", "Punjab", "Pune", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Chandigarh", "Jaipur", "Ahmedabad", "Lucknow", "Bhopal", "Guwahati", "Kochi"];

  const [photographers, setPhotographers] = useState([]);

  useEffect(() => {
    // Fetch photographers from the backend API
    fetch('http://localhost:4002/studio')
      .then((response) => response.json())
      .then((data) => setPhotographers(data))
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();
  const handleCardClick = (studioID) => {
    navigate(`/studio/${studioID}`);
  };

  return (
    <div>
      <Navbar />

      <div id='container'>
        <div className="filter-box">
          {/* Category filter */}
          <div className="filter-section">
            <h3>Categories</h3>
            {categories.map((category) => (
              <div key={category}>
                <input type="radio" name="category" value={category} />
                <label>{category}</label>
              </div>
            ))}
          </div>

          <hr />

          {/* Location filter */}
          <div className="filter-section">
            <h3>Locations</h3>
            {locations.map((location) => (
              <div key={location}>
                <input type="radio" name="location" value={location} />
                <label>{location}</label>
              </div>
            ))}
          </div>

          <hr />

          {/* Price filter */}
          <div className="filter-section">
            <h3>Price Range</h3>
            <div>
              <input type="radio" name="price" value="5000" />
              <label>Below ₹5,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="5000-10000" />
              <label>₹5,000 - ₹10,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="10000-20000" />
              <label>₹10,000 - ₹20,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="20000-30000" />
              <label>₹20,000 - ₹30,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="30000-40000" />
              <label>₹30,000 - ₹40,000</label>
            </div>
            <div>
              <input type="radio" name="price" value="40000-50000" />
              <label>₹40,000 - ₹50,000</label>
            </div>
          </div>

        </div>

        <div className="photographers-list">
          {photographers.map((photographer) => (
            <div
              key={photographer.id}
              className="card"
              onClick={() => handleCardClick(photographer.id)}
            >
              <div className="card-header">
                <div className="studio-info">
                  <div className="studio-image">
                    <img src={photographer.image} alt="Photographer" />
                  </div>
                  <div className="studio-details">
                    <h4>{photographer.name}</h4>
                    <p>{photographer.address}</p>
                    <p>{photographer.phoneNumber}</p>
                    <div className="categories">
                      {photographer.categories.map((category) => (
                        <span key={category.id} className="category-bubble">
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="price-info">
                  <div>
                    <p>Starts from:</p>
                    <p>{photographer.price}</p>
                  </div>
                  <div>
                    <p>{photographer.votes} Votes</p>
                    <p>
                      Star symbol {photographer.rating}
                    </p>
                  </div>
                </div>
              </div>
              <div className="image-container">
                {photographer.images.map((image) => (
                  <img key={image.id} src={image.url} alt="Photographer" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
