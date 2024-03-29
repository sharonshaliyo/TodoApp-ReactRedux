import React from 'react'
import { Checkbox, IconButton, TableCell, TableRow } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import PropTypes from 'prop-types';

const SimpleTodoItem = ({ todo, toggleComplete, onDeleteTodo }) => {
  console.log('SimpleTodoItem render', todo.title)
  return (<TableRow className='task-header'>
    <TableCell>
      <Checkbox onChange={() => toggleComplete(todo)} checked={todo.completed} />
      <label onClick={() => toggleComplete(todo)}>{todo.title} </label>
    </TableCell>
    <TableCell>
      <IconButton onClick={() => onDeleteTodo(todo)}>
        <DeleteOutlineIcon />
      </IconButton>
    </TableCell>
  </TableRow>)
}

SimpleTodoItem.propTypes = {
  todo: PropTypes.object,
  toggleComplete: PropTypes.func,
  onDeleteTodo: PropTypes.func
}

export default React.memo(SimpleTodoItem)
