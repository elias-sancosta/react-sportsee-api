// Importation des modules nécessaires depuis React et react-router
import React from 'react';
import { Route, Routes } from 'react-router';

// Importation du contexte UserProvider depuis le fichier userContext.js
import { UserProvider } from './contexts/userContext';

// Importation des différents composants et pages nécessaires
import WelcomePage from './pages/welcomePage/WelcomePage';
import Home from './pages/home/Home';
import Error from './components/ui/error/Error';
import Navbar from './components/ui/navbar/Navbar';

// Importation des styles CSS
import './styles/App.css';

/**
 * Composant principal de l'application.
 * Gère le routage et l'affichage des différentes pages.
 *
 * @component
 * @returns {React.ReactElement}
 */

function App() {
  return (
    // Utilisation du contexte UserProvider pour envelopper l'application
    <UserProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/user/:id/" element={<Home />} />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Error />
            </>
          }
        />
      </Routes>
    </UserProvider>
  );
}

// Exportation du composant App pour l'utiliser ailleurs dans l'application
export default App;
