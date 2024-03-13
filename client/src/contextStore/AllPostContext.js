  // AllPostContext.js for fetching products with id

  import React, { createContext, useState ,useEffect} from 'react';
  import { getProducts } from '../services/productData';
  // import { getProducts } from '../services/productData'; 
  
  export const AllPostContext = createContext(); // Export AllPostContext as a named export
  
  const ContextAllPost = ({ children }) => {
      const [products, setProducts] = useState([]);
      useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await getProducts();
                  if (response && response.products && Array.isArray(response.products)) {
                      const suggestions = response.products.map((product) => ({
                          title: product.title,
                          category: product.category,
                          id: product._id,
                          location:product.city,
                      }));
                      setProducts(suggestions);
                  } else {
                      console.error("Invalid response from the server:", response);
                  }
              } catch (error) {
                  console.error('Error fetching products:', error);
              }
          };
          
      
          fetchData();
        }, []);
    return (
      <AllPostContext.Provider value={{ products, getProducts }}>
        {children}
      </AllPostContext.Provider>
    );
  };
  
  export default ContextAllPost;