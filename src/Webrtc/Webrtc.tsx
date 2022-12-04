import React from 'react';
import io from 'socket.io';
import RTCMultiConnection from 'rtcmulticonnection';


interface Props {}
class Webrtc extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);

        this.state = {
        };
        this.startConnection = this.startConnection.bind(this);
    }
    
    startConnection() {
        console.log('start connection');

        var connection = new RTCMultiConnection();

        connection.socketURL = 'https://muazkhan.com:9001/';

        connection.session = {
            audio : true,
            video : true
        }
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.openOrJoin('test');
    }

    render() {
        return (
            <div className='Webrtc'>
                <button
                    onClick={this.startConnection}>
                    Connect
                </button>
            </div>
        );
    }
}

export default Webrtc;