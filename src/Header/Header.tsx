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
    let url = './';
    let user = localStorage.getItem('user');
    if (user == null) {
        user = 'Login';
        url = './';
    }
    return (
        <Container fluid className='header'>
            <Navbar bg='dark' variant='dark'>
                <Container>
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
