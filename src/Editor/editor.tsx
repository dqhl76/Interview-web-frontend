import React from 'react';

import CodeMirror from "@uiw/react-codemirror";
import { LanguageName, loadLanguage } from '@uiw/codemirror-extensions-langs';
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

class Editor extends React.Component {
    state = ({code:"",language:'cpp'})
    handleChange = (event: SelectChangeEvent) => {
        this.setState({ language: event.target.value as string});
    };

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
                            onChange={this.handleChange}
                        >
                            <MenuItem value={'c'}>C</MenuItem>
                            <MenuItem value={'cpp'}>C++</MenuItem>
                            <MenuItem value={'python'}>Python3</MenuItem>
                            <MenuItem value={'java'}>Java</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <CodeMirror
                    value="console.log('hello world!');"
                    height="400px"
                    theme={xcodeLight}
                    extensions={[loadLanguage(this.state.language as LanguageName)!]}
                />
            </>
        );
    }
}

export default Editor;
