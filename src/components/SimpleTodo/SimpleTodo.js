import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Box, Button, Stack, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow,
  TextField, Typography, Checkbox, FormControlLabel } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

import SimpleTodoItem from './SimpleTodoItem'
import { db } from './firebase'
import todosSlice from '../../state/todosSlice'

const SimpleTodo = () => {
  const dispatch = useDispatch()
  const todos = useSelector(store => store.todosReducer.todos)
  const [todoForm, setTodoForm] = useState({ title: '', desc: '' })
  const [hideCompleted, setHideCompleted] = useState(false)

  const onFieldChange = (field, value) => {
    setTodoForm({
      ...todoForm,
      [field]: value
    })
  }

  // Create
  const createTodo = async () => {
    if (!todoForm) {
      console.log('todoForm empty')
    }
    await addDoc(collection(db, 'todos'), {
      ...todoForm,
      completed: false
    })
    setTodoForm({ title: '', desc: '' })
  }

  // Read
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    // const unsubscribe =
    onSnapshot(q, querySnapshot => {
      const todosArr = []
      querySnapshot.forEach(doc => {
        todosArr.push({ ...doc.data(), id: doc.id })
      })
      dispatch(todosSlice.actions.setTodos(todosArr))
      console.log('onSnapshot')
    })
    console.log('useEffect')
  }, [])

  // Update
  const toggleComplete = useCallback(async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }, [])

  // Delete
  const onDeleteTodo = useCallback(async todo => {
    await deleteDoc(doc(db, 'todos', todo.id))
  }, [])
  console.log('Simple Todo render')

  const filteredTodos = useMemo(() => {
    console.log('useMemo')
    return hideCompleted ? todos.filter(t => !t.completed) : todos
  }, [todos, hideCompleted])

  return <>
    <div>
      <Typography color="primary" variant="h5" style={{ fontWeight: 600 }} sx={{ mb: 3, mt: 1 }}>
        Cross-functional project plan
        {/* {JSON.stringify(todoForm)} */}
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
        <TextField
          type="text"
          label="Title"
          className="full-width-input"
          size="small"
          onChange={(e) => onFieldChange('title', e.target.value)}
          value={todoForm.title}
          InputProps={{ sx: { borderRadius: '17px' } }}
        />
        <TextField
          className="full-width-input"
          type="text"
          label="Description"
          size="small"
          value={todoForm.desc}
          onChange={e => onFieldChange('desc', e.target.value)}
          InputProps={{ sx: { borderRadius: '17px' } }}
        />
        <Button
          variant="contained"
          onClick={createTodo}
          size="small"
          startIcon={<AddIcon />}
        >Add</Button>
      </Stack>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Tasks ( <FormControlLabel control={<Checkbox onChange={ () => setHideCompleted(!hideCompleted) } checked={hideCompleted} />} label="Hide completed" />)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTodos.map(todo => <SimpleTodoItem todo={todo} toggleComplete={toggleComplete} onDeleteTodo={onDeleteTodo} key={todo.id} />)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  </>
}

export default SimpleTodo
