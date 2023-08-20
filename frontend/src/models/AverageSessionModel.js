/**
 * Classe représentant un modèle de session moyenne.
 * Contient des données et des méthodes associées aux sessions moyennes.
 *
 * @class
 */
export class AverageSessionModel {
  /**
   * Crée une instance du modèle de session moyenne.
   *
   * @constructor
   * @param {Object} data - Les données à utiliser pour initialiser le modèle.
   */
  constructor(data) {
    this.id = data.userId;
    this.sessions = data.sessions;
  }

  /**
   * Récupère les données de session moyenne traitées.
   *
   * @method
   * @returns {Array} - Tableau de données de session moyenne traitées.
   */

  getProcessedDatas() {
    // Jours de la semaine
    const weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S', 'D'];
    // Traitement des données de session moyenne
    const datas = this.sessions.map((session) => ({
      // Nom du jour de la semaine
      name: weekDays[session.day],
      // Durée de la session moyenne
      sessionLength: session.sessionLength,
    }));
    // Ajout d'un élément au début et à la fin du tableau de données
    datas.unshift({ name: 'L', sessionLength: datas[0].sessionLength });
    datas.push({
      name: 'D',
      sessionLength: datas[datas.length - 1].sessionLength,
    });
    // Retourne les données de session moyenne traitées
    return datas;
  }
}
