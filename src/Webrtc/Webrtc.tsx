import React from 'react';
import io from 'socket.io';
import RTCMultiConnection from 'rtcmulticonnection';
import './Webrtc.css';
import ReactDOM from 'react-dom';
import { Console } from 'console';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { eventListeners } from '@popperjs/core';
import Row from 'react-bootstrap/esm/Row';
import { Col } from 'react-bootstrap';
interface Props {
    room_id: string;
}
interface State {
    value: string;
    disable: boolean;
    video: any;
}

class Webrtc extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: props.room_id,
            disable: false,

            video: (
                <Row>
                    <Col md={6} id={'c1'} className={'text-center'}></Col>
                    <Col md={6} id={'c2'} className={'text-center'}></Col>
                </Row>
            ),
        };
        this.startConnection = this.startConnection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: { target: { value: any } }) {
        this.setState({ value: event.target.value });
    }

    startConnection() {
        this.setState({ disable: true });
        console.log('start connection');
        console.log(this.state.value);

        var connection = new RTCMultiConnection();

        connection.socketURL = 'https://webrtc.realdqhl.com/';

        connection.session = {
            audio: true,
            video: true,
        };

        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
        };

        console.log(`room id: ${this.state.value}`);
        connection.openOrJoin(this.state.value);
        // set event listener for on stream
        let body = document.getElementsByTagName('body')[0];
        body.addEventListener('DOMNodeInserted', (event) => {
            console.log('event');
            console.log(event);
            if (event.target instanceof HTMLVideoElement) {
                if (
                    event.target.id === 'video-customer' ||
                    event.target.id === 'video-customer2'
                )
                    return;
                console.log('video');
                console.log(event.target);
                const old = event.target as HTMLVideoElement;
                const newVideo = document.createElement('video');
                if (document.getElementById('video-customer') !== null) {
                    console.log('change id');
                    newVideo.id = 'video-customer2';
                    newVideo.className = 'video-customer2';
                } else {
                    console.log('change id');
                    newVideo.id = 'video-customer';
                    newVideo.className = 'video-customer1';
                }
                newVideo.srcObject = old.srcObject;
                newVideo.autoplay = true;
                newVideo.muted = true;
                newVideo.controls = true;
                body.removeEventListener('DOMNodeInserted', (event) => {
                    console.log('remove');
                });
                if (document.getElementById('video-customer') !== null) {
                    document.getElementById('c2')?.appendChild(newVideo);
                    body.removeChild(old);
                } else {
                    document.getElementById('c1')?.appendChild(newVideo);
                    body.removeChild(old);
                }
            }
        });
    }
    render() {
        return (
            <Container fluid className='Webrtc'>
                <div className={'myin myinput text-center'}>
                    <Button
                        disabled={this.state.disable}
                        onClick={this.startConnection}
                    >
                        Click to Connect
                    </Button>
                </div>
                <div id='videoContainer' className={'videoContainer'}>
                    {this.state.video}
                </div>
                {/*<input*/}
                {/*    type='text'*/}
                {/*    value={this.state.value}*/}
                {/*    onChange={this.handleChange}*/}
                {/*/>*/}
                {/*<h4>{this.state.value}</h4>*/}
            </Container>
        );
    }
}

export default Webrtc;
