import React, { useContext } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import useFetch from '../../../hooks/hook';
import { UserContext } from '../../../contexts/userContext';
import { PerformanceModel } from '../../../models/PerformanceModel';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import '../../ui/error/error.css';
import PropTypes from 'prop-types';
import './performanceChart.css';

/**
 * Composant du graphique de performances.
 * Affiche un graphique radar avec les données de performances de l'utilisateur.
 *
 * @component
 */
export default function PerformanceChart() {
  // Récupération de l'ID utilisateur depuis le contexte
  const [userId] = useContext(UserContext);

  // Appel au hook de requête pour récupérer les données de performances
  const { data, isError, isLoading, errorMessage } = useFetch(
    userId,
    'performance'
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
          Oups! Une erreur est survenue lors du chargement des données:{' '}
          {errorMessage}.
        </h2>
        <Link to="/" className="error__link">
          Retourner sur la page d'accueil
        </Link>
      </div>
    );
  }

  // Création d'une instance de modèle de performances pour traiter les données
  const performanceModel = new PerformanceModel(data);
  const processedData = performanceModel.getProcessedDatas();

  // Rendu du composant graphique radar
  return (
    <div className="performance__graph">
      <ResponsiveContainer width={'100%'} aspect={3.9225 / 4.0}>
        <RadarChart
          cx="50%"
          cy="50%"
          margin={{
            top: 0,
            right: 32.5,
            bottom: 0,
            left: 32.5,
          }}
          innerRadius={10}
          data={processedData}
        >
          <PolarGrid stroke="#FFFFFF" />
          <PolarAngleAxis
            dataKey="type"
            stroke="#FFFFFF"
            dy={2.5}
            tickLine={false}
            fontSize={12}
          />
          <Radar dataKey="value" fill="#FF0101" fillOpacity={0.75} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Définir le type de props attendus
PerformanceChart.propTypes = {
  processedData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      sessionLength: PropTypes.number,
    })
  ),
};
