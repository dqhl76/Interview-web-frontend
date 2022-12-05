import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Rooms.css';
import { CloseButton, Container, Row } from 'react-bootstrap';

function CreateRoom() {
    const Time = () => {
        let st = document.getElementById('startTime') as HTMLInputElement;
        let dur = document.getElementById('endTime') as HTMLInputElement;

        let startTime: String = st.value;
        let duration: String = dur.value;
    };
    const close = () => {
        let window = document.getElementById('create') as HTMLElement;
        window.style.display = 'none';
    };

    return (
        <div className={'bordlist container cr'} id={'create'}>
            <Container fluid className={'text-end'}>
                <CloseButton onClick={close} />
            </Container>

            <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' />
                    <Form.Text className='text-muted'>
                        Please Enter Another Attendee's Email..
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='date' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type='Time' id={'startTime'} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>End Time(min)</Form.Label>
                    <Form.Control type='Number' id={'endTime'} />
                </Form.Group>
                <Row className={'text-center'}>
                    <Button
                        variant='primary'
                        type='submit'
                        className={'sm'}
                        onClick={Time}
                    >
                        Submit
                    </Button>
                </Row>
            </Form>
        </div>
    );
}

export default CreateRoom;
