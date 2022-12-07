import React from 'react';
import Container from 'react-bootstrap/Container';
import { Col, Row, Button } from 'react-bootstrap';
import Editor from '../Editor/editor';
import './Meeting.css';
import Record from '../ScreenCatch/Record';
import Webrtc from '../Webrtc/Webrtc';
import { useLoaderData } from 'react-router-dom';
import Draw from '../Draw/Draw';
interface IloaderData {
    params: {
        id: string;
    };
    request: Request;
}

function Meeting() {
    const loaderData = useLoaderData() as IloaderData;
    const id = loaderData.params.id;
    return (
        <div className={'met'}>
            <Row className={'metr'}>
                <Col md={6} className={'metr'}>
                    <Container fluid className={'ide1'}>
                        <Editor room_id={id} />
                    </Container>
                    {/*<Container fluid className={'score'}>*/}
                    {/*    <Editor />*/}
                    {/*</Container>*/}
                </Col>
                <Col md={6} className={'metr'}>
                    <Container fluid className={'f2f'}>
                        <Webrtc room_id={id} />
                    </Container>
                    <Container fluid className={'board'}>
                        <Draw room_id={id} />
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
