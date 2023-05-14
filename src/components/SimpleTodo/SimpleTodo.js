import React, { useState } from "react";
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SimpleTodoItem from './SimpleTodoItem'

export default () => {
    const [todos, setTodos] = useState(['Learn', 'Grind'])
    return <>
        <div>
            <Typography variant="h5" style={{ fontWeight: 600 }} sx={{ mb: 3, mt: 3 }}>
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
                            {todos.map(todo => <SimpleTodoItem todo={todo} />)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    </>
}
