import React, { useContext } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import useFetch from '../../../hooks/hook';
import { UserContext } from '../../../contexts/userContext';
import { AverageSessionModel } from '../../../models/AverageSessionModel';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import '../../ui/error/error.css';
import PropTypes from 'prop-types';
import './averageSessionChart.css';

/**
 * Composant du graphique de durée moyenne des sessions.
 * Affiche un graphique en ligne avec les données de durée moyenne des sessions.
 *
 * @component
 */
export default function AverageSessionChart() {
  // Récupération de l'ID utilisateur depuis le contexte
  const [userId] = useContext(UserContext);

  // Appel au hook de requête pour récupérer les données de durée moyenne des sessions
  const { data, isError, isLoading, errorMessage } = useFetch(
    userId,
    'average-sessions'
  );

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
          Oups! Une erreur est survenue lors du chargement des données:
          {errorMessage}.
        </h2>
        <Link to="/" className="error__link">
          Retourner sur la page d'accueil
        </Link>
      </div>
    );
  }

  // Création d'une instance de modèle de durée moyenne des sessions pour traiter les données
  const averageSessionModel = new AverageSessionModel(data);
  const processedData = averageSessionModel.getProcessedDatas();

  // Composant personnalisé pour le contenu du tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom__tooltip__average">
          <div className="tooltip__details__average">
            <p className="label__average">
              {payload[0].payload.sessionLength} min
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Composant personnalisé pour la zone de curseur
  const CustomCursorArea = ({ points }) => {
    return (
      <Rectangle
        fill="#000000"
        opacity={0.1}
        x={points[0].x}
        width={300}
        height={350}
      />
    );
  };

  // Rendu du composant graphique
  return (
    <div className="average__session__graph">
      <h3>Durée moyenne des sessions</h3>
      <ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
        <LineChart
          data={processedData}
          margin={{ top: 50, right: -10, left: -10, bottom: 10 }}
        >
          <Line
            type="natural"
            dataKey="sessionLength"
            stroke="#FFFFFF"
            dot={false}
            activeDot={{
              fill: 'white',
              strokeOpacity: '.5',
              strokeWidth: '10',
              r: 4,
            }}
          />
          <XAxis
            dataKey="name"
            style={{ fill: 'rgba(255, 255, 255, 0.5' }}
            interval={0}
          />
          <YAxis hide domain={['dataMin-10', 'dataMax + 5']} />
          <Tooltip
            content={<CustomTooltip payload={processedData} />}
            cursor={<CustomCursorArea />}
            offset={-60}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Définir le type de props attendus
AverageSessionChart.propTypes = {
  processedData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sessionLength: PropTypes.number,
    })
  ),
};
