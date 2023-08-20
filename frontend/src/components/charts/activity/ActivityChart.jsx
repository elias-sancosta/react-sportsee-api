import React, { useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useFetch from '../../../hooks/hook';
import { UserContext } from '../../../contexts/userContext';
import { ActivityModel } from '../../../models/ActivityModel';
import Loader from '../../ui/loader/Loader';
import { Link } from 'react-router-dom';
import '../../ui/error/error.css';
import PropTypes from 'prop-types';
import './activityChart.css';

/**
 * Composant du graphique d'activité quotidienne.
 * Affiche un graphique en barres avec les données d'activité quotidienne.
 *
 * @component
 */
export default function ActivityChart() {
  // Récupération de l'ID utilisateur depuis le contexte
  const [userId] = useContext(UserContext);

  // Appel au hook de requête pour récupérer les données d'activité
  const { data, isError, isLoading, errorMessage } = useFetch(
    userId,
    'activity'
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

  // Création d'une instance de modèle d'activité pour traiter les données
  const activityModel = new ActivityModel(data);
  const processedData = activityModel.getSessions();

  // Fonction personnalisée pour le contenu du tooltip
  const customTooltipFunction = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom__tooltip">
          <div className="tooltip__details">
            <p className="label">{payload[0].payload.weight}kg</p>
            <p className="label">{payload[0].payload.calories}Kcal</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Rendu du composant graphique
  return (
    <div className="activity__graph">
      <h3>Activité quotidienne</h3>
      <ResponsiveContainer minWidth={'100%'} aspect={22.75 / 9}>
        <BarChart
          barGap={8}
          data={processedData}
          margin={{ top: 100, right: 30, left: 43, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            padding={{ left: -35, right: -35 }}
            tickMargin={16}
          />
          <YAxis
            dataKey="weight"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={45}
            minTickGap={27}
            tick={{ strokeWidth: 14, fill: 'var(--octonary-color)' }}
            interval={'preserveStartEnd'}
            allowDecimals={false}
            domain={['dataMin-1', 'dataMax+1']}
            yAxisId={0}
          />
          <YAxis dataKey="calories" hide yAxisId={1} />
          <Tooltip
            content={customTooltipFunction}
            offset={60}
            allowEscapeViewBox={{ x: true, y: true }}
            position={{ y: 80 }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconSize="10"
            chartWidth="350px"
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'flex-end',
              top: 20,
              right: 25,
              fontSize: '15px',
            }}
            payload={[
              {
                value: 'Poids (kg)',
                type: 'circle',
                id: 'weightActivity',
              },
              {
                value: 'Calories brûlées (kcal)',
                type: 'circle',
                id: 'caloriesActivity',
              },
            ]}
          />
          <Bar
            yAxisId={0}
            dataKey="weight"
            fill="#282D30"
            barSize={7}
            radius={[3, 3, 0, 0]}
            unit="kg"
          />
          <Bar
            yAxisId={1}
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[3, 3, 0, 0]}
            unit="kcal"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Définir le type de props attendus
ActivityChart.propTypes = {
  processedData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
    })
  ),
};
