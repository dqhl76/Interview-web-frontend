import { CloseButton, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';

function Join() {
    const close = () => {
        let window = document.getElementById('Join') as HTMLElement;
        window.style.display = 'none';
    };
    return (
        <div className={'bordlist container cr'} id={'Join'}>
            <Container fluid className={'text-end'}>
                <CloseButton onClick={close} />
            </Container>

            <Form>
                <Form.Group className='mb-3'>
                    <Form.Label>Meeting Id</Form.Label>
                    <Form.Control type='text' placeholder='...' />
                    <Form.Text className='text-muted'>
                        Please Enter Meeting Id..
                    </Form.Text>
                </Form.Group>
                <Row className={'text-center'}>
                    <Button variant='primary' type='submit' className={'sm'}>
                        Submit
                    </Button>
                </Row>
            </Form>
        </div>
    );
}
export default Join;
