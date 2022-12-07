import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Rooms.css';
import { Alert, CloseButton, Container, Row } from 'react-bootstrap';
import axios from 'axios';

interface IPros {
    closeSelf: () => void;
}
const baseURL =
    process.env.REACT_APP_BACKEND_URL || 'https://socket.realdqhl.com';

const CreateRoom: React.FC<IPros> = (props) => {
    const { closeSelf } = props;
    const close = () => {
        closeSelf();
    };

    const handleSubmit = () => {
        if (email == '' || date == '' || startTime == '' || duration == '') {
            setIsAlert(true);
            setAlertMessage('Please fill all the fields');
            setVariant('danger');
            return;
        }
        const time = date + 'T' + startTime + ':00.000Z';
        axios
            .post(
                baseURL + '/create_room',
                {
                    start: time,
                    duration: duration,
                    interviewed: email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' + localStorage.getItem('token'),
                    },
                },
            )
            .then((response) => {
                console.log(response);
                if (response.data.success == false) {
                    setIsAlert(true);
                    setAlertMessage(response.data.data);
                    setVariant('danger');
                    return;
                }
                const data = response.data.data;
                setIsAlert(true);
                setAlertMessage(
                    `You have successfully planned an interview, the meeting is scheduled at ${data.start}, the duration is ${data.duration} minutes, and the interview room id is ${data.room_id}`,
                );
                setVariant('success');
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setIsAlert(true);
                    setAlertMessage(error.response.data.message);
                    setVariant('danger');
                }
            });
    };

    const [isAlert, setIsAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>('');
    const [variant, setVariant] = React.useState<string>('danger');

    const [email, setEmail] = React.useState<string>('');
    const [date, setDate] = React.useState<string>('');
    const [startTime, setStartTime] = React.useState<string>('');
    const [duration, setDuration] = React.useState<string>('');

    return (
        <div className={'bordlist container cr'} id={'create'}>
            <Container fluid className={'text-end'}>
                <CloseButton onClick={close} />
            </Container>

            <Form>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className='text-muted'>
                        Please Enter Another Attendee's Email..
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                        type='Time'
                        id={'startTime'}
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Duration(min)</Form.Label>
                    <Form.Control
                        type='Number'
                        id={'endTime'}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </Form.Group>
                <Alert key={variant} variant={variant} show={isAlert}>
                    {alertMessage}
                </Alert>
                <Row className={'text-center'}>
                    <Button
                        variant='primary'
                        type='submit'
                        className={'sm'}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        Submit
                    </Button>
                </Row>
            </Form>
        </div>
    );
};

export default CreateRoom;
