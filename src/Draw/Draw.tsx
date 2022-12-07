import React, { createRef, useEffect, useState } from 'react';
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
    const [drawData, setDrawData] = useState('');
    useEffect(() => {
        socket.on('connect', () => {
            setConnected(true);
        });
        console.log(room_id);
        socket.emit('join', room_id);
        socket.on('message', (data) => {
            console.log(data);
            if (data != drawData) {
                setDrawData(data);
            }
        });
    });

    return (
        <CanvasDraw
            immediateLoading={true}
            saveData={drawData}
            onChange={(canvas) => {
                socket.emit('message', drawData);
                setDrawData(canvas.getSaveData());
            }}
        ></CanvasDraw>
    );
};
export default Draw;
