import React from 'react'
import { TableCell, TableRow } from '@mui/material'

const Task = props => (<>
    <TableRow className="task-header">
        <TableCell>{props.task.title}</TableCell>
        <TableCell>{props.task.description}</TableCell>
        <TableCell>Sharon</TableCell>
        <TableCell>Medium</TableCell>
        <TableCell>Thursday</TableCell>
    </TableRow>
</>)

export default Task
