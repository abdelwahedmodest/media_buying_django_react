// Importation de React pour utiliser les composants fonctionnels
import React from 'react';

// Importation du hook useLanguage depuis le contexte de langue pour gérer la sélection de la langue
import { useLanguage } from '../contexts/LanguageContext';

// Importation de l'icône Globe depuis la bibliothèque Lucide React
import { Globe } from 'lucide-react';

// Définition du composant LanguageSelector pour permettre à l'utilisateur de choisir une langue
export default function LanguageSelector() {
  // Récupération de la langue actuelle et de la fonction permettant de la modifier depuis le contexte
  const { language, setLanguage } = useLanguage();

  return (
    // Conteneur principal avec une disposition en ligne et un espacement entre les éléments
    <div className="flex items-center gap-2">
      {/* Icône de globe représentant la sélection de la langue */}
      <Globe className="w-4 h-4" />

      {/* Liste déroulante permettant à l'utilisateur de sélectionner une langue */}
      <select
        value={language} // Définit la valeur actuelle de la langue sélectionnée
        onChange={(e) => setLanguage(e.target.value)} // Met à jour la langue lorsqu'une nouvelle option est choisie
        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-2 py-1"
      >
        {/* Option pour l'anglais */}
        <option value="en">English</option>
        {/* Option pour l'arabe */}
        <option value="ar">العربية</option>
        {/* Option pour le français */}
        <option value="fr">Français</option>
      </select>
    </div>
  );
}
