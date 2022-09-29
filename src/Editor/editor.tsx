import React from 'react';

import CodeMirror, { UseCodeMirror } from "@uiw/react-codemirror";
import { LanguageName, loadLanguage } from '@uiw/codemirror-extensions-langs';
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import axios from "axios";

interface EditorProps{

}
interface EditorState{

}
class Editor extends React.Component<EditorProps,EditorState> {
    private editor = React.createRef<any>();
    state = ({code:"",language:'cpp'})
    handleEditorChange = (value: String) => {
        this.setState({code:value})
    }

    handleSubmit = async() => {
        let postData = {
              source_code: this.state.code,
              language_id: 54,
        }
        await axios({
            method: 'post',
            url: 'http://182.92.215.108:2358/submissions',
            params: {base64_encoded: 'false', wait: 'true'},
            headers: {
              'Content-Type': 'application/json',
              'X-Auth-Token': 'X-Auth-Token'
            },
            data: postData
        }).then(function (response) {
            console.log(response);
            alert(response.data.status.description + " " + response.data.stdout)
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            Language
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={this.state.language}
                            label='Language'
                        >
                            <MenuItem value={'c'}>C (GCC 7.4.0)</MenuItem>
                            <MenuItem value={'cpp'}>C++ (GCC 7.4.0)</MenuItem>
                            <MenuItem value={'python'}>Python (3.8.1)</MenuItem>
                            <MenuItem value={'java'}>Java (OpenJDK 13.0.1)</MenuItem>
                            <MenuItem value={'javascript'}>JavaScript (Node.js 12.14.0)</MenuItem> 
                            <MenuItem value={'php'}>PHP (7.4.1)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <CodeMirror 
                    ref={this.editor}
                    value=""
                    height="400px"
                    theme={xcodeLight}
                    extensions={[loadLanguage(this.state.language as LanguageName)!]}
                    onChange={this.handleEditorChange}
                    />
                <Button onClick={this.handleSubmit}>   Run   </Button>
            </>
        );
    }
}

export default Editor;
