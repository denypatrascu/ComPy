import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
    ListItemText,
    FormControl
}
from '@material-ui/core';

const styles = {
    root: {
        minWidth: 200,
        height: "100%",
        '& .MuiOutlinedInput-root': {
            color: 'var(--text-white)',
            '& fieldset': {
                borderColor: 'var(--turquoise)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--turquoise)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--turquoise)',
            },
        },
        "& .MuiInputLabel-root": {
            color: 'var(--turquoise)'
        },
        icon: {
            fill: 'var(--turquoise)',
        },
    },
    checkbox: {
        color: 'var(--turquoise)',
        '&.Mui-checked': {
            color: 'var(--bg)'
        },
        checked: {},
    },
};

function ComPySelect(props) {
    const { classes } = props;

    return (
        <FormControl variant="outlined" fullWidth className={classes.root}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                input={<OutlinedInput label={props.label} />}
                value={props.selected}
                renderValue={() => props.selected}
                onChange={props.handleChange}>
                {props.values.map((value) =>
                    <MenuItem key={value} value={value}>
                        <ListItemText primary={value} />
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

ComPySelect.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComPySelect);
