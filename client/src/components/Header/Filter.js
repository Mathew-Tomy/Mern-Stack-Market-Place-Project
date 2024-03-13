//filter.js for fetching category
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import "./Filter.css";
import { fetchCategories } from '../../services/CategoryData';
import { CategoryContext } from '../../contextStore/CategoryContext';
import { PostContext } from '../../contextStore/PostContext';

function Filter() {

   const {categories} = useContext(CategoryContext);
 
  const history = useHistory(); 

 
  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories(); // Call fetchCategories from the context
        // No need to setCategories here, as categories are already available from the context
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, [fetchCategories]);  
  // Empty dependency array to ensure the effect runs only once when the component mounts

  const handleSelectedSearch = (category) => {
    history.push(`/view/${category}`);
  };

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
          <select
        name="Category"
        onChange={(e) => {
          // Handle category selection here if needed
        }}
      >
        <option value="null">ALL CATEGORIES</option>
        {categories.map(category => (
          <option 
            key={category._id} 
            value={category.title} 
            onClick={() => handleSelectedSearch(category.title)} // Add onClick event here
          >
            {category.title}
          </option>
        ))}
      </select>
          </div>
          
          <div className="otherQuickOptions">
            {categories.map(category => (
              <span key={category._id} onClick={() => handleSelectedSearch(category.title)}>{category.title}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
