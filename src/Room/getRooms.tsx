import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import './Rooms.css';
import { Button, Col, Image, Row } from 'react-bootstrap';
import './add.png';
import { List } from '@mui/material';
import CreateRoom from './CreateRoom';
import { useLoaderData, useNavigate } from 'react-router-dom';

interface RoomItem {
    start: string;
    duration: number;
    room_id: string;
    created_id: string;
    interviewed_id: string;
    created_email: string;
    interviewed_email: string;
}

interface Room {
    data: RoomItem[];
    len: number;
    success: boolean;
}

function GetRooms() {
    const navigate = useNavigate();

    const createRoom = () => {
        setCreatePlace(<CreateRoom closeSelf={closeCreate} />);
    };

    const [createPlace, setCreatePlace] = React.useState(<div></div>);
    console.log(useLoaderData());

    const closeCreate = () => {
        setCreatePlace(<div></div>);
    };

    const loaderData = useLoaderData();
    const rooms = loaderData as Room;
    const rooms_data = rooms.data;

    let roomsItems = rooms_data.map((room) => (
        <ListGroup
            className='mb-2 justify-content-center '
            horizontal
            key={room.room_id}
        >
            <ListGroup.Item className='container-lg'>
                <Container>
                    <Row>
                        <Col lg={8}>
                            <Row className='d-flex justify-content-between align-items-start '>
                                <h6 className={'id text-muted'}>
                                    Room Id:{room.room_id}
                                </h6>
                            </Row>
                            <Row>
                                <h5 className={'text-start'}>
                                    Interview With: {room.interviewed_email}
                                </h5>
                            </Row>
                            <Row>
                                <h6 className={'text-muted text-start'}>
                                    Created by: {room.created_email}
                                </h6>
                            </Row>
                            <Row>
                                <Col md={6} xs={12}>
                                    <h6 className={'text-muted'}>
                                        {' '}
                                        Start on:{' '}
                                    </h6>
                                    <p className={'text-sm-start text-muted'}>
                                        {room.start
                                            .substring(0, 16)
                                            .replace('T', ' ')}
                                    </p>
                                </Col>
                                <Col md={6} xs={12}>
                                    <h6 className={'text-muted'}>Duration:</h6>
                                    <p className={'text-muted text-sm-start'}>
                                        {room.duration}min
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col
                            lg={4}
                            className={
                                'text-center d-flex justify-content-center align-items-center'
                            }
                        >
                            <Button
                                variant={'primary'}
                                onClick={() => {
                                    navigate('../room/' + room.room_id);
                                }}
                            >
                                Get In
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
            {/*开始时间*/}
        </ListGroup>
    ));
    console.log({ roomsItems });
    const [roomsPlace, setRoomsPlace] = React.useState(<div>{roomsItems}</div>);
    return (
        <Container fluid className='bord'>
            {createPlace}
            <Row>
                <Col
                    lg={{ span: 3, offset: 3 }}
                    sm={12}
                    className={'align-items-center'}
                >
                    <div className={'option'}>
                        <Row>
                            <Col className={'text-center'}>
                                <Row className={'justify-content-center mb-2'}>
                                    <Button
                                        className={'create'}
                                        onClick={createRoom}
                                    ></Button>
                                </Row>
                                <Row>
                                    <h5 className={'text-muted mb-2'}>
                                        Schedule Interview
                                    </h5>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={6} sm={12}>
                    <div className={'bordlist container'}>
                        <h2 className={'text-lg-center head'}>
                            Please Check Your Arrangement
                        </h2>
                        {/*根据开始时间排序，下面的list里面应该存开始时间*/}
                        <div className='listRow'>{roomsPlace}</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default GetRooms;
