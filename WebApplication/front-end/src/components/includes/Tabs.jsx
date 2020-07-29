import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ComPyTabs = withStyles({
    indicator: {
        backgroundColor: 'var(--turquoise)',
    },
})(Tabs);

const ComPyTab = withStyles(() => ({
    root: {
        '&:hover': {
            color: 'var(--turquoise)',
        },
        '&$selected': {
            color: 'var(--turquoise)',
        },
        '&:focus': {
            color: 'var(--turquoise)',
        },
    },
    selected: {},
}))((props) => <Tab {...props} />);

export {
    ComPyTabs,
    ComPyTab
}