import React from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../../components/ui/navbar/Navbar';
import Sidebar from '../../components/ui/sidebar/Sidebar';
import Error from '../../components/ui/error/Error';
import Dashboard from '../dashboard/Dashboard';

import './home.css';

/**
 * Composant de page d'accueil qui affiche soit le tableau de bord de l'utilisateur, soit une erreur.
 * Le composant contient la barre de navigation, la barre latérale et le contenu principal.
 *
 * @returns {React.ReactNode} Composant de page d'accueil.
 */
export default function Home() {
  const { id } = useParams();

  return (
    <div className="dashboard">
      <Navbar />
      <div className="main">
        <Sidebar />
        {id === '12' || id === '18' ? <Dashboard /> : <Error />}
      </div>
    </div>
  );
}
