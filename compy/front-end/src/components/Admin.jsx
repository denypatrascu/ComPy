import React, {Fragment, useState, useEffect, useRef, createElement, useContext} from 'react';
import Axios from 'axios';
import uuid from 'react-uuid'

/* Components */
import Header from './Header';
import { AuthContext } from './Auth';

import { Grid, Button, Paper, TextareaAutosize } from '@material-ui/core';

import ComPyAdminControl from "./admin/Card";
import ComPyAdminControlRow from "./admin/CardRow";

import ComPyTextField from './includes/TextField';
import ComPyTextFieldLight from './includes/TextFieldLight';
import ComPySelect from "./includes/Select";
import ComPyMultipleSelect from "./includes/MultipleSelect";
import ComPyTabPanel from './includes/TabPanel';
import ComPyIORow from "./admin/IORow";
import { ComPyTabs, ComPyTab } from './includes/Tabs';
import ComPyDropArea from './includes/DropArea';

/* Styling */
import { AdminContainer } from '../assets/styles/Admin';
import '../assets/css/Admin.css';
import '../assets/css/Preview.css';


/* domain */
import { domain } from '../config/deploy';

const Admin = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState([]);
    const [difficulty, setDifficulty] = useState([]);
    const [element, setElements] = useState(null);
    const [content, setContent] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [problemItems, setProblemItems] = useState([]);
    const [preview, setPreview] = useState(generatePreview(null));
    const [save, setSave] = useState(null);
    const [ioRows, setIORows] = useState([
        <ComPyIORow
            value={uuid()}
            handleDelete={handleIOs}
            handleData={(e, id, type) => handleIOs(e, 'data', { id, type })}
        />]);
    const [state, setState] = useState({
        header: {
            error: false,
            helperText: '',
            value: ''
        },
        paragraph: {
            error: false,
            helperText: '',
            value: '',
            ref: useRef()
        },
        io: {
            index: 0,
            value: '',
            data: {}
        },
        attachment: {
            value: '',
            data: {}
        }
    });

    const [categories, setCategories] = useState([]);

    const [username, setUsername] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const user = currentUser.email.split('@')[0];
        setUsername(user);
        setAuthor(user);
        setContent(handleContent());
    }, [
        element, problemItems, ioRows, save,
        title, description, category, difficulty, author,
        currentUser.email
    ]);

    useEffect(() => {
        getCategories();
    }, []);

    const difficulties = [
        "Easy",
        "Medium",
        "Hard",
    ];
    const elements = [
        'header',
        'paragraph',
        'attachment',
        'input\\output'
    ];

    function getCategories() {
        Axios.get(`${domain}/problems/category`)
            .then(response => setCategories(response.data))
            .catch(err => {
                console.error(err);
                setCategories([]);
            });
    }

    function updateState(value, component) {
        const newState = state;
        newState[component].value = value;
        if (state[component].error === true) {
            newState[component].error = false;
            newState[component].helperText = '';
            setContent(handleContent());
        }
        setState(newState);
    }

    function resetStateData() {
        const resetState = state;
        resetState.io.data = {};
        setState(resetState);
    }

    function checkComponent(component) {
        if (component === 'input\\output') {
            for (const key of Object.keys(state.io.data)) {
                if (
                    !state.io.data[key].input || state.io.data[key].input.length === 0 ||
                    !state.io.data[key].output || state.io.data[key].output.length === 0
                ) delete state.io.data[key];
            }

            return Object.keys(state.io.data).length > 0;
        }

        if (!element.includes(component)) return false;

        // header, paragraph, attachment
        const newState = state;
        if (!state[component].value || state[component].value.length === 0) {
            newState[component].error = true;
            newState[component].helperText = 'Title is required!';
        }
        else {
            newState[component].error = false;
            newState[component].helperText = '';
        }
        return !newState[component].error;
    }

    function handleTab(event, newTabIndex) {
        event.preventDefault();
        setTabIndex(newTabIndex);
    }

    function handleAppend() {
        switch (element) {
            case 'header':
                // state value for header is already updated
                // because updateState() is toggled with onChange()
                break;
            case 'paragraph':
                if (state.paragraph.ref.current)
                    updateState(state.paragraph.ref.current.value, 'paragraph');
                break;
            case 'input\\output':
                state.io.index++;
                state.io.value = `#${state.io.index}`;
                break;
            case 'attachment':
                if (state.attachment.data.name && typeof state.attachment.data.name == 'string') {
                    state.attachment.value = state.attachment.data.name;
                }
                break;
            default:
                return;
        }

        const check = checkComponent(element);

        switch (element) {
            case 'header':
                // error case
                setContent(handleContent());
                break;
            default:
                break;
        }

        if (check) {
            handleProblemItems();
            resetStateData();
        }
    }

    function handleProblemItems(event, action='insert') {
        let newProblemItems = [], active = false;
        const id = (element === 'input\\output' ? 'io' : element);

        switch (action) {
            case 'insert':
                newProblemItems = problemItems;
                const tempObject = {
                    type: element,
                    value: state[id].value,
                    key: uuid()
                };
                if (state[id].data) tempObject.data = state[id].data;
                newProblemItems.push(tempObject);
                active = true;
                break;
            case 'delete':
                newProblemItems = problemItems.filter(item => item.key !== event.currentTarget.value);
                active = true;
                break;
            default:
                return;
        }

        if (active) {
            generatePreview(newProblemItems);
            setSave(generateAddButton(newProblemItems));
            setProblemItems(newProblemItems);
        }
    }

    function handleIOs(event, action='delete', { id, type } = {}) {
        let active = false;

        switch (action) {
            case 'insert':
                ioRows.push(<ComPyIORow
                    value={uuid()}
                    handleDelete={handleIOs}
                    handleData={(e, id, type) => handleIOs(e, 'data', { id, type })}
                    />
                );
                active = true;
                break;
            case 'delete':
                // setIORows(ioRows.filter(item => item.props.value !== event.currentTarget.value));
                // active = true;
                break;
            case 'data':
                const value = event.target.value ? event.target.value : event.target.checked;
                if (!state.io.data[id]) state.io.data[id] = {};
                state.io.data[id][type] = value;
                break;
            default:
                return;
        }

        if (active) {
            setContent(handleContent())
        }
    }

    function handleAttachment(files, selectedIndex) {
        if (selectedIndex !== null) {
            state.attachment.data = files[selectedIndex];
        }
    }

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
                    children.push(createElement('div', { className: 'image-container' },
                        createElement('img', {
                            src: URL.createObjectURL(item.data),
                        })
                    ));
                    break;
                default:
            }
        }

        if (children.length === 0) {
            children.push(createElement('p', {}, 'Nothing to preview! 😵'))
        }

        setPreview(createElement('div', {}, children));
    }

    function generateAddButton(problemItems) {
        // TODO:
        let [headerCheck, paragraphCheck, ioCheck] = [true, true, true];
        // let [headerCheck, paragraphCheck, ioCheck] = [false, false, false];
        for (const item of problemItems) {
            switch (item.type) {
                case 'header':
                    headerCheck = true;
                    break;
                case 'paragraph':
                    paragraphCheck = true;
                    break;
                case 'input\\output':
                    ioCheck = true;
                    break;
                default:
                    break;
            }
        }
        if (!headerCheck || !paragraphCheck || !ioCheck) return null;

        return (
            <div className="save-container">
                <Button fullWidth variant="contained"
                onClick={handleSave}>Save</Button>
            </div>
        )
    }

    async function handleSave() {
        const data = { content: Object.assign(problemItems) };
        setProblemItems([]);
        setContent(handleContent());
        generatePreview([]);
        setSave(generateAddButton([]));

        data.title = title;
        data.description = description;
        data.categories = category;
        data.difficulty = difficulty;
        data.author = author;
        data.key = uuid();

        // remove data from attachment
        // and create an array with attachments
        let attachments = [];
        const deleteDataFrom = ['attachment'];
        for (const item of data.content) {
            if (!deleteDataFrom.includes(item.type)) continue;
            attachments.push(item.data);
            delete item.data;
        }

        // transform object keys into array
        for (const item of data.content) {
            if (item.type !== 'input\\output') continue;
            let data = [];
            for (const key of Object.keys(item.data)) {
                data.push(item.data[key]);
            }
            item.data = data;
        }

        try {
            const response = await Axios.post(`${domain}/problems`, data);
            // console.log(response.status);
        } catch (err) {
            console.error(err);
        }

        try {
            if (attachments.length > 0) {
                const formData = new FormData();
                formData.append('key', data.key);
                for (const [index, file] of Object.entries(attachments)) {
                    formData.append(`file-${index}`, file);
                }

                const response = await Axios.post(`${domain}/problems/upload`, formData, {
                    headers: {'Content-Type': 'multipart/form-data'}
                });
                // console.log(response.status);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function handleContent() {
        const header = (
            <div className="content header">
                <span className="hash-tag">#header</span>
                <h1>Add a title for a section of the problem!</h1>
                <p>
                    <span role="img" aria-label="pen">✒️</span>
                    Write something suggestive and short.
                </p>
                <ComPyTextFieldLight
                    label="Title of the section"
                    className="header"
                    error={state.header.error}
                    helperText={state.header.helperText}
                    onChange={(e) => updateState(e.target.value, 'header')}
                    required />
            </div>
        );

        const paragraph = (
            <div className="content paragraph">
                <span className="hash-tag">#paragraph</span>
                <h1>Write a piece of information about the problem!</h1>
                <p>
                    <span role="img" aria-label="book">📖 </span>
                    Here you can add paragraphs for the problem statement.
                </p>
                <div className="textarea-container">
                    <TextareaAutosize rowsMin={3} ref={state.paragraph.ref} />
                </div>
            </div>
        );

        const attachment = (
            <div className="content attachment">
                <span className="hash-tag">#attachment</span>
                <ComPyDropArea handleAttachment={handleAttachment} />
            </div>
        );

        const io = (
            <div className="content io">
                <span className="hash-tag">#io</span>
                <h1>Add a few testcases!</h1>
                <p>
                    <span role="img" aria-label="experiment">🧪 </span>
                    The visible cases are present in the statement of the problem.
                </p>
                <Grid container spacing={2} className="io-row-header">
                    <Grid item xs={10}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>Input</Grid>
                            <Grid item xs={6}>Output</Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>Visible</Grid>
                    <Grid item xs={1}> </Grid>
                </Grid>
                { ioRows.map(ioRow => ioRow) }
                <Grid container spacing={2} className="io-row io-row-more">
                    <Button aria-label="add"
                        onClick={e => handleIOs(e, 'insert')}>
                        Add more output
                    </Button>
                </Grid>
            </div>
        );

        const nothing = (
            <div className="content nothing">
                <p>Please select an element you want to add to the problem statement!</p>
            </div>
        );

        let content;
        switch (element) {
            case 'paragraph':
                content = paragraph;
                break;
            case 'header':
                content = header;
                break;
            case 'attachment':
                content = attachment;
                break;
            case 'input\\output':
                content = io;
                break;
            default:
                content = nothing;
        }

        return (
            <Fragment>{content}</Fragment>
        );
    }

    return (
        <React.Fragment>
            <Header />
            <AdminContainer>
                <div>
                    <h1>Basic information</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <ComPyTextField label="Title" variant="outlined"
                                onChange={e => setTitle(e.target.value)} />
                        </Grid>
                        <Grid item xs={8}>
                            <ComPyTextField label="Description" variant="outlined"
                                onChange={e => setDescription(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <ComPyMultipleSelect label="Category" selected={category} values={categories}
                                handleChange={e => setCategory(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <ComPySelect label="Difficulty" selected={difficulty} values={difficulties}
                                handleChange={e => setDifficulty(e.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <ComPyTextField label="Author" variant="outlined"
                                value={username}
                                onChange={e => setAuthor(e.target.value)} />
                        </Grid>
                    </Grid>
                    <h1>Content</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className="admin-card">
                                <ComPyAdminControl
                                    element={element} elements={elements}
                                    handleChange={(e) => setElements(e.target.value)}
                                    handleClick={handleAppend} />
                                <Grid container spacing={2} className="admin-card-items">
                                    {problemItems.map(item =>
                                        <ComPyAdminControlRow item={item}
                                          handleDelete={(e) => handleProblemItems(e, 'delete')} />
                                    )}
                                </Grid>
                            </div>
                            { save }
                        </Grid>
                        <Grid item xs={8}>
                            <Paper>
                                <ComPyTabs
                                    className="tabs" aria-label="tabs" value={tabIndex}
                                    onChange={handleTab}
                                    centered>
                                    <ComPyTab label="Content" />
                                    <ComPyTab label="Preview" />
                                </ComPyTabs>
                                <ComPyTabPanel value={tabIndex} index={0}>
                                    {content}
                                </ComPyTabPanel>
                                <ComPyTabPanel value={tabIndex} index={1} className="preview">
                                    {preview}
                                </ComPyTabPanel>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </AdminContainer>
        </React.Fragment>
    );
};

export default Admin;