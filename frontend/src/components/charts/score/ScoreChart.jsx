import React, { useContext } from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useFetch from '../../../hooks/hook';
import { UserContext } from '../../../contexts/userContext';
import { TodayScoreModel } from '../../../models/TodayScoreModel';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import '../../ui/error/error.css';
import PropTypes from 'prop-types';
import './scoreChart.css';

/**
 * Composant du graphique de score quotidien.
 * Affiche un graphique en barres radiales représentant le score quotidien de l'utilisateur.
 *
 * @component
 */
export default function ScoreChart() {
  // Récupération de l'ID utilisateur depuis le contexte
  const [userId] = useContext(UserContext);

  // Appel au hook de requête pour récupérer les données du jour
  const { data, isError, isLoading, errorMessage } = useFetch(userId);

  // Affichage du chargement pendant le chargement des données
  if (isLoading) {
    return <Loader />;
  }

  // Affichage de l'erreur en cas d'échec de chargement des données
  if (isError) {
    return (
      <div className="error__container connection__error">
        <h1>404</h1>
        <h2>
          Oups! Une erreur est survenue lors du chargement des données:{' '}
          {errorMessage}.
        </h2>
        <Link to="/" className="error__link">
          Retourner sur la page d'accueil
        </Link>
      </div>
    );
  }

  // Création d'une instance de modèle de score quotidien pour traiter les données
  const todayScoreModel = new TodayScoreModel(data);
  const processedData = todayScoreModel.getTodayScore();

  // Fonction pour personnaliser la légende du graphique
  const customizedLegend = () => {
    return (
      <div className="score__graph__legend">
        <span className="today__score">{data.todayScore * 100}%</span>
        <p>de votre objectif</p>
      </div>
    );
  };

  // Rendu du composant graphique en barres radiales
  return (
    <div className="score__graph">
      <h3>Score</h3>
      <ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="75%"
          outerRadius="85%"
          startAngle={90}
          endAngle={450}
          data={processedData}
          style={{
            backgroundColor: '#FFFFFF',
            clipPath: 'circle(37.5% at 50% 50%)',
          }}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
            fill="#FFFFFF"
          />
          <RadialBar
            minAngle={100}
            background={{ fill: '#FBFBFB' }}
            cornerRadius={35}
            clockWise
            dataKey="score"
            angleAxisId={0}
            style={{ zIndex: 5 }}
          />
          <Legend
            content={customizedLegend}
            layout="vertical"
            verticalAlign="middle"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Définir le type de props attendus
ScoreChart.propTypes = {
  processedData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      score: PropTypes.number,
      fill: PropTypes.string,
    })
  ),
};
