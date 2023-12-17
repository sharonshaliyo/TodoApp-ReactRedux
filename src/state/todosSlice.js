import { createSlice } from "@reduxjs/toolkit"

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: []
  },
  reducers: {
    setTodos: (state, params) => {
      state.todos = params.payload
    }
  }
})

export default todosSlice
