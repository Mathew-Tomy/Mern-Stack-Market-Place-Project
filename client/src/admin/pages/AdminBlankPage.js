import React from "react";
import adminLayout from "../hoc/adminLayout"
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import SimpleSider from '../../components/Siders/SimpleSider';
import '../../components/CreateSell/CreateSell.css';
import { createCategory } from "./CreateCategory";

class AdminBlankPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "",  errors: [] };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
       
    };

    onSubmitHandler(e) {
        e.preventDefault();
        let { title } = this.state;
        let obj = { title };
        this.setState({ loading: true });
    
        createCategory(obj)
            .then(res => {
                if (res.error) {
                    this.setState({ loading: false });
                    this.setState({ errors: res.error });
                    this.setState({ alertShow: true });
                } else {
                    this.props.history.push(`/admin`);
                }
            })
            .catch(err => {
                console.error('Creating category error:', err);
                this.setState({ loading: false });
                this.setState({ errors: ['Error creating category. Please try again later.'] });
                this.setState({ alertShow: true });
            });
    }
    
    render() {
        return (
            <>
                <SimpleSider />
                <div className='container'>
                    <h1 className="heading">Add a Category</h1>
                    <Form onSubmit={this.onSubmitHandler}>
                        {this.state.alertShow &&
                            <Alert variant="danger" onClose={() => this.setState({ alertShow: false })} dismissible>
                                <p>
                                    {this.state.errors}
                                </p>
                            </Alert>
                        }
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" name="title" required onChange={this.onChangeHandler} />
                            </Form.Group>

                           
                        </Form.Row>


                       
                        {this.state.loading ?
                            <Button className="col-lg-12" variant="dark" disabled >
                                Please wait... <Spinner animation="border" />
                            </Button>
                            :
                            <Button className="col-lg-12" variant="dark" type="submit">Add product</Button>
                        }
                    </Form>
                </div>
            </>
        )
    }
}

export default adminLayout(AdminBlankPage);