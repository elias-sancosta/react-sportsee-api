import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook personnalisé pour effectuer des requêtes de données.
 * Gère le chargement des données, les erreurs et les messages d'erreur.
 *
 * @param {string} id - L'ID de l'utilisateur.
 * @param {string} path - Le chemin pour les données spécifiques.
 * @returns {Object} - Objet contenant les données, le statut de chargement, les erreurs et les messages d'erreur.
 */
const useFetch = (id, path) => {
  // Vérification du statut de données simulées dans le stockage local
  const mockedStatus = localStorage.getItem('mockedDatas');

  // Définition de l'URL de l'API en fonction du chemin
  const apiUrl =
    path === undefined
      ? `http://localhost:8080/user/${id}`
      : `http://localhost:8080/user/${id}/${path}`;

  // Définition de l'URL des données moquées
  const mockedUrl =
    path === undefined
      ? `../../data/${id}/datas.json`
      : `../../data/${id}/${path}/datas.json`;

  // Sélection de l'URL en fonction du statut de données moquées
  const url = mockedStatus === 'true' ? mockedUrl : apiUrl;

  // États pour les données, le chargement, les erreurs et les messages d'erreur
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Utilisation de useEffect pour effectuer la requête de données
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);

        // Vérification du type de contenu
        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
          console.log('Content-Type is JSON');

          // Vérification si la réponse est un objet JSON
          if (typeof response.data === 'object') {
            console.log('Data is an object:', response.data);
            setData(response.data.data);
          } else {
            console.log('Data is not an object:', response.data);
            setError(true);
            setErrorMessage('Response data is not valid JSON');
          }
        } else {
          console.log('Response is not JSON');
          setError(true);
          setErrorMessage('Response content is not JSON');
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };
    // Vérification de l'URL avant d'effectuer la requête
    if (url) {
      fetchData();
    }
  }, [url]);

  // Retourne un objet contenant les résultats de la requête
  return { data, isLoading, isError, errorMessage };
};

// Exportation du hook personnalisé
export default useFetch;
