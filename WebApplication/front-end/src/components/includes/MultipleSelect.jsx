import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
    OutlinedInput,
    InputLabel,
    ListItemText, Select, Checkbox,
    MenuItem,
    FormControl
}
from '@material-ui/core';

const styles = {
    root: {
        minWidth: 200,
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
        '& .MuiInputLabel-root': {
            color: 'var(--turquoise)'
        }
    },
    checkbox: {
        color: 'var(--turquoise)',
        '&.Mui-checked': {
            color: 'var(--bg)'
        },
        checked: {},
    }
};

function ComPyMultipleSelect(props) {
    const { classes } = props;

    return (
        <FormControl variant="outlined" fullWidth className={classes.root}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                input={<OutlinedInput label={props.label} />}
                value={props.selected}
                renderValue={(selected) => selected.join(', ')}
                onChange={props.handleChange}
                multiple>
                {props.values.map((value) => (
                    <MenuItem key={value} value={value}>
                        <Checkbox
                            checked={props.selected.indexOf(value) > -1}
                            className={classes.checkbox}
                        />
                        <ListItemText primary={value} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

ComPyMultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComPyMultipleSelect);
