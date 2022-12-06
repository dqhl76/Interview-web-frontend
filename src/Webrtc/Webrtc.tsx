import React from 'react';
import {io} from 'socket.io-client';
import RTCMultiConnection from 'rtcmulticonnection';
import './Webrtc.css';
import ReactDOM from 'react-dom';
import { Console } from 'console';
import { CanvasDesigner } from './canvas-designer-widget';

interface Props {}
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
        this.setState({ value: event.target.value });
    }

    startConnection() {
        const socket = io();
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

        var videoContainer = document.getElementById('videoContainer');
        connection.onStream = function (event: any) {
            var video = event.mediaElement;
            videoContainer!.appendChild(video);
        };

        connection.openOrJoin(this.state.value);

        

        var designer = new CanvasDesigner();

        designer.widgetHtmlURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.html';
        designer.widgetJsURL = 'https://www.webrtc-experiment.com/Canvas-Designer/widget.js'; 
        
        connection.onmessage = function(event:any) {
            designer.syncData( event.data );
            console.log(1)
        };
        
        designer.addSyncListener(function(data:any) {
            connection.send(data);
            console.log(2)
        });
        designer.setSelected('pencil');
        designer.appendTo(document.body || document.documentElement);
    }

    render() {
        return (
            <div className='Webrtc'>
                <div id='videoContainer'></div>
                <input
                    type='text'
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                <h4>{this.state.value}</h4>
                <button
                    disabled={this.state.disable}
                    onClick={this.startConnection}
                >
                    Connect
                </button>
            </div>
        );
    }
}

export default Webrtc;
