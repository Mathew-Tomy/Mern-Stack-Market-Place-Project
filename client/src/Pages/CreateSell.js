import { useEffect, useState } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { createProduct } from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';
import { fetchCategories } from '../services/CategoryData';
import { fetchCity } from '../services/CityData';

const AddProduct = ({ history }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ title: "", price: "", description: "", city: "", category: "", image: "" });
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [errors, setErrors] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        // Fetch categories from the database when the component mounts
        const getCategories = async () => {
          try {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };
    
        getCategories();
      }, []); // Empty

      useEffect(() => {
        // Fetch cities when the component mounts
        fetchCity()
          .then(res => {
            setCities(res); // Assuming res is an array of cities
          })
          .catch(err => console.log(err));
      }, []);



    const onChangeHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.files) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        const { title, price, description, city, category, image } = formData;
        const obj = { title, price, description, city, category };
        getBase64(image)
            .then((data) => {
                obj['image'] = data;
                createProduct(obj)
                    .then(res => {
                        if (res.error) {
                            setLoading(false);
                            setErrors(res.error);
                            setAlertShow(true);
                        } else {
                            history.push(`/categories/${category}/${res.productId}/details`);
                        }
                    })
                    .catch(err => console.error('Creating product err: ', err));
            })
            .catch(err => console.error('Converting to base64 err: ', err));
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    return (
        <>
            <SimpleSider />
            <div className='container'>
                <h1 className="heading">Add a Product</h1>
                <Form onSubmit={onSubmitHandler}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>{errors}</p>
                        </Alert>
                    }
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" required onChange={onChangeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" required onChange={onChangeHandler} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required onChange={onChangeHandler} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="city" required onChange={onChangeHandler}>
                                <option>Choose...</option>
                                {cities.map(city => (
                                        <option  value={city.name}>{city.name}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="category" required onChange={onChangeHandler}>
                                <option>Choose...</option>
                                {categories.map(category => (
                                        <option  value={category.title}>{category.title}</option>
                                    ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridImage" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" type="file" required onChange={onChangeHandler} />
                        </Form.Group>
                    </Form.Row>
                    {loading ?
                        <Button className="col-lg-12" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button className="col-lg-12" variant="dark" type="submit">Add product</Button>
                    }
                </Form>
            </div>
        </>
    );
};

export default AddProduct;
