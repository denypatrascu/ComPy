import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
    root: {
        '& label.Mui-focused': {
            color: 'var(--turquoise)',
        },
        '& .MuiOutlinedInput-root': {
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
        '& .MuiInput-underline:after': {
            borderBottomColor: 'var(--turquoise)',
        },
    },
    input: {
        color: 'var(--text-white)'
    }
};

function ComPyTextField(props) {
    const { classes } = props;

    return (
        <TextField
            className={classes.root}
            InputProps={{className: classes.input}}
            fullWidth
            label={props.label}
            {...props}
        />
    );
}

ComPyTextField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComPyTextField);