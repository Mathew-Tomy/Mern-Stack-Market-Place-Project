import React, { useState, useEffect, useContext } from 'react';
import "../../assets/css/login.css"
import { Link } from 'react-router-dom';
import authLayout from "../../hoc/authLayout";
import { useHistory } from 'react-router-dom';
import { Context } from '../../../ContextStore';
import { AdminUser } from '../../../services/userData';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
function LoginPage()  {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { setUserData } = useContext(Context)

    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        AdminUser(user)
            .then(res => {
                if (!res.error) {
                    setUserData(res.user)
                    history.push('/admin')
                } else {
                    setLoading(false);
                    setError(res.error.message);
                    setAlertShow(true);
                }
            }).catch(err => console.error('error from login: ', err))
    }
 
        return <>
            <form className="login-form" onSubmit={handleSubmitLogin}>
                <div className="d-flex align-items-center my-4">
                    <h1 className="text-center fw-normal mb-0 me-3">Sign In</h1>
                </div>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input type="email" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter a valid email address" name="email" onChange={handleChanges}/>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" name="password" onChange={handleChanges}/>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    {/* <!-- Checkbox --> */}
                    <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                    </label>
                    </div>
                    <Link to="/reset-password" className="text-body">Forgot password?</Link>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Login</Button>
                    }
                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/admin/register"
                        className="link-danger">Register</a></p>
                </div>
            </form>
        </>
    
}

export default authLayout(LoginPage);