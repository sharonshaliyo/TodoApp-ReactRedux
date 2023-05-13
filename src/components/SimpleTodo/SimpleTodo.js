import React, { useState } from "react";
import SimpleTodoItem from './SimpleTodoItem'
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default () => {
    const [todos, setTodos] = useState(['Learn', 'Grind'])
    return <>
        <div>
            <h3>Todo</h3>
            <form>
                <input type="text" placeholder="Title" />
                <Button
                    variant="contained"
                    onClick={null}
                    size="small"
                    startIcon={<AddIcon />}
                >Add</Button>
            </form>
            <ul>
                {todos.map(todo => <SimpleTodoItem todo={todo} />)}
            </ul>
        </div>
    </>
}
