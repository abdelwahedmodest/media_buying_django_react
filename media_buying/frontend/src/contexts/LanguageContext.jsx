// Importation de React, de certains hooks, et de la fonction createContext depuis la bibliothèque React
import React, { createContext, useContext, useState } from 'react';
// Importation des traductions depuis le fichier des traductions
import { translations } from '../i18n/translations';

// Création du contexte pour gérer la langue de l'application
const LanguageContext = createContext();

// Définition du fournisseur du contexte LanguageProvider
export function LanguageProvider({ children }) {
  // Déclaration d'un état local "language" avec la valeur par défaut 'en' (anglais)
  const [language, setLanguage] = useState('en');

  // Fonction de traduction qui prend une clé et retourne la traduction correspondante
  const t = (key) => {
    return translations[language][key];
  };

  // Retour du composant provider qui englobe tous les enfants et fournit les valeurs du contexte
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Création d'un hook personnalisé "useLanguage" pour accéder au contexte LanguageContext
export function useLanguage() {
  // Utilisation du hook useContext pour obtenir l'objet du contexte
  const context = useContext(LanguageContext);

  // Si le contexte est vide, une erreur est levée
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  // Retour de l'objet de contexte contenant la langue, la fonction pour la modifier et la fonction de traduction
  return context;
}
