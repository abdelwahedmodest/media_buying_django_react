python   -m   venv  myvenv
django-admin startproject media_buying
cd media_buying
django-admin startapp simulation
pip install djangorestframework
pip install pandas
--------------------------------------------------------------------
Pour afficher le nom du remote repository dans un projet Git local, utilise la commande suivante :

git remote -v

Si tu veux uniquement voir le nom du remote (par défaut, c'est souvent origin) :

git remote
--------------------------------------------------------------------------
import API_BASE_URL from '../api/config';

// Update API calls in your components
const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/your-endpoint/`);
    const data = await response.json();
    // Handle data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};