import { Button, Grid } from "@material-ui/core";
import ComPySelect from "../includes/Select";
import React from "react";
import '../../assets/css/AdminCard.css'

export default function ComPyAdminControl(props) {
    const { element, elements, handleChange, handleClick } = props;
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={7}>
                <ComPySelect
                    label="Element" selected={element} values={elements}
                    fullWidth handleChange={handleChange} />
            </Grid>
            <Grid item xs={5}>
                <Button fullWidth variant="contained" onClick={handleClick} className="append">Append</Button>
            </Grid>
        </Grid>
    )
}