import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../contexts/userContext';
import Icon1 from '../../../assets/icons/yoga.svg';
import Icon2 from '../../../assets/icons/swimming.svg';
import Icon3 from '../../../assets/icons/weight.svg';
import Icon4 from '../../../assets/icons/cycling.svg';
import './sidebar.css';

/**
 * Composant de la barre latérale (sidebar).
 * Affiche les icônes de catégories d'activités et le copyright.
 *
 * @component
 */
export default function Sidebar() {
  // Récupération des données utilisateur depuis le contexte
  const [user] = useContext(UserContext);

  return (
    <div className="side-bar">
      <div className="side-bar-container">
        <ul className="side-bar-icons">
          {/* Lien vers la catégorie 'yoga' */}
          <Link to={`/user/${user}/yoga`}>
            <li>
              <img src={Icon1} alt="icon-1" />
            </li>
          </Link>
          {/* Lien vers la catégorie 'swimming' */}
          <Link to={`/user/${user}/swimming`}>
            <li>
              <img src={Icon2} alt="icon-2" />
            </li>
          </Link>
          {/* Lien vers la catégorie 'cycling' */}
          <Link to={`/user/${user}/cycling`}>
            <li>
              <img src={Icon3} alt="icon-3" />
            </li>
          </Link>
          {/* Lien vers la catégorie 'weight' */}
          <Link to={`/user/${user}/weight`}>
            <li>
              <img src={Icon4} alt="icon-4" />
            </li>
          </Link>
        </ul>
        {/* Mention de copyright */}
        <p className="copyright">Copyright, SportSee 2020</p>
      </div>
    </div>
  );
}
