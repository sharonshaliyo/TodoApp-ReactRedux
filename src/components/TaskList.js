import React from 'react';
import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Task from './Task';
const TaskList = props => {
    return (
        <Box className="task-list" sx={{ mt: 4 }}>
            {/* <Divider component="div" /> */}
            <Typography variant="h6">
                {props.status}
            </Typography>
            { props.tasks.length > 0 ? <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Assignee</TableCell>
                            <TableCell>Priority</TableCell>
                            <TableCell>Due date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tasks.map(task => (
                            <Task key={task.id} task={task} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : null }
            <Divider component="div" />
        </Box>
    );
}
export default TaskList;
