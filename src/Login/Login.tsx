import Button from 'react-bootstrap/Button';
import React, { FormEventHandler, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Alert, Col, Row } from 'react-bootstrap';
import './login.css';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const baseURL =
    process.env.REACT_APP_BACKEND_URL || 'https://socket.realdqhl.com';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [key, setKey] = useState<string>('login');
    const [registerEmail, setRegisterEmail] = useState<string>('');
    const [registerPass, setRegisterPass] = useState<string>('');
    const [registerPassConfirm, setRegisterPassConfirm] = useState<string>('');
    const [loginEmail, setLoginEmail] = useState<string>('');
    const [loginPass, setLoginPass] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [variant, setVariant] = useState<string>('danger');

    const [errorLoginMessage, setErrorLoginMessage] = useState<string>('');
    const [isErrorLogin, setIsErrorLogin] = useState<boolean>(false);
    const [variantLogin, setVariantLogin] = useState<string>('danger');
    const handleRegister = () => {
        axios
            .post(baseURL + '/register', {
                email: registerEmail,
                password: registerPass,
            })
            .then((response) => {
                console.log(response);
                setIsError(true);
                setVariant('success');
                setErrorMessage('Register success');
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setIsError(true);
                    setErrorMessage(error.response.data.data);
                }
            });
    };

    const handleLogin = () => {
        axios
            .post(baseURL + '/login', {
                email: loginEmail,
                password: loginPass,
            })
            .then((response) => {
                console.log(response);
                setIsErrorLogin(true);
                setVariantLogin('success');
                setErrorLoginMessage('Login success');
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', loginEmail);
                setTimeout(() => navigate('/home'), 500);
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setIsErrorLogin(true);
                    setErrorLoginMessage(error.response.data.message);
                }
            });
    };

    return (
        <Container fluid className='bord'>
            <div className='sm log_con'>
                <Row className='justify-content-sm-center row-login'>
                    <Col>
                        <Tabs
                            defaultActiveKey='login'
                            activeKey={key}
                            onSelect={(k) => setKey(k as string)}
                            id='uncontrolled-tab-example'
                            className='mb-3'
                        >
                            <Tab eventKey='login' title='Login'>
                                <Form className='form_log is-invalid'>
                                    <Form.Group
                                        className='mb-3'
                                        controlId='formBasicEmail'
                                    >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Enter email'
                                            value={loginEmail}
                                            onChange={(e) =>
                                                setLoginEmail(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className='mb-3'
                                        controlId='formBasicPassword'
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Password'
                                            value={loginPass}
                                            onChange={(e) =>
                                                setLoginPass(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                    <Alert
                                        key={variantLogin}
                                        variant={variantLogin}
                                        show={isErrorLogin}
                                    >
                                        {errorLoginMessage}
                                    </Alert>
                                    <Button
                                        type='submit'
                                        variant='primary'
                                        className='btn_submit'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLogin();
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Tab>
                            <Tab eventKey='signup' title='Sign Up'>
                                <Form className='form_log was-validated'>
                                    <Form.Group
                                        className='mb-3'
                                        controlId='formBasicEmail'
                                    >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Enter email'
                                            required
                                            value={registerEmail}
                                            onChange={(e) =>
                                                setRegisterEmail(e.target.value)
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group
                                        className='mb-3 password'
                                        controlId='formBasicPassword'
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Password'
                                            required
                                            value={registerPass}
                                            onChange={(e) =>
                                                setRegisterPass(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        className='mb-3 re-password'
                                        controlId='formBasicPassword'
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Re-Password'
                                            required
                                            value={registerPassConfirm}
                                            onChange={(e) =>
                                                setRegisterPassConfirm(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </Form.Group>
                                    <Alert
                                        key={variant}
                                        variant={variant}
                                        show={isError}
                                    >
                                        {errorMessage}
                                    </Alert>
                                    <Button
                                        type='submit'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRegister();
                                        }}
                                    >
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
};

export default Login;
