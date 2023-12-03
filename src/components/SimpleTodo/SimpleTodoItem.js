import React from 'react'
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const SimpleTodoItem = ({ todo, toggleComplete, onDeleteTodo }) => {
    return (<TableRow className='task-header'>
        <TableCell>
            <Checkbox onChange={() => toggleComplete(todo)} checked={ todo.completed } />
            <label onClick={() => toggleComplete(todo)}>{ todo.title } </label>
        </TableCell>
        <TableCell>
            <IconButton onClick={() => onDeleteTodo(todo)}>
                <DeleteOutlineIcon />
            </IconButton>
        </TableCell>
    </TableRow>)
}

export default SimpleTodoItem
