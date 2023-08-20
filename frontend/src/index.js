import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Création d'une racine React pour le rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Fonction principale pour le rendu de l'application.
 * Utilise React.StrictMode pour des vérifications de qualité supérieure en mode de développement.
 * Utilise le composant BrowserRouter pour gérer le routage de l'application.
 *
 * @function
 */
root.render(
  <React.StrictMode>
    {/* Utilisation du composant BrowserRouter pour gérer le routage */}
    <BrowserRouter>
      {/* Rendu du composant App (composant principal de l'application) */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
