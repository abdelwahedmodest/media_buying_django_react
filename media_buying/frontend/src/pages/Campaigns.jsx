// Importation des modules React nécessaires
import React, { useState, useEffect } from 'react';

// Importation du hook de contexte de langue pour la traduction
import { useLanguage } from '../contexts/LanguageContext';

// Importation de la fonction permettant de récupérer les campagnes depuis l'API
import { fetchCampaigns } from '../services/api';

// Définition du composant Campaigns
export default function Campaigns() {
  // Récupération de la fonction de traduction depuis le contexte de langue
  const { t } = useLanguage();

  // Déclaration de l'état local pour stocker les campagnes récupérées
  const [campaigns, setCampaigns] = useState([]);

  // État pour gérer l'affichage du chargement
  const [loading, setLoading] = useState(true);

  // État pour stocker les erreurs éventuelles
  const [error, setError] = useState(null);

  // useEffect s'exécute au montage du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les campagnes
    const loadCampaigns = async () => {
      try {
        // Appel de l'API pour récupérer les campagnes
        const response = await fetchCampaigns();
        
        // Mise à jour de l'état avec les données reçues
        setCampaigns(response.data);
        
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
    loadCampaigns();
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
      <h2 className="text-2xl font-bold mb-6">{t('campaigns')}</h2>

      {/* Grille responsive pour afficher les campagnes sous forme de cartes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          // Chaque campagne est affichée sous forme de carte avec un titre et une description
          <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{campaign.name}</h3>
            <p className="text-gray-600 mt-2">{campaign.description}</p>
            <p className="text-gray-600 mt-2">{campaign.campaign_type}</p>
            <p className="text-gray-600 mt-2">{campaign.budget}</p>
            <p className="text-gray-600 mt-2">{campaign.start_date}</p>
            <p className="text-gray-600 mt-2">{campaign.end_date}</p>
            <p className="text-gray-600 mt-2">{campaign.target_audience}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
