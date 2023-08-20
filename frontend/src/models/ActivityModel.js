/**
 * Classe représentant le modèle Activité.
 * Contient des données et des méthodes associées à ce modèle.
 *
 * @class
 */
export class ActivityModel {
  /**
   * Crée une instance du modèle Activité.
   *
   * @constructor
   * @param {Object} data - Les données à utiliser pour initialiser le modèle.
   */
  constructor(data) {
    this.id = data.userId;
    this.sessions = data.sessions;
  }

  /**
   * Récupère les sessions d'activité formatées.
   *
   * @method
   * @returns {Array} - Tableau de sessions d'activité formatées.
   */
  getSessions() {
    const formattedSessions = this.sessions.map((session) => {
      const date = new Date(session.day);
      return {
        name: date.getDate(),
        weight: session.kilogram,
        calories: session.calories,
      };
    });
    return formattedSessions;
  }
}
