
import React from "react";
import { Grid, Button, Chip, Tooltip} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../../assets/css/AdminCard.css'

export default function ComPyAdminControlRow(props) {
    const { item, handleDelete } = props;

    function truncate(value, maxLength = 18) {
        if (value.length >= maxLength) {
            return `${value.substring(0, maxLength - 6)} [...]`;
        }
        return value.substring(0, maxLength)
    }

    return (
    <Grid item xs={12}>
        <Grid container>
            <Grid item xs={10}>
                <Chip label={item.type} className="chip" />
                <span className="value">{truncate(item.value)}</span>
            </Grid>
            <Grid item xs={2}>
                <Tooltip title="Delete">
                    <Button variant="contained" className="delete" value={item.key}
                    onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Tooltip>
            </Grid>
        </Grid>
    </Grid>
    )
}