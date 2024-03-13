// CategoryContext.js for fetch category

import React, { createContext, useState, useEffect } from 'react';
import { fetchCategories } from '../services/CategoryData';

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesData();
  }, []);

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ categories, selectedCategory, selectCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;

// Export fetchCategories function separately
// export const fetchCategories = async () => {
//   try {
//     const response = await fetch('your_categories_endpoint');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error('Failed to fetch categories: ' + error.message);
//   }
// };
