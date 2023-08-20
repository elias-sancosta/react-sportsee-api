import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import useFetch from '../../hooks/hook';

import Loader from '../../components/ui/loader/Loader';
import KeyDatasChart from '../../components/charts/keyDatas/KeyDatasChart';
import AverageSessionChart from '../../components/charts/averageSession/AverageSessionChart';
import PerformanceChart from '../../components/charts/performance/PerformanceChart';
import ActivityChart from '../../components/charts/activity/ActivityChart';
import ScoreChart from '../../components/charts/score/ScoreChart';
import { Link } from 'react-router-dom';
import '../../components/ui/error/error.css';
import './dashboard.css';

/**
 * Composant de tableau de bord principal affichant les graphiques et les données clés.
 * Gère le chargement et l'affichage des données utilisateur.
 *
 * @returns {React.ReactNode} Composant de tableau de bord.
 */
export default function Dashboard() {
  const { id } = useParams();

  // Utilisation du hook de récupération de données pour obtenir les informations utilisateur
  const { data, isError, isLoading, errorMessage } = useFetch(id);
  const user = data;
  const error = errorMessage;

  const [userId, setUserId] = useContext(UserContext);

  // Mise à jour du contexte d'utilisateur avec l'ID actuel
  useEffect(() => {
    setUserId(id);
  }, [id, setUserId]);

  return (
    <div key={userId} className="content">
      {isError ? (
        <div className="error__container connection__error">
          <h1>404</h1>
          <h2>
            Oups! Une erreur est survenue lors du chargement des données:{' '}
            {error}.
          </h2>
          <Link to="/" className="error__link">
            Retourner sur la page d'accueil
          </Link>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="dashboard__screen">
          <div className="dashboard__header">
            <h1>
              Bonjour{' '}
              <span className="userName">{user.userInfos.firstName}</span>
            </h1>
            <h2>Félicitations! Vous avez explosé vos objectifs hier 👏🏼</h2>
          </div>
          <div className="dashboard__content">
            <div className="dashboard__graphs">
              <ActivityChart />
              <div className="dashboard__graphs__bottom">
                <AverageSessionChart />
                <PerformanceChart />
                <ScoreChart />
              </div>
            </div>
            <KeyDatasChart />
          </div>
        </div>
      )}
    </div>
  );
}
