import { Checkbox, TableCell, TableRow } from '@mui/material'
import React from 'react'

const SimpleTodoItem = ({ todo }) => {
    return (<TableRow className='task-header'>
        <TableCell>
            <Checkbox checked={ todo.completed } /> { todo.text }
        </TableCell>
    </TableRow>)
}

export default SimpleTodoItem
