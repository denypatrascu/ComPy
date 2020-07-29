import React from "react";
import PropTypes from "prop-types";
import { Fab, Checkbox, Grid, TextareaAutosize, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import '../../assets/css/AdminCard.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const styles = {
    checkbox: {
        color: 'var(--turquoise)',
        '&.Mui-checked': {
            color: 'var(--bg)'
        },
        checked: {},
    }
};

function ComPyIORow(props) {
    const {
        classes, value, handleDelete, handleData,
        checked = false,
    } = props;

    return (
        <Grid container spacing={2} className="io-row">
            <Grid item xs={10}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextareaAutosize
                            onChange={e => handleData(e, value, 'input')} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextareaAutosize
                            onChange={e => handleData(e, value, 'output')} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1}>
                <Checkbox
                    className={classes.checkbox}
                    defaultChecked={checked}
                    onChange={e => handleData(e, value, 'visible')}
                />
            </Grid>
            <Grid item xs={1}>
                <Tooltip title="Delete">
                    <Fab className="delete" size="small" value={value}
                        onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Fab>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

ComPyIORow.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ComPyIORow);