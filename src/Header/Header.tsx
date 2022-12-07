import Button from 'react-bootstrap/Button';
import React, { FormEventHandler, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Editor from '../Editor/editor';
import { Col, Row } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
    const [user, setUser] = useState(localStorage.getItem('user'));

    const [url, setUrl] = useState('./');
    if (user == null) {
        setUser('Login');
        setUrl('./');
    }
    return (
        <Container fluid className='header'>
            <Navbar bg='dark' variant='dark'>
                <Container fluid>
                    <Navbar.Brand href='./home'>Online Interview</Navbar.Brand>
                    <Nav className='justify-content-end'>
                        <Nav.Link href={url} className='active'>
                            {user}
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet />
        </Container>
    );
};

export default Header;
