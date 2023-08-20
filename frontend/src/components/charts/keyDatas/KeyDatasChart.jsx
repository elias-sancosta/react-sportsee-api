import React, { useContext } from 'react';

import './keyDatasChart.css';

import caloryImg from '../../../assets/icons/calories_icon.svg';
import carbsImg from '../../../assets/icons/carbs_icon.svg';
import fatImg from '../../../assets/icons/fat_icon.svg';
import proteinImg from '../../../assets/icons/protein_icon.svg';
import { UserContext } from '../../../contexts/userContext';
import useFetch from '../../../hooks/hook';
import { Link } from 'react-router-dom';
import '../../ui/error/error.css';
import Loader from '../../ui/loader/Loader';

/**
 * Composant du graphique des données clés.
 * Affiche les données clés telles que les calories, les protéines, les glucides et les lipides.
 *
 * @component
 */
export default function KeyDatasChart() {
  // Récupération des données utilisateur depuis le contexte
  const [user] = useContext(UserContext);

  // Appel au hook de requête pour récupérer les données clés
  const { data, isError, isLoading, errorMessage } = useFetch(user);
  const keyDatas = data.keyData;

  // Rendu du composant avec les données clés
  return (
    <div className="keyDatas__container">
      {isError ? ( // Affichage de l'erreur en cas d'échec de chargement des données
        <div className="error__container connection__error">
          <h1>404</h1>
          <h2>
            Oups! Une erreur est survenue lors du chargement des données:
            {errorMessage}.
          </h2>
          <Link to="/" className="error__link">
            Retourner sur la page d'accueil
          </Link>
        </div>
      ) : // Affichage du chargement pendant le chargement des données
      isLoading ? (
        <Loader />
      ) : (
        <div className="keyDatas">
          <div className="user__key__datas">
            <div>
              <img src={caloryImg} alt="logo_calory" />
            </div>
            <div className="key__data__text">
              <h2>{keyDatas.calorieCount}kCal</h2>
              <span>Calories</span>
            </div>
          </div>
          <div className="user__key__datas">
            <div>
              <img src={proteinImg} alt="logo_protein" />
            </div>
            <div className="key__data__text">
              <h2>{keyDatas.proteinCount}g</h2>
              <span>Protéines</span>
            </div>
          </div>
          <div className="user__key__datas">
            <div>
              <img src={carbsImg} alt="logo_carbs" />
            </div>
            <div className="key__data__text">
              <h2>{keyDatas.carbohydrateCount}g</h2>
              <span>Glucides</span>
            </div>
          </div>
          <div className="user__key__datas">
            <div>
              <img src={fatImg} alt="logo_fat" />
            </div>
            <div className="key__data__text">
              <h2>{keyDatas.lipidCount}g</h2>
              <span>Lipides</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
