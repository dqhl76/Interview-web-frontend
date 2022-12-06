import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Record from './ScreenCatch/Record';
import Editor from './Editor/editor';
import Login from "./Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Webrtc from './Webrtc/Webrtc';
import Container from "react-bootstrap/Container";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <Webrtc />
        <Record />
        <Editor />
        {/*<Record />*/}
        {/*<Editor />*/}

        <Login/>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
