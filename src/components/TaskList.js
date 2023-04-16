import React from 'react';
import { List, ListSubheader } from '@mui/material'
import Task from './Task';
const TaskList = props => {
    return (
        <div className="task-list">
            <hr />
            <List
                subheader={
                    <ListSubheader component="h1">
                        {props.status}
                    </ListSubheader>
                }
            >
                {props.tasks.map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </List>
            <hr />
        </div>
    );
}
export default TaskList;
