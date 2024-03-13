import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill, BsFillEnvelopeFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import OlxLogo from '../../assets/OLXLogo';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import './Header.css';
import Search from './Search';
import { useHistory } from 'react-router-dom';
import { BiChevronDown } from "react-icons/bi";
import { BsBell } from 'react-icons/bs';
import { AllPostContext } from '../../contextStore/AllPostContext';
import { PostContext } from '../../contextStore/PostContext';
import { fetchCity } from '../../services/CityData';
import { LanguageContext } from '../../contextStore/LanguageContext';
// import { CityContext } from '../../contextStore/CityContext';

function Header() {
  const { changeLanguage } = useContext(LanguageContext);

    const { setPostContent } = useContext(PostContext);
    const { userData, setUserData } = useContext(Context);
    const [value, setValue] = useState('');
    const history = useHistory();
    const [showDropdown, setShowDropdown] = useState(false);
    const { getProducts } = useContext(AllPostContext);
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [searchResults, setSearchResults] = useState([]); 
    const [selectedLanguage, setSelectedLanguage] = useState(); 
     const [cities, setCities] = useState([]);
    //const {cities} = useContext(CityContext);
    useEffect(() => {
      // Fetch cities when the component mounts
      fetchCity()
        .then(res => {
          setCities(res); // Assuming res is an array of cities
        })
        .catch(err => console.log(err));
    }, []);
  
    // useEffect(() => {
    //   const getCities = async () => {
    //     try {
    //       const fetchedCategories = await fetchCity(); // Call fetchCategories from the context
    //       // No need to setCategories here, as categories are already available from the context
    //     } catch (error) {
    //       console.error('Error fetching cities:', error);
    //     }
    //   };
  
    //   getCities();
    // }, [fetchCity]); 


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
    
      const handleSelectedSearch = (city) => {
        history.push(`/view/${city}`);
      };
     

    const handleChange = (event, { newValue }) => {
        setValue(newValue);
    };
   

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };
  
       // Initialize useTranslation hook
      

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language); // Update the selected language
    changeLanguage(language); // Call the context function to change language
  };
  
  
    return (
        <div className="bannerParentDiv">
        <Navbar collapseOnSelect bg="light" variant="light">
       
                <NavLink className="navbar-brand" to="/">
                    <div className="brandName">
                        <OlxLogo />
                    </div>
                </NavLink>
                <div className="placeSearch">
                <Form inline>
                <input
                  type="text"
                  placeholder="Find Location."
                  value={wordEntered}
                  onChange={handleFilter}
                />
              </Form>
              {/* Render the dataResult div only when there is a search term entered */}
              {wordEntered && (
                <div className="dataResult">
                  {cities.slice(0, 15).map((city) => (
                    <div key={city._id} className="dataItem" onClick={() => handleSelectedSearch(city.name)}>
                    
                      <p>{(city.name)}</p> 
                    </div>
                  ))}
                </div>
              )}

                    <div id="clearBtn">
                    <Arrow />
                </div>
                </div>
                
                <div className="productSearch">
                    <Search />
                </div>
                
                <div className="language">
    <span>{selectedLanguage}</span>
    <BiChevronDown onClick={toggleDropdown} />
    {showDropdown && (
        <div className="dropdowns">
            <div className="dropdowns-item" onClick={() => handleLanguageChange('en')}>
                English
            </div>
            <div className="dropdowns-item" onClick={() => handleLanguageChange('fr')}>
                French
            </div>
        </div>
    )}
</div>


             <div className="chat">
             <BsBell></BsBell>
             </div>

             <div className="notification">
            
             </div>
             <div className="headerChildDiv">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    {userData ? (
                        <Nav>
                            <NavDropdown
                                title={<img id="navImg" src={userData.avatar} alt="user-avatar" />}
                                drop="left"
                                id="collasible-nav-dropdown"
                            >
                                <NavLink className="dropdown-item" to={`/profile/${userData._id}`}>
                                    <BsFillPersonFill />
                                    Profile
                                </NavLink>
                                <NavLink className="dropdown-item" to="/messages">
                                    <BsFillEnvelopeFill />
                                    Messages
                                </NavLink>
                                <NavDropdown.Divider />
                                <NavLink
                                    className="dropdown-item"
                                    to="/auth/logout"
                                    onClick={() => {
                                        setUserData(null);
                                    }}
                                >
                                    <IoLogOut />
                                    Log out
                                </NavLink>
                            </NavDropdown>
                            <NavLink className="nav-item" id="addButton" to="/add-product">
                                <div className="sellMenu">
                                    <SellButton />
                                    <div className="sellMenuContent">
                                        <SellButtonPlus />
                                        <span>SELL</span>
                                    </div>
                                </div>
                            </NavLink>
           
                        </Nav>
                    ) : (
                        <Nav>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                                Sign In
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-up" to="/auth/register">
                                Sign Up
                            </NavLink>
                        </Nav>
                    )}
                </Navbar.Collapse>
                </div>
        </Navbar>
        
        </div>
        
    );
}

export default Header;
