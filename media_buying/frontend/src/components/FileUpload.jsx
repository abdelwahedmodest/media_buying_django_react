// Importation des modules React nécessaires
import React, { useState } from 'react';

// Importation de l'icône Upload depuis la bibliothèque Lucide React
import { Upload } from 'lucide-react';

// Importation du hook de contexte de langue pour la traduction
import { useLanguage } from '../contexts/LanguageContext';

// Importation de la fonction permettant de téléverser un fichier via l'API
import { uploadFile } from '../services/api';

// Définition du composant FileUpload
export default function FileUpload() {
  // Récupération de la fonction de traduction depuis le contexte de langue
  const { t } = useLanguage();

  // État pour gérer si un fichier est en train d'être glissé dans la zone de dépôt
  const [isDragging, setIsDragging] = useState(false);

  // État pour suivre l'état du téléversement (en cours ou non)
  const [isUploading, setIsUploading] = useState(false);

  // État pour stocker le statut du téléversement ('success' ou 'error')
  const [uploadStatus, setUploadStatus] = useState(null);

  // Fonction déclenchée lorsqu'un fichier est glissé dans la zone de dépôt
  const handleDragOver = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du navigateur
    setIsDragging(true); // Active l'état "en train de glisser"
  };

  // Fonction déclenchée lorsqu'un fichier quitte la zone de dépôt sans être déposé
  const handleDragLeave = () => {
    setIsDragging(false); // Désactive l'état "en train de glisser"
  };

  // Fonction déclenchée lorsqu'un fichier est déposé dans la zone de dépôt
  const handleDrop = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut
    setIsDragging(false); // Désactive l'état "en train de glisser"

    // Récupération du premier fichier déposé
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file); // Téléversement du fichier
    }
  };

  // Fonction déclenchée lorsqu'un fichier est sélectionné manuellement via l'explorateur de fichiers
  const handleFileSelect = async (e) => {
    const file = e.target.files[0]; // Récupération du premier fichier sélectionné
    if (file) {
      await handleFileUpload(file); // Téléversement du fichier
    }
  };

  // Fonction qui gère l'upload du fichier vers l'API
  const handleFileUpload = async (file) => {
    setIsUploading(true); // Indique que le téléversement est en cours
    setUploadStatus(null); // Réinitialise le statut de téléversement

    try {
      await uploadFile(file); // Envoi du fichier à l'API
      setUploadStatus('success'); // Mise à jour du statut en cas de succès
    } catch (error) {
      setUploadStatus('error'); // Mise à jour du statut en cas d'échec
    } finally {
      setIsUploading(false); // Fin du téléversement (réussite ou échec)
    }
  };

  // Rendu du composant
  return (
    <div className="w-full max-w-xl mx-auto p-6">
      {/* Zone de dépôt avec une bordure qui change de couleur en fonction de l'état de glissement */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver} // Gestion du glissement de fichier
        onDragLeave={handleDragLeave} // Gestion de la sortie du fichier
        onDrop={handleDrop} // Gestion du dépôt de fichier
      >
        {/* Champ de sélection de fichier caché */}
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleFileSelect} // Gestion de la sélection de fichier
        />

        {/* Label cliquable permettant d'ouvrir l'explorateur de fichiers */}
        <label
          htmlFor="fileInput"
          className="cursor-pointer flex flex-col items-center"
        >
          {/* Icône de téléversement */}
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          {/* Texte d'instruction traduit */}
          <p className="text-gray-600">{t('dragAndDrop')}</p>
        </label>

        {/* Message affiché pendant le téléversement */}
        {isUploading && (
          <p className="mt-4 text-blue-600">{t('uploading')}</p>
        )}

        {/* Message affiché en cas de succès du téléversement */}
        {uploadStatus === 'success' && (
          <p className="mt-4 text-green-600">{t('uploadSuccess')}</p>
        )}

        {/* Message affiché en cas d'échec du téléversement */}
        {uploadStatus === 'error' && (
          <p className="mt-4 text-red-600">{t('uploadError')}</p>
        )}
      </div>
    </div>
  );
}
