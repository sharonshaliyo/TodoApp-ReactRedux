import React from 'react';
import { Divider, ListItem, ListItemText } from '@mui/material'

const Task = props => {

    return (
        <React.Fragment>
            <ListItem className="task-header">
                <ListItemText
                    primary={props.task.title}
                    secondary={props.task.description}
                />
            </ListItem>
            <Divider components="li" />
        </React.Fragment>
    );
}
export default Task;
