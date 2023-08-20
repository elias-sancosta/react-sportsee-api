import React, { useState } from 'react';

/**
 * Contexte utilisateur pour fournir et gérer les données utilisateur dans l'application.
 * @type {React.Context<Array<null|Object, Function>>}
 */
const UserContext = React.createContext([{}, () => {}]);

/**
 * Fournisseur de contexte utilisateur.
 * Il encapsule les composants enfants avec le contexte utilisateur.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {React.ReactNode} props.children - Composants enfants encapsulés.
 * @returns {React.ReactNode} Composants enfants encapsulés avec le contexte utilisateur.
 */
const UserProvider = (props) => {
  // État local pour stocker les données de l'utilisateur
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

// Export des éléments du contexte
export { UserContext, UserProvider };
