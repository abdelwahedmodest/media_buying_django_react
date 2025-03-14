// Importation du module axios pour effectuer des requêtes HTTP
import axios from 'axios';

// Création d'une instance axios avec une URL de base pour éviter de la répéter dans chaque requête
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api' // L'API est hébergée localement sur le port 8000
});

// Fonction pour récupérer la liste des campagnes via une requête GET
export const fetchCampaigns = () => api.get('/campaigns/');

// Fonction pour récupérer la liste des mots-clés via une requête GET
export const fetchKeywords = () => api.get('/keywords/');

// Fonction pour récupérer les résultats via une requête GET
export const fetchResults = () => api.get('/results/');

// Fonction pour téléverser un fichier vers l'API via une requête POST
export const uploadFile = (file) => {
  // Création d'un objet FormData pour envoyer le fichier sous le bon format
  const formData = new FormData();
  formData.append('file', file); // Ajout du fichier sous le champ 'file'
  
  // Envoi du fichier avec un en-tête spécifique pour indiquer qu'il s'agit de données multipart/form-data
  return api.post('/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// Exportation de l'instance axios pour une utilisation ailleurs dans l'application
export default api;
