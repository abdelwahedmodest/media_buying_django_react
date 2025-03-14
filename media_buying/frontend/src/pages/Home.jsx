import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FileUpload from '../components/FileUpload';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t('welcome')}</h1>
      <FileUpload />
    </div>
  );
}