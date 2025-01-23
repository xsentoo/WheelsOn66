import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importation de React Router
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router> {/* Utilisation de Router */}
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Route vers la page d'accueil */}
          {/* Ajoute d'autres routes ici pour des pages comme "Plan Your Trip", "Gallery", etc. */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
