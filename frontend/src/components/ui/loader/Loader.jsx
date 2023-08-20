import React from 'react';

import './loader.css';

/**
 * Composant de chargement.
 * Affiche un indicateur visuel de chargement.
 *
 * @component
 */
export default function Loader() {
  return (
    <div className="loader__container">
      {/* Indicateur de chargement */}
      <div className="loader"></div>
    </div>
  );
}
