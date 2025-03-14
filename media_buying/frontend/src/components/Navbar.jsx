import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
              {t('welcome')}
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/campaigns" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t('campaigns')}
              </Link>
              <Link to="/keywords" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t('keywords')}
              </Link>
              <Link to="/results" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                {t('results')}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}