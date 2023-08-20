import React, { useState } from 'react';

/**
 * Contexte API pour fournir et gérer les informations liées à l'API dans l'application.
 * @type {React.Context<Array<null|string, Function>>}
 */
const ApiContext = React.createContext([{}, () => {}]);

/**
 * Fournisseur de contexte API.
 * Il encapsule les composants enfants avec le contexte API.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {React.ReactNode} props.children - Composants enfants encapsulés.
 * @returns {React.ReactNode} Composants enfants encapsulés avec le contexte API.
 */
const ApiProvider = (props) => {
  // État local pour stocker le statut simulé de l'API
  const [mockedStatus, setMockedStatus] = useState(null);
  return (
    <ApiContext.Provider value={[mockedStatus, setMockedStatus]}>
      {props.children}
    </ApiContext.Provider>
  );
};

// Export des éléments du contexte
export { ApiContext, ApiProvider };
