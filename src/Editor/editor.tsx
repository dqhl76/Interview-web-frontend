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
import { Button } from '@mui/material';
import axios from 'axios';

class Editor extends React.Component {
    private editor = React.createRef<any>();
    state = { code: '', language: 'cpp', languageId: 54 };
    handleEditorChange = (value: String) => {
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
        await axios({
            method: 'post',
            url: 'https://oj.realdqhl.com/submissions',
            params: { base64_encoded: 'false', wait: 'true' },
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': 'X-Auth-Token',
            },
            data: postData,
        })
            .then(function (response) {
                console.log(response);
                alert(
                    response.data.status.description +
                        ' ' +
                        response.data.stdout,
                );
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    render() {
        return (
            <div>
                <Box sx={{ minWidth: 120 }} className='select-language'>
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
                </Box>
                <CodeMirror
                    ref={this.editor}
                    value=''
                    height='600px'
                    width='800px'
                    theme={xcodeLight}
                    extensions={[
                        loadLanguage(this.state.language as LanguageName)!,
                    ]}
                    onChange={this.handleEditorChange}
                    className='code-block'
                />
                <Button onClick={this.handleSubmit} className='submit'>
                    {' '}
                    Run{' '}
                </Button>
            </div>
        );
    }
}

export default Editor;
