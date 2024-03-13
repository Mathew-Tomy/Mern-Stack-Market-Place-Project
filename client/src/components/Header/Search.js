import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AllPostContext } from '../../contextStore/AllPostContext';
import { PostContext } from '../../contextStore/PostContext';
import SearchIcon from "../../assets/SearchIcon"
function Search() {
  const { setPostContent } = useContext(PostContext);
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // New state to track search results
  const [wordEntered, setWordEntered] = useState("");
  const { getProducts } = useContext(AllPostContext);
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response && response.products && Array.isArray(response.products)) {
          setProducts(response.products); // Set the products array
          setFilteredData(response.products);
        } else {
          console.error('Invalid products data:', response);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [getProducts]);
  

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  
   
  // Update search results based on filteredData
  if (searchWord.trim() === "") {
    // Reset search results if no search term is entered
    setSearchResults([]);
  } else if (Array.isArray(filteredData)) {
    const newFilter = filteredData.filter((value) => (
      value.title.toLowerCase().includes(searchWord.toLowerCase()) ||
      value.category.toLowerCase().includes(searchWord.toLowerCase())
    ));
    setSearchResults(newFilter);
  }
};
 

  const clearInput = () => {
    setSearchResults([]);
    setWordEntered("");
  };

  const handleSelectedSearch = (item) => {
    setPostContent(item);
    history.push("/item");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Find Cars, Mobile, Motorcycles and more..."
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {searchResults.length !== 0 && Array.isArray(searchResults) && (
        <div className="dataResult">
          {searchResults.slice(0, 15).map((value, key) => (
            <div key={key} className="dataItem" onClick={() => handleSelectedSearch(value)}>
              <p>{value.title}</p>
            </div>
          ))}
        </div>
      )}
      <div data-aut-id="btnSearch" class="_3jHVg"><SearchIcon /> 
      </div>
    </div>
  );
}

export default Search;
