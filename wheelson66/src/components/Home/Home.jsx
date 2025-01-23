import React from 'react';
import './Home.css';
import route66Image from '../../assets/66.jpg'; // Importer l'image

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <img src={route66Image} alt="Route 66" className="route66-image" /> {/* Image directement */}
        <h1>Welcome to Route 66</h1>
        <p>Embark on an unforgettable road trip along one of the most iconic routes in America.</p>
      </section>
      <section className="features">
       
        <div className="feature-card">
          <h3>Plan Your Trip</h3>
          <p>Get all the tools you need to plan your Route 66 adventure!</p>
        </div>
        <div className="feature-card">
          <h3>Route Map</h3>
          <p>Explore the landmarks and destinations along Route 66.</p>
        </div>
        <div className="feature-card">
          <h3>Community</h3>
          <p>Connect with other travelers and share experiences.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
