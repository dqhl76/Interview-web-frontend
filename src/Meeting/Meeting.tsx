import React from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Button } from 'react-bootstrap';
import Editor from '../Editor/editor';
import './Meeting.css';
import Record from '../ScreenCatch/Record';
import Webrtc from '../Webrtc/Webrtc';

function Meeting() {
    return (
        <div className={'met'}>
            <Row className={'metr'}>
                <Col md={6} className={'metr'}>
                    <Container fluid className={'ide1'}>
                        <Editor />
                    </Container>
                    {/*<Container fluid className={'score'}>*/}
                    {/*    <Editor />*/}
                    {/*</Container>*/}
                </Col>
                <Col md={6} className={'metr'}>
                    <Container fluid className={'f2f'}>
                        <Webrtc />
                    </Container>
                    <Container fluid className={'board'}>
                        <Editor />
                    </Container>
                    <Container fluid className={'command  text-center'}>
                        <Record />
                    </Container>
                </Col>
            </Row>
        </div>
    );
}
export default Meeting;
