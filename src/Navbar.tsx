import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React from 'react';
import { container } from '@uiw/react-textarea-code-editor/cjs/styles';
function NavbarForAll() {
    // this tsx is used to templates the navbar
    // we can set the route here by setting the href
    return (
        <Navbar bg='dark' variant='dark'>
            <Container className='container-lg con'>
                <Navbar.Brand href='#editor'>OnlineCode</Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href='#editor' className='active'>
                        Editor
                    </Nav.Link>
                    <Nav.Link href='#login'>login</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
export default NavbarForAll;
