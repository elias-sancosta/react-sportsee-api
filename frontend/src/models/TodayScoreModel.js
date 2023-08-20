/**
 * Classe représentant un modèle de score du jour.
 * Contient des données et des méthodes associées au score du jour.
 *
 * @class
 */
export class TodayScoreModel {
  /**
   * Crée une instance du modèle de score du jour.
   *
   * @constructor
   * @param {Object} data - Les données de score du jour à utiliser pour initialiser le modèle.
   */
  constructor(data) {
    this.id = data.userId;
    this.score = data.todayScore;
  }

  /**
   * Récupère le score du jour formaté.
   *
   * @method
   * @returns {Array} - Tableau de données de score du jour formaté.
   */
  getTodayScore() {
    // Formatage des données de score du jour
    const data = [
      {
        name: 'Score',
        score: this.score * 100,
        fill: '#FF0000',
      },
    ];
    // Retourne les données de score du jour formaté
    return data;
  }
}
