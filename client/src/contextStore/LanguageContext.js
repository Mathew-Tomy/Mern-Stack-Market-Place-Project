// LanguageContext.js
import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const changeLanguage = (lng) => {
    setLanguage(lng);
    setSelectedLanguage(lng); 
  };

  return (
    <LanguageContext.Provider value={{ language, selectedLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
export default LanguageProvider;