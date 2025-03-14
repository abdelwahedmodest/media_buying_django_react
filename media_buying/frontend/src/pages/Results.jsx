// Importation des modules React nécessaires
import React, { useState, useEffect } from 'react';

// Importation du hook de contexte de langue pour la traduction
import { useLanguage } from '../contexts/LanguageContext';

// Importation de la fonction permettant de récupérer les campagnes depuis l'API
import { fetchResults } from '../services/api';

// Définition du composant Campaigns
export default function Results() {
  // Récupération de la fonction de traduction depuis le contexte de langue
  const { t } = useLanguage();

  // Déclaration de l'état local pour stocker les campagnes récupérées
  const [Results, setResults] = useState([]);

  // État pour gérer l'affichage du chargement
  const [loading, setLoading] = useState(true);

  // État pour stocker les erreurs éventuelles
  const [error, setError] = useState(null);

  // useEffect s'exécute au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les campagnes
    const loadResults = async () => {
      try {
        // Appel de l'API pour récupérer les campagnes
        const response = await fetchResults();
        
        // Mise à jour de l'état avec les données reçues
        setResults(response.data);
        //console.log(response.data)
        // Désactivation du mode chargement
        setLoading(false);
      } catch (err) {
        // En cas d'erreur, mise à jour de l'état avec un message d'erreur traduit
        setError(t('error'));
        
        // Désactivation du mode chargement
        setLoading(false);
      }
    };

    // Exécution de la fonction de chargement des campagnes
    loadResults();
  }, [t]); // Dépendance sur `t` pour s'assurer que la traduction est mise à jour en cas de changement de langue

  // Affichage d'un message de chargement tant que les données ne sont pas récupérées
  if (loading) {
    return <div className="text-center py-8">{t('loading')}</div>;
  }

  // Affichage d'un message d'erreur en cas d'échec du chargement des données
  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  // Rendu principal du composant lorsque les campagnes sont chargées
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Titre de la section, traduit selon la langue sélectionnée */}
      <h2 className="text-2xl font-bold mb-6">{t('results')}</h2>

      {/* Grille responsive pour afficher les campagnes sous forme de cartes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Results.map((Result) => (
          // Chaque campagne est affichée sous forme de carte avec un titre et une description
          <div key={Result.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{Result.campaign.name}</h3>
            <p className="text-gray-600 mt-2">{Result.impressions}</p>
            <p className="text-gray-600 mt-2">{Result.clicks}</p>
            <p className="text-gray-600 mt-2">{Result.conversions}</p>
            <p className="text-gray-600 mt-2">{Result.cost_per_click}</p>
            <p className="text-gray-600 mt-2">{Result.conversion_rate}</p>
            <p className="text-gray-600 mt-2">{Result.roas}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
