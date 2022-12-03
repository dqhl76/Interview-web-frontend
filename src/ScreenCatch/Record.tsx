import React from 'react';
import './Record.css';
import RecordRTC, { getSeekableBlob, invokeSaveAsDialog } from 'recordrtc';
import { captureUserMedia, getFileName } from './RecordFunction';

interface Props {}
class Record extends React.Component<any, any> {
    constructor(props: Props) {
        super(props);

        this.state = {
            recordVideo: null,
            src: null,
            recording: false,
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
            this.state = {
                recordVideo: new RecordRTC(stream, { type: 'video' }),
                src: null,
            };
            console.log(this.state.recordVideo);
            this.state.recordVideo.startRecording();
            console.log(3);
        });
        this.setState({ recording: true });
        // setTimeout(() => {
        //     //  录制上限 回来修改
        //     this.stopRecord();

        // }, 20000);
    }

    stopRecord() {
        this.state.recordVideo.stopRecording(() => {
            let params = {
                type: 'video/webm',
                data: this.state.recordVideo.blob,
                id: Math.floor(Math.random() * 90000) + 10000,
            };
            var fileName = getFileName();

            var file = new File([this.state.recordVideo.getBlob()], fileName, {
                type: 'video/webm',
            });
            getSeekableBlob(
                this.state.recordVideo.getBlob(),
                function (seekableBlob) {
                    invokeSaveAsDialog(seekableBlob);
                },
            );
            this.setState({ recording: false });
        });
    }

    render(): JSX.Element {
        if (this.state.recording === true) {
            return (
                <div className='Record'>
                    <button
                        disabled={true}
                        onClick={this.startRecord}
                        id='startButton'
                    >
                        Start Record
                    </button>
                    <button
                        disabled={false}
                        onClick={this.stopRecord}
                        id='stopButton'
                    >
                        Stop Record
                    </button>
                </div>
            );
        } else {
            return (
                <div className='Record'>
                    <button
                        disabled={false}
                        onClick={this.startRecord}
                        id='startButton'
                    >
                        Start Record
                    </button>
                    <button
                        disabled={true}
                        onClick={this.stopRecord}
                        id='stopButton'
                    >
                        Stop Record
                    </button>
                </div>
            );
        }
    }
}

export default Record;
