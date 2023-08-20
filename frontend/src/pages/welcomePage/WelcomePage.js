import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import SportSeeLogo from '../../assets/icons/sportsee_logo.svg';
import './welcomePage.css';

/**
 * Composant de la page d'accueil qui permet à l'utilisateur de choisir entre l'API réelle ou des données simulées.
 * L'utilisateur peut également sélectionner un utilisateur pour afficher son tableau de bord.
 *
 * @returns {React.ReactNode} Composant de la page d'accueil.
 */
export default function WelcomePage() {
  const [toggle, setToggle] = useState(false);

  /**
   * Gère le changement de l'interrupteur pour basculer entre l'API réelle et les données simulées.
   * Met à jour l'état "toggle" et stocke la valeur dans le stockage local.
   */
  const handleToggle = () => {
    const switchElement = document.getElementById('switch');
    const isChecked = switchElement.checked;
    setToggle(isChecked);
    localStorage.setItem('mockedDatas', JSON.stringify(isChecked));
  };

  useEffect(() => {
    // Récupère la valeur stockée dans le stockage local lors du chargement du composant.
    const storedToggle = JSON.parse(localStorage.getItem('mockedDatas'));
    if (storedToggle !== null) {
      setToggle(storedToggle);
    }
  }, []);

  return (
    <div className="login">
      <img src={SportSeeLogo} alt="logo_SportSee" className="logo__SportSee" />
      <div className="title">
        <h2>Coaching Sportif</h2>
        <p>
          Suivez le nombre de sessions effectuées réalisées ainsi que le nombre
          de calories brûlées.
        </p>
      </div>
      <div className="users">
        {/* Liens vers les tableaux de bord des utilisateurs */}
        <Link to="/user/18">
          <img
            src="/images/cover2.jpg"
            className="user__avatar"
            alt="User 18"
          />
          <h2>Cecilia</h2>
        </Link>
        <Link to="/user/12">
          <img
            src="/images/cover1.jpg"
            className="user__avatar"
            alt="User 12"
          />
          <h2>Karl</h2>
        </Link>
      </div>
      <div className="datas__origin">
        {/* Interrupteur pour basculer entre l'API réelle et les données simulées */}
        <input
          type="checkbox"
          id="switch"
          className="checkbox"
          checked={toggle}
          onChange={handleToggle}
        />
        <label htmlFor="switch" className="toggle"></label>
        <h3>API / Mocked Datas</h3>
      </div>
    </div>
  );
}
