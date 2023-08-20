import React from 'react';

import SportSeeLogo from '../../../assets/icons/sportsee_logo.svg';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/userContext';

import './navbar.css';

/**
 * Composant de la barre de navigation.
 * Affiche le logo SportSee et les liens de navigation en fonction de l'utilisateur connecté.
 *
 * @component
 */
export default function Navbar() {
  // Récupération des données utilisateur depuis le contexte
  const [user] = useContext(UserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <img src={SportSeeLogo} alt="SportSee Logo" />
        </Link>
      </div>
      <nav>
        <ul className="header__nav">
          <Link to={`/user/${user}`}>Accueil</Link>
          <Link to={`/user/${user}/profil`}>Profil</Link>
          <Link to={`/user/${user}/settings`}>Settings</Link>
          <Link to={`/user/${user}/community`}>Communauté</Link>
        </ul>
      </nav>
    </header>
  );
}
