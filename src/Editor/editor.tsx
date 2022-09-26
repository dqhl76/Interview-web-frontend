import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

class Editor extends React.Component {
    state = { code: '', language: '' };
    handleChange = (event: SelectChangeEvent) => {
        this.setState({ language: event.target.value as string });
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
                <CodeEditor
                    value={this.state.code}
                    language={this.state.language}
                    placeholder='Please enter code.'
                    onChange={(evn) =>
                        this.setState({ code: evn.target.value })
                    }
                    padding={15}
                    style={{
                        fontSize: 20,
                        backgroundColor: '#f5f5f5',
                        fontFamily:
                            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                    }}
                />
            </>
        );
    }
}

export default Editor;
