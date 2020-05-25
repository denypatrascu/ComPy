import React, { Fragment } from 'react';

export default function ComPyTabPanel(props){
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tab-panel"
      hidden={value !== index}
      id={`tab-panel-${index}`}
      aria-labelledby={`tab-panel-${index}`}
      {...other}>
      {value === index && (
        <Fragment>{children}</Fragment>
      )}
    </div>
  );
}