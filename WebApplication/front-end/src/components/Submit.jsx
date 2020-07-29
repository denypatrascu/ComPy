import React, {createElement, useContext, useEffect, useState} from 'react';
import axios from "axios";

import { domain } from "../config/deploy";
import { AuthContext } from "./Auth";

/* Components */
import Header from './Header';
import { TextareaAutosize, Button } from '@material-ui/core';
import ComPySubmitArea from './includes/SubmitArea';

/* Styling */
import { SubmitContainer } from '../assets/styles/Submit';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Global } from '../assets/styles/Dashboard';

import '../assets/css/Preview.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Submit = (props) => {
    const [code, setCode] = useState('');
    const [file, setFile] = useState(null);
    const [submit, setSubmit] = useState(null);
    const [snackbar, setSnackbar] = useState(null);

    const [problem, setProblem] = useState({});
    const [preview, setPreview] = useState(generatePreview(null));
    const id = props.match.params.id;

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (Object.keys(problem).length === 0) {
            axios.get(`${domain}/problems/${id}`)
                .then(response => {
                    setProblem(response.data);
                    generatePreview(response.data.content);
                })
                .catch(error => console.log(error));
        }

        if (file) {
            setSubmit(generateSubmit(file.name));
        } else if (code.length > 0) {
            setSubmit(generateSubmit('RAW CODE'));
        } else {
            setSubmit(null);
        }
    }, [id, preview, code, file, snackbar]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar(null);
    };

    function generatePreview(problemItems) {
        let children = [];

        if (!problemItems || problemItems.length === 0) {
            children.push(createElement('p', {}, 'Nothing to preview! 😵'))
        }

        if (!problemItems) {
            return createElement('div', {}, children);
        }

        for (const item of problemItems) {
            switch (item.type) {
                case 'header':
                    children.push(createElement('h1', {}, item.value));
                    break;
                case 'paragraph':
                    children.push(createElement('p', {}, item.value));
                    break;
                case 'input\\output':
                    for (const key of Object.keys(item.data)) {
                        if (!item.data[key].visible) continue;
                        children.push(createElement('h1', { className: 'input'}, `Input`));
                        children.push(createElement('code', { className: 'input' },
                            createElement('pre', {}, item.data[key].input))
                        );
                        children.push(createElement('h1', { className: 'output'}, `Output`));
                        children.push(createElement('code', { className: 'output'},
                            createElement('pre', {}, item.data[key].output))
                        );
                    }
                    break;
                case 'attachment':
                    try {
                        axios.get(`${domain}/problems/${id}/attachment`)
                            .then(request => {
                                for (const url of request.data) {
                                    children.push(createElement('div', { className: 'image-container' },
                                        createElement('img', {
                                            className: 'attachment',
                                            src: url
                                        })
                                    ));
                                    if (children.length === 0) {
                                        children.push(createElement('p', {}, 'Nothing to preview! 😵'))
                                    }
                                    setPreview(createElement('div', {}, children));
                                }
                            })
                            .catch(err => console.error(err));
                    } catch (err) {
                        console.error(err);
                    }
                    break;
                default:
            }
        }

        if (children.length === 0) {
            children.push(createElement('p', {}, 'Nothing to preview! 😵'))
        }

        setPreview(createElement('div', {}, children));
    }

    function generateSubmit(what) {
        return (
            <div className="submit-button-container">
                <Button variant="contained" onClick={async e => await handleSubmit()}>SUBMIT "{what}"</Button>
            </div>
        )
    }

    function generateSnackbar(status, options = {}) {
        switch (status) {
            case 'sent':
                return (
                    <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
                        <Alert severity="info" onClose={handleClose}>Your submission has been send!</Alert>
                    </Snackbar>
                );
            case 'received':
                return (
                    <Snackbar open={true} autoHideDuration={5000} onClose={handleClose}>
                        <Alert severity="success" onClose={handleClose}>You got {options.score} points!</Alert>
                    </Snackbar>
                );
            case 'error':
                return (
                    <Snackbar open={true} autoHideDuration={5000} onClose={handleClose}>
                        <Alert severity="error" onClose={handleClose}>An error occurred!</Alert>
                    </Snackbar>
                );
        }

    }

    async function handleSubmit() {
        async function handleTestCases(data) {
            let testCases = [];
            for (const item of problem.content) {
                if (item.type !== 'input\\output') continue;

                for (const tc of item.data) {
                    testCases.push(tc);
                }
            }
            console.log(testCases);
            setSnackbar(generateSnackbar('sent'));

            let outputs = [];
            for (const tc of testCases) {
                try {
                    data.inputData = tc.input;
                    const response = await axios.post(`${domain}/problems/submit`, data, {
                        headers: { 'Content-Type': 'application/json' }
                    });
                    outputs.push(response.data);
                } catch (err) {
                    console.error(err);
                    outputs.push({ error: true });
                }
            }
            console.log(outputs);

            const tcValue = 100 / testCases.length;
            let score = 0;
            for (const [i, tc] of Object.entries(testCases)) {
                // console.log(tc.input, outputs[i].input);
                // console.log(tc.output, outputs[i].output);
                if (tc.input === outputs[i].input && tc.output === outputs[i].output) {
                    score += tcValue;
                }
            }
            
            score = Math.ceil(score);
            console.log(score);
            setSnackbar(generateSnackbar('received', { score }));

            try {
                await axios.post(`${domain}/problems/submissions`, {
                    email: currentUser.email,
                    problemId: id,
                    results: outputs,
                    score,
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
            } catch (err) {
                console.error(err);
            }
        }

        if (file) {
            let fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.addEventListener('loadend', async () => {
                return await handleTestCases({
                    userId: currentUser.email,
                    problemId: id,
                    inputCode: fileReader.result
                });
            });
        } else if (code.length > 0) {
            return await handleTestCases({
                userId: currentUser.email,
                problemId: id,
                inputCode: code
            });
        }
    }

    return (
        <React.Fragment>
            <Global />
            <Header />
            <SubmitContainer>
                <div className="submit-container">
                    <h1>{problem.title}</h1>
                    <p>{problem.description}</p>
                    <div className="preview">{preview}</div>
                    <h1>Submit</h1>
                    <div className="textarea-container">
                        <TextareaAutosize
                            rows={20}
                            placeholder="# Paste some python code"
                            autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                            onChange={e => setCode(e.target.value)} />
                    </div>
                    <div className="file-area">
                        <ComPySubmitArea handleAttachment={(files, index) => setFile(files[index])} />
                    </div>
                    { submit }
                </div>
            </SubmitContainer>
            { snackbar }
        </React.Fragment>
    );
};

export default Submit;