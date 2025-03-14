import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { fetchCampaigns } from '../services/api';

export default function Campaigns() {
  const { t } = useLanguage();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const response = await fetchCampaigns();
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        setError(t('error'));
        setLoading(false);
      }
    };

    loadCampaigns();
  }, [t]);

  if (loading) {
    return <div className="text-center py-8">{t('loading')}</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">{t('campaigns')}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{campaign.name}</h3>
            <p className="text-gray-600 mt-2">{campaign.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}