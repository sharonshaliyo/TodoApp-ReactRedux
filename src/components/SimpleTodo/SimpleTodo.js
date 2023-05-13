import React, { useState } from "react";
import SimpleTodoItem from './SimpleTodoItem'

export default () => {
    const [todos, setTodos] = useState(['Learn', 'Grind'])
    return <>
        <div>
            <h3>Todo</h3>
            <form>
                <input type="text" placeholder="Title" />
                <button>Add</button>
            </form>
            <ul>
                {todos.map(todo => <SimpleTodoItem todo={todo} />)}
            </ul>
        </div>
    </>
}
