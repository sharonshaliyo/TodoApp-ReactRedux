import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";

import SimpleTodoItem from './SimpleTodoItem'
import { db } from './firebase'

const SimpleTodo = () => {
    const [todos, setTodos] = useState([])
    const [todoForm, setTodoForm] = useState({"title": "", "desc": ""})

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
        setTodoForm({"title": "", "desc": ""})
    }
    // Read
    useEffect(() => {
        const q = query(collection(db, 'todos'))
        // const unsubscribe = 
        onSnapshot(q, querySnapshot => {
            let todosArr = []
            querySnapshot.forEach(doc => {
                todosArr.push({ ...doc.data(), id: doc.id })
            })
            setTodos(todosArr)
        })
    }, [todos])
    // Update
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    }
    // Delete
    const onDeleteTodo = async todo => {
        await deleteDoc(doc(db, 'todos', todo.id))
    }

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
                    onChange={(e) => onFieldChange("title", e.target.value)}
                    value={todoForm["title"]}
                />
                <TextField
                    className="full-width-input"
                    type="text"
                    label="Description"
                    size="small"
                    value={todoForm["desc"]}
                    onChange={e => onFieldChange("desc", e.target.value)}
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
                                <TableCell>Task</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map(todo => <SimpleTodoItem todo={todo} toggleComplete={toggleComplete} onDeleteTodo={onDeleteTodo} key={todo.id} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    </>
}

export default SimpleTodo
