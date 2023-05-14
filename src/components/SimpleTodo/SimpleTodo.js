import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { collection, onSnapshot, query } from "firebase/firestore";


import SimpleTodoItem from './SimpleTodoItem'
import { db } from './firebase'

export default () => {
    const [todos, setTodos] = useState(['Learn', 'Grind'])

    // Create
    // Read
    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, querySnapshot => {
            let todosArr = []
            querySnapshot.forEach(doc => {
                todosArr.push({ ...doc.data(), id: doc.id })
            })
            setTodos(todosArr)
        })
    })
    // Update
    // Delete

    return <>
        <div>
            <Typography variant="h5" style={{ fontWeight: 600 }} sx={{ mb: 3, mt: 1 }}>
                Cross-functional project plan
            </Typography>
            <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
                <TextField
                    type="text"
                    label="Title"
                    className="full-width-input"
                    size="small"
                />
                <TextField
                    className="full-width-input"
                    type="text"
                    label="Description"
                    size="small"
                />
                <Button
                    variant="contained"
                    onClick={null}
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
                            {todos.map(todo => <SimpleTodoItem todo={todo} toggleComplete={toggleComplete} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    </>
}
