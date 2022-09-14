import { render } from '@testing-library/react';
import React from 'react';
import RecordRTC from 'recordrtc';
import { captureUserMedia } from './RecordFunction';

interface Props {}
class Record extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);

        this.state = {
            recordVideo: null,
            src: null,
        };
        this.requestUserMedia = this.requestUserMedia.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
    }

    requestUserMedia() {
        console.log('requestUserMedia');
        captureUserMedia((stream: any) => {
            this.setState({ src: window.URL.createObjectURL(stream) });
            console.log('setting state', this.state);
        });
    }

    startRecord() {
        captureUserMedia((stream: any) => {
            this.setState({
                recordVideo: new RecordRTC(stream, { type: 'video' }),
            });
            this.state.recordVideo.startRecording();
        });

        setTimeout(() => {
            //  录制上限 回来修改
            this.stopRecord();
        }, 4000);
    }

    stopRecord() {
        this.state.recordVideo.stopRecording(() => {
            let params = {
                type: 'video/webm',
                data: this.state.recordVideo.blob,
                id: Math.floor(Math.random() * 90000) + 10000,
            };

            RecordRTC.invokeSaveAsDialog(params.data);
        });
    }

    render(): JSX.Element {
        return (
            <div className='Record'>
                <button onClick={this.startRecord}>Start Record</button>
            </div>
        );
    }
}

export default Record;
