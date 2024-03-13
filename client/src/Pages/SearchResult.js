import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAll } from '../services/productData';
import { Spinner } from 'react-bootstrap';
import ProductCard from '../components/ProductCard/ProductCard';

function SearchResult() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAll(1, null, query)
            .then(res => {
                setProducts(res.products);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [query]);

    return (
        <div>
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </>
            )}
        </div>
    );
}

export default SearchResult;
