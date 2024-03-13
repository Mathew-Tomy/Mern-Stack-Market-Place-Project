import React from "react";
import adminLayout from "../hoc/adminLayout"
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import SimpleSider from '../../components/Siders/SimpleSider';
import '../../components/CreateSell/CreateSell.css';
import { CreateCity } from "./CreateCity";


class CreateLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", errors: [], loading: false, alertShow: false };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onFileChangeHandler(e) {
        this.setState({ file: e.target.files[0] });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let { name } = this.state;
        let obj = { name };
        this.setState({ loading: true });
    
        CreateCity(obj)
            .then(res => {
                if (res.error) {
                    this.setState({ loading: false, errors: res.error, alertShow: true });
                } else {
                    this.setState({ loading: false, alertShow: false });
                    // window.location.reload();
                    this.props.history.push(`/admin/create-location`);
                }
            })
            .catch(err => {
                console.error('Error creating city:', err);
                this.setState({ loading: false, errors: ['Error creating city. Please try again later.'], alertShow: true });
            });
    }

    render() {
        return (
            <>
                <SimpleSider />
                <div className='container'>
                    <h1 className="heading">Add a City</h1>
                    <Form onSubmit={this.onSubmitHandler}>
                        {this.state.alertShow && (
                            <Alert variant="danger" onClose={() => this.setState({ alertShow: false })} dismissible>
                                <p>{this.state.errors}</p>
                            </Alert>
                        )}
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" name="name" required onChange={this.onChangeHandler} />
                            </Form.Group>
                        </Form.Row>
                        {/* <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Upload Excel File</Form.Label>
                                <Form.Control type="file" accept=".xlsx, .xls" name="file" onChange={this.onFileChangeHandler} />
                            </Form.Group>
                        </Form.Row> */}
                        {this.state.loading ? (
                            <Button className="col-lg-12" variant="dark" disabled>
                                Please wait... <Spinner animation="border" />
                            </Button>
                        ) : (
                            <Button className="col-lg-12" variant="dark" type="submit">Add city</Button>
                        )}
                    </Form>
                </div>
            </>
        );
    }
}

export default adminLayout(CreateLocation);