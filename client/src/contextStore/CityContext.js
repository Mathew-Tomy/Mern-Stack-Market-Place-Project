// CityContext.js for fetch city

import React, { createContext, useState, useEffect } from 'react';
import { fetchCity } from '../services/CityData';

export const CityContext = createContext();

const CityContextProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const citiesData = await fetchCity();
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCityData();
  }, []);

  const selectCity= (city) => {
    setSelectedCity(city);
  };

  return (
    <CityContext.Provider value={{cities, selectedCity, selectCity }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;

