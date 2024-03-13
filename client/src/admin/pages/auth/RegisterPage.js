import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import '../../../components/Register/Register.css';
import { Link } from 'react-router-dom';
import authLayout from "../../hoc/authLayout";
import { useHistory } from 'react-router-dom';
import { Context } from '../../../ContextStore';
import { registerAdmin } from '../../../services/userData';

function RegisterPage()  {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
       
        email: "",
        password: "",
        repeatPassword: ""
    });

    const handleChanges = (e) => {
        e.preventDefault();
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const handleSubmitReg = (e) => {
        e.preventDefault();
        setLoading(true);
        registerAdmin(userData)
            .then(res => {
                if (!res.error) {
                    history.push('/admin/login')
                } else {
                    setLoading(false);
                    setError(res.error);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from register: ', err))
    }
        return <>
           <div className="container auth-form">
                <h1 className="auth-heading">Sign Up</h1>
                <Form className="login-form" onSubmit={handleSubmitReg}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                  
                  
                    <Form.Row>
                        <Form.Group controlId="formBasicEmail" className="col-lg-12">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" name="email" placeholder="ivan@abv.bg" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formBasicPassword" className="col-lg-6">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                           
                        </Form.Group>
                        <Form.Group className="col-lg-6">
                            <Form.Label>Reepeat Password *</Form.Label>
                            <Form.Control type="password" name="repeatPassword" placeholder="Repeat password" onChange={handleChanges} required />
                        </Form.Group>
                    </Form.Row>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign Up</Button>
                    }

                    <p className="bottom-msg-paragraph">Already have an account? <Link to="/admin/login">Sign In</Link>!</p>
                </Form>
            </div>
        </>
    
}

export default authLayout(RegisterPage);