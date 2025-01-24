import React, { useState, useEffect } from 'react';
import './Plan.css';

const Plan = () => {
  const [selectedTrip, setSelectedTrip] = useState('');
  const [budget, setBudget] = useState({});
  const [trips, setTrips] = useState([]); // Pour stocker les destinations
  const [tripDetails, setTripDetails] = useState({}); // Pour stocker les détails du budget par destination
  const [loading, setLoading] = useState(true); // Pour indiquer que les données sont en train de se charger

  // Fonction pour récupérer les destinations et les détails du budget
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les destinations
        const destinationsResponse = await fetch('http://localhost:5000/api/destinations');
        const destinationsData = await destinationsResponse.json();
        setTrips(destinationsData);

        // Récupérer les détails du budget pour chaque destination
        const tripDetailsResponse = await fetch('http://localhost:5000/api/trip-details');
        const tripDetailsData = await tripDetailsResponse.json();
        setTripDetails(tripDetailsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mise à jour du budget
  const handleChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  if (loading) return <p>Chargement...</p>;

  // Récupérer les catégories de budget pour la destination sélectionnée
  const selectedTripDetails = tripDetails[selectedTrip] || [];

  return (
    <div className="plan">
      <h1>Plan Your Trip</h1>

      {/* Sélection de la destination */}
      <div>
        <label htmlFor="trip">Choose your trip destination:</label>
        <select
          id="trip"
          name="trip"
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
        >
          <option value="">--Select a destination--</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.name}
            </option>
          ))}
        </select>
      </div>

      {/* Affichage des champs de budget selon la destination choisie */}
      {selectedTrip && (
        <div>
          <h2>Budget for {trips.find((trip) => trip.id === selectedTrip)?.name}</h2>
          <form>
            {selectedTripDetails.length > 0 ? (
              selectedTripDetails.map((item, index) => (
                <div key={index}>
                  <label htmlFor={item.category}>{item.category}</label>
                  <input
                    type="number"
                    id={item.category}
                    name={item.category.toLowerCase().replace(' ', '')}
                    value={budget[item.category.toLowerCase().replace(' ', '')] || ''}
                    onChange={handleChange}
                    placeholder="Enter your budget"
                  />
                </div>
              ))
            ) : (
              <p>No categories available for this destination.</p>
            )}
          </form>
          <div>
            <h3>Total Budget: ${Object.values(budget).reduce((a, b) => a + parseFloat(b || 0), 0)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plan;
