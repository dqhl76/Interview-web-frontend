import Button from 'react-bootstrap/Button';
import React, {FormEventHandler, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Editor from "../Editor/editor";
import {Col, Row} from "react-bootstrap";
import "./login.css"




class Login extends React.Component {

    render(){

        return (

                <Container fluid className="bord">
                    <Navbar bg="dark" variant="dark">
                        <Container className="container-sm">
                            <Navbar.Brand href="#home">OnlineCode</Navbar.Brand>
                            <Nav className="me-auto">
                                <Nav.Link href="#editor">Editor</Nav.Link>
                                <Nav.Link href="#login" className="active">login</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                    <div className="sm log_con">
                        <Row className="justify-content-sm-center">
                            <Col>

                                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
                                    <Tab eventKey="login" title="Login">
                                        <Form className="form_log is-invalid" >
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />

                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                            <Button type="submit" variant="primary" className="btn_submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Tab>
                                    <Tab eventKey="signup" title="Sign Up">
                                        <Form className="form_log was-validated">
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" required/>
                                            </Form.Group>

                                            <Form.Group className="mb-3 password" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password"required/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 re-password" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Re-Password"required/>
                                            </Form.Group>
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>

                    </div>

                </Container>

        );
    }
}

export default Login;

