/**
 * Classe représentant un modèle de performance.
 * Contient des données et des méthodes associées aux performances.
 *
 * @class
 */
export class PerformanceModel {
  /**
   * Crée une instance du modèle de performance.
   *
   * @constructor
   * @param {Object} data - Les données de performance à utiliser pour initialiser le modèle.
   */
  constructor(data) {
    this.id = data.userId;
    this.kind = data.kind;
    this.kindValues = data.data;
  }

  /**
   * Traduit une chaîne de caractères de type de performance en français.
   *
   * @method
   * @param {string} string - La chaîne de caractères à traduire.
   * @returns {string} - Le type de performance traduit.
   */
  getTranslateKindString(string) {
    switch (string) {
      case 'cardio':
        return 'Cardio';
      case 'energy':
        return 'Energie';
      case 'endurance':
        return 'Endurance';
      case 'strength':
        return 'Force';
      case 'speed':
        return 'Vitesse';
      case 'intensity':
        return 'Intensité';
      default:
        return 'Aucun';
    }
  }

  /**
   * Réarrange un tableau dans l'ordre inverse.
   *
   * @method
   * @param {Array} array - Le tableau à réarranger.
   * @returns {Array} - Le tableau réarrangé.
   */
  getArrayRearrange(array) {
    return array.reverse();
  }

  /**
   * Récupère les données de performance traitées.
   *
   * @method
   * @returns {Array} - Tableau de données de performance traitées.
   */
  getProcessedDatas() {
    let kindValues = this.kindValues;
    // Formatage des données de performance
    let datas = kindValues.map((kindValue) => ({
      // Traduction du type de performance en français
      type: this.getTranslateKindString(
        Object.values(this.kind)[kindValue.kind - 1]
      ),
      // Valeur de performance
      value: kindValue.value,
    }));
    // Calcul de la valeur maximale parmi les valeurs de performance
    const max = Math.max(...kindValues.map((kindValue) => kindValue.value));
    // Attribution de la valeur maximale à chaque entrée de données
    datas.forEach((data) => (data.maxValue = max));
    // Retourne les données de performance traitées
    return datas;
  }
}
