import express from 'express';
import mysql from 'mysql2';

const app = express();
const port = 5000;

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'trip_planner_db',
  port:'3308'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données');
  }
});

// Récupérer les destinations
app.get('/api/destinations', (req, res) => {
  db.query('SELECT * FROM destinations', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des destinations:', err);
      res.status(500).send('Erreur interne');
    } else {
      res.json(results);
    }
  });
});

// Récupérer les détails des budgets pour chaque destination
app.get('/api/trip-details', (req, res) => {
  const query = `
    SELECT b.destination_id, c.name as category, b.value 
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    ORDER BY b.destination_id, c.name
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des détails des budgets:', err);
      res.status(500).send('Erreur interne');
    } else {
      // Organiser les résultats par destination
      const tripDetails = results.reduce((acc, row) => {
        if (!acc[row.destination_id]) {
          acc[row.destination_id] = [];
        }
        acc[row.destination_id].push({
          category: row.category,
          value: row.value
        });
        return acc;
      }, {});
      
      res.json(tripDetails);
    }
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
