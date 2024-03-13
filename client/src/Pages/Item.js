import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb'
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
import Aside from '../components/Details/Aside/Aside';
import { getSpecific } from '../services/productData'
import { useParams, useHistory } from 'react-router-dom';
import { PostContext } from '../contextStore/PostContext';

function Item() {
    const { postContent } = useContext(PostContext);
    const { _id } = postContent;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getSpecific(_id);
                setProduct(productData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, [_id]);

    if (loading) {
        return <Spinner animation="border" />;
    }

    return (
        <>
            <SimpleSider />
            <div className="container">
            {!loading ? (
                    <>
                <Breadcrumb params={postContent} />
                <Row>
                    <Col lg={8} id="detailsProduct">
                        <ProductInfo params={product} />
                    </Col>
                    <Col lg={4}>
                        <Aside params={product} history={history} />
                    </Col>
                    </Row></>) : (<Spinner animation="border" />)}
            </div>
        </>
    )
}

export default Item;
