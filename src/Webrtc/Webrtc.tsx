import React from 'react';
import io from 'socket.io';
import RTCMultiConnection from 'rtcmulticonnection';
import './Webrtc.css';
import ReactDOM from 'react-dom';
import {Console} from 'console';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

interface Props {
}

class Webrtc extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: 'default',
            disable: false,
        };
        this.startConnection = this.startConnection.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: { target: { value: any } }) {
        this.setState({value: event.target.value});
    }

    startConnection() {
        this.setState({disable: true});
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

        var videoContainer = document.getElementById('videoContainer');
        connection.onStream = function (event: any) {
            var video = event.mediaElement;
            videoContainer!.appendChild(video);
        };

        connection.openOrJoin(this.state.value);
    }

    render() {
        return (
            <Container fluid className='Webrtc'>
                <div className={'myin myinput text-center'}>
                    <Button
                        disabled={this.state.disable}
                        onClick={this.startConnection}
                    >
                        Connect
                    </Button>
                </div>
                <div id='videoContainer' className={"videoContainer"}>

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
