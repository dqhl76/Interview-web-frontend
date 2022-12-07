import React from 'react';

import './styles.css';

import CodeMirror from '@uiw/react-codemirror';
import { LanguageName, loadLanguage } from '@uiw/codemirror-extensions-langs';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Alert, Button } from '@mui/material';
import { Input } from '@mui/material';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import io from 'socket.io-client';

const baseURL =
    process.env.REACT_APP_BACKEND_URL || 'https://socket.realdqhl.com';

const socket = io(baseURL);

interface Props {
    room_id: string;
}

interface State {
    room_id: string;
    code: string;
    language: string;
    languageId: number;
    testInput: string;
    expectedTestOutput: string;
    testResult: string;
    testSuccess: boolean;
    isResponse: boolean;
    isConnected: boolean;
}

class Editor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            room_id: props.room_id,
            code: '',
            language: 'cpp',
            languageId: 54,
            testInput: '',
            expectedTestOutput: '',
            testResult: 'Hit run to check',
            testSuccess: true,
            isResponse: false,
            isConnected: socket.connected,
        };
    }

    private editor = React.createRef<any>();
    private alert = React.createRef<any>();

    componentDidMount() {
        socket.on('connect', () => {
            this.setState({ isConnected: true });
        });
        console.log(this.state.room_id);
        socket.emit('join', this.state.room_id);
        socket.on('message', (data) => {
            console.log(data);
            this.setState({ code: data });
        });
    }

    handleEditorChange = (value: string) => {
        if (value !== this.state.code) {
            socket.emit('message', value);
        }
        this.setState({ code: value });
    };

    handleChange = (event: SelectChangeEvent) => {
        this.setState({ language: event.target.value as string });
        if (event.target.value === 'cpp') {
            this.setState({ languageId: 54 });
        } else if (event.target.value === 'c') {
            this.setState({ languageId: 50 });
        } else if (event.target.value === 'php') {
            this.setState({ languageId: 68 });
        } else if (event.target.value === 'java') {
            this.setState({ languageId: 62 });
        } else if (event.target.value === 'javascript') {
            this.setState({ languageId: 63 });
        } else if (event.target.value === 'python') {
            this.setState({ languageId: 71 });
        }
    };

    handleSubmit = async () => {
        let postData = {
            source_code: this.state.code,
            language_id: this.state.languageId,
        };
        this.setState({ isResponse: false });
        await axios({
            method: 'post',
            url: 'https://oj.realdqhl.com/submissions',
            params: {
                base64_encoded: 'false',
                wait: 'true',
                stdin: this.state.testInput,
                expected_output: this.state.expectedTestOutput,
                cpu_time_limit: 2,
                cpu_extra_time: 0.5,
                wall_time_limit: 5,
                memory_limit: 64000,
                stack_limit: 64000,
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': 'X-Auth-Token',
            },
            data: postData,
        })
            .then((response) => {
                console.log(response);
                this.setState({ isResponse: true });
                // alert(
                //     response.data.status.description +
                //         ' ' +
                //         response.data.stdout +
                //         ' ' +
                //         response.data.stderr,
                // );
                // update textResult
                this.setState({ testResult: response.data.status.description });
                // update alert severity
                if (response.data.status.description === 'Accepted') {
                    this.setState({ testSuccess: true });
                } else {
                    this.setState({ testSuccess: false });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        await new Promise((resolve) => setTimeout(resolve, 4000));
        if (!this.state.isResponse) {
            this.setState({
                testResult: 'Run failed. Check your code and rerun.',
            });
            this.setState({ testSuccess: false });
        }
    };

    render() {
        return (
            <Container>
                <Row sx={{ minWidth: 120 }} className='select-language'>
                    <FormControl size='small'>
                        <InputLabel id='demo-simple-select-label'>
                            Language
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={this.state.language}
                            label='Language'
                            onChange={this.handleChange}
                        >
                            <MenuItem value={'c'}>C (GCC 7.4.0)</MenuItem>
                            <MenuItem value={'cpp'}>C++ (GCC 7.4.0)</MenuItem>
                            <MenuItem value={'python'}>Python (3.8.1)</MenuItem>
                            <MenuItem value={'java'}>
                                Java (OpenJDK 13.0.1)
                            </MenuItem>
                            <MenuItem value={'javascript'}>
                                JavaScript (Node.js 12.14.0)
                            </MenuItem>
                            <MenuItem value={'php'}>PHP (7.4.1)</MenuItem>
                        </Select>
                    </FormControl>
                </Row>
                <Row>
                    <CodeMirror
                        ref={this.editor}
                        value={this.state.code}
                        height='450px'
                        theme={xcodeLight}
                        extensions={[
                            loadLanguage(this.state.language as LanguageName)!,
                        ]}
                        onChange={this.handleEditorChange}
                        className='code-block'
                    />
                </Row>

                <Row className={'su'}>
                    <Button
                        onClick={this.handleSubmit}
                        className='submit'
                        variant={'contained'}
                        sx={{ maxWidth: 30 }}
                    >
                        {' '}
                        Run{' '}
                    </Button>
                </Row>
                <Row className={'su'}>
                    <div className={'test-input-box'}>
                        <label className={'test-input-label'}>
                            Test input:
                            <Input
                                multiline={true}
                                onChange={(event) =>
                                    this.setState({
                                        testInput: event.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <label className={'test-output-label'}>
                            Expected test output:
                            <Input
                                multiline={true}
                                onChange={(event) =>
                                    this.setState({
                                        expectedTestOutput: event.target.value,
                                    })
                                }
                            />
                        </label>
                        <br />
                        <Row className={'su'}>
                            {/*make the severity danger when not "Accepted"*/}
                            <Alert
                                ref={this.alert}
                                severity={
                                    this.state.testSuccess ? 'success' : 'error'
                                }
                            >
                                {this.state.testResult}
                            </Alert>
                        </Row>
                    </div>
                </Row>
            </Container>
        );
    }
}

export default Editor;
