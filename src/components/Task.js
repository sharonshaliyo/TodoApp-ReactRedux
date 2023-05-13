import React from 'react';
import { TableCell, TableRow } from '@mui/material'

const Task = props => {
    return (
        <React.Fragment>
            <TableRow className="task-header">
                <TableCell>{props.task.title}</TableCell>
                <TableCell>{props.task.description}</TableCell>
                <TableCell>Sharon</TableCell>
                <TableCell>Medium</TableCell>
                <TableCell>Thursday</TableCell>
            </TableRow>
            {/* <Divider components="tr" /> */}
        </React.Fragment>
    );
}

export default Task;
