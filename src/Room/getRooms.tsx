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

function GetRooms() {
    const createRoom = () => {
        console.log(CreateRoom);
    };
    return (
        <Container fluid className='bord'>
            <Row>
                <Col
                    lg={{ span: 3, offset: 3 }}
                    sm={12}
                    className={'align-items-end'}
                >
                    <div className={'option'}>
                        <Row>
                            <Col md={6} className={'text-center'}>
                                <Row className={'justify-content-center mb-2'}>
                                    <Button className={'add'}> </Button>
                                </Row>
                                <Row>
                                    <h5 className={'text-muted mb-2'}>Join</h5>
                                </Row>
                            </Col>
                            <Col md={6} className={'text-center'}>
                                <Row className={'justify-content-center mb-2'}>
                                    <Button
                                        className={'create'}
                                        onClick={createRoom}
                                    ></Button>
                                </Row>
                                <Row>
                                    <h5 className={'text-muted mb-2'}>
                                        Create
                                    </h5>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col lg={6} sm={12}>
                    <div className={'bordlist container'}>
                        <h2 className={'text-lg-center head'}>
                            Please Check Your Meetings
                        </h2>
                        {/*根据开始时间排序，下面的list里面应该存开始时间*/}
                        <div className={'listRow'}>
                            {[
                                'start time 1',
                                'start time 2',
                                'start time 3',
                                'start time 4',
                                'start time 5',
                            ].map((startTime) => (
                                <ListGroup
                                    key={startTime}
                                    className='mb-2 justify-content-center '
                                    horizontal
                                >
                                    <ListGroup.Item className='container-lg'>
                                        <Container>
                                            <Row>
                                                <Col lg={8}>
                                                    <Row className='d-flex justify-content-between align-items-start '>
                                                        <h6
                                                            className={
                                                                'id text-muted'
                                                            }
                                                        >
                                                            Room Id:123{' '}
                                                        </h6>
                                                    </Row>
                                                    <Row>
                                                        <h5
                                                            className={
                                                                'text-start'
                                                            }
                                                        >
                                                            Create By: hihihi
                                                        </h5>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6} xs={12}>
                                                            <h6
                                                                className={
                                                                    'text-muted'
                                                                }
                                                            >
                                                                {' '}
                                                                Start on:
                                                            </h6>
                                                            <p
                                                                className={
                                                                    'text-sm-start text-muted'
                                                                }
                                                            >
                                                                {startTime}
                                                            </p>
                                                        </Col>
                                                        <Col md={6} xs={12}>
                                                            <h6
                                                                className={
                                                                    'text-muted'
                                                                }
                                                            >
                                                                Duration:
                                                            </h6>
                                                            <p
                                                                className={
                                                                    'text-sm-start text-muted'
                                                                }
                                                            >
                                                                30min
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
                                                    <Button variant={'primary'}>
                                                        Get In
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ListGroup.Item>
                                    {/*开始时间*/}
                                </ListGroup>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default GetRooms;
