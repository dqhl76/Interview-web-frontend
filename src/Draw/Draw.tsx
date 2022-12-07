import React, {createRef, useEffect, useState} from 'react';
import {Button, Col} from 'react-bootstrap';
import CanvasDraw from 'react-canvas-draw';
import io from 'socket.io-client';
import Container from "react-bootstrap/Container";
import './draw.css'
import Row from "react-bootstrap/esm/Row";

interface Props {
    room_id: string;
}

const baseURL =
    process.env.REACT_APP_BACKEND_URL || 'https://socket.realdqhl.com';

const socket = io(baseURL);

const Draw = (props: Props) => {
    // create reference for CanvasDraw component
    const [room_id, setRoomId] = useState(props.room_id + 'draw');
    const [connected, setConnected] = useState(false);
    const [drawData, setDrawData] = useState(
        '{"lines":[],"width":400,"height":400}',
    );
    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
        });
        socket.emit('join', room_id);
        socket.on('message', (data) => {
            if (data != drawData) {
                setDrawData(data);
            }
        });
    });
    const divStyle = (): React.CSSProperties=>({
        width: "100%", height:'400px',position:'relative'
    })
    return (
        <Container>
            <Row>
                <Col md={8} className={'draw justify-content-center'}>
                    <CanvasDraw
                        immediateLoading={true}
                        saveData={drawData}
                        backgroundColor={'#fbfcfc'}
                        style={divStyle()}
                        onChange={(canvas) => {
                            if (
                                canvas.getSaveData() ==
                                '{"lines":[],"width":500,"height":500}'
                            ) {
                                return;
                            }
                            socket.emit('message', drawData);
                            setDrawData(canvas.getSaveData());
                        }}
                    />
                </Col>
                <Col md={4} className={'draw_btn text-center'}>
                    <Button
                        onClick={() => {
                            setDrawData('{"lines":[],"width":400,"height":400}');
                            socket.emit(
                                'message',
                                '{"lines":[],"width":400,"height":400}',
                            );
                        }}
                    >
                        ResetBoard
                    </Button>
                </Col>
            </Row>


        </Container>
    );
};
export default Draw;
