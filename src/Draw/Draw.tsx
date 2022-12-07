import React, { createRef, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CanvasDraw from 'react-canvas-draw';
import io from 'socket.io-client';

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

    return (
        <>
            <CanvasDraw
                immediateLoading={true}
                saveData={drawData}
                onChange={(canvas) => {
                    if (
                        canvas.getSaveData() ==
                        '{"lines":[],"width":400,"height":400}'
                    ) {
                        return;
                    }
                    socket.emit('message', drawData);
                    setDrawData(canvas.getSaveData());
                }}
            />
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
        </>
    );
};
export default Draw;
