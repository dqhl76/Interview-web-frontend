import React from 'react';
import ReactDOM from 'react-dom';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    createRoutesFromElements,
} from 'react-router-dom';
import './index.css';
import Record from './ScreenCatch/Record';
import Editor from './Editor/editor';
import Login from './Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import GetRooms from './Room/getRooms';
import CreateRoom from './Room/CreateRoom';
import Join from './Room/Join';
import Webrtc from './Webrtc/Webrtc';
import Container from 'react-bootstrap/Container';
import Header from './Header/Header';
import Alert from 'react-bootstrap/Alert';
import Meeting from './Meeting/Meeting';

const baseURL =
    process.env.REACT_APP_BACKEND_URL || 'https://socket.realdqhl.com';

const loader = async () => {
    if (localStorage.getItem('token') === null) {
        return <Alert variant='danger'>You are not logged in</Alert>;
    }
    const res = await fetch(baseURL + '/get_rooms', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
    if (res.status !== 200) {
        return <Alert variant='danger'>You are not logged in</Alert>;
    } else {
        return res;
    }
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Header />}>
            <Route index element={<Login />} />
            <Route path='/home' loader={loader} element={<GetRooms />} />
            <Route
                path='/room/:id'
                loader={(id) => {
                    return id;
                }}
                element={<Meeting />}
            />
        </Route>,
    ),
);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
