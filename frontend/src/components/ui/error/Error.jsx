import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/userContext';

import './error.css';

/**
 * Composant d'erreur 404.
 * Affiche un message d'erreur et un lien pour revenir à la page d'accueil.
 *
 * @component
 */
export default function Error() {
  const [userId] = useContext(UserContext);

  return (
    <div key={userId} className="error__container">
      <h1>Oups!</h1>
      <h2> La page que vous demandez est en construction.</h2>
      <Link to={`/user/${userId}`} className="error__link">
        Retourner sur la page d'accueil
      </Link>
    </div>
  );
}
