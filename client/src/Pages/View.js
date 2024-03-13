import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb';
import ProductView from '../components/Details/ProductInfo/ProductView';
import Aside from '../components/Details/Aside/Aside';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory} from "../services/CategoryData";
import { fetchProductsByCity } from "../services/CityData";


function View() {
  const { category, city } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (category) {
      // Fetch products based on category if category parameter is present
      fetchProductsByCategory(category)
        .then(res => {
          setProducts(res.products);
          setLoading(false);
        })
        .catch(err => console.log(err));
    } else if (city) {
      // Fetch products based on city if city parameter is present
      fetchProductsByCity(city)
        .then(res => {
          setProducts(res.products);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [category, city]);

  return (
    <>
      <SimpleSider />
      <div className="container">
        <Breadcrumb params={category || city} />
        <Row>
          <Col lg={8} id="detailsProduct">
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <ul>
                {products.map(product => (
                  <li key={product._id}>
                    <ProductView params={product} />
                  </li>
                ))}
              </ul>
            )}
          </Col>
          {/* <Col lg={4}>
            <Aside params={products} />
          </Col> */}
        </Row>
        
      </div>
    </>
  );
}

export default View;
