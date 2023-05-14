import { Checkbox, TableCell, TableRow } from '@mui/material'
import React from 'react'

const SimpleTodoItem = ({ todo, toggleComplete }) => {
    return (<TableRow className='task-header'>
        <TableCell>
            <Checkbox onChange={() => toggleComplete(todo)} checked={ todo.completed } />
            <label onClick={() => toggleComplete(todo)}>{ todo.title }</label>
        </TableCell>
    </TableRow>)
}

export default SimpleTodoItem
