import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Link from '@mui/material/Link';

import SimpleTodo from './SimpleTodo/SimpleTodo'
import TasksPage from '../components/TasksPage'
import { filterTasks } from '../actions/index'
import { getFilteredTasks } from '../reducers'

const TasksApp = (props) => {
    const onSearch = searchTerm => {
        props.dispatch(filterTasks(searchTerm))
    }

    return <Container maxWidth="xl" sx={{ mt: 2 }}>
        <BrowserRouter>

            <Link href="/" underline="always">Home</Link>
            <Link sx={{ ml: 1 }} href="/managetasks" underline="always">Manage Tasks</Link>
            
            <Routes>
                <Route exact path="/" element={<SimpleTodo />} ></Route>
                <Route exact path="/managetasks" element={<TasksPage
                    tasks={props.tasks}
                    onSearch={onSearch}
                    // onCreateTask={this.onCreateTask}
                    isLoading={props.isLoading}
                />} ></Route>
            </Routes>
            
        </BrowserRouter>
    </Container>
}

function mapStateToProps(state) {
    const { tasks, isLoading, error, searchTerm } = state

    console.log(state)
    return {
        tasks: getFilteredTasks(state), isLoading, error
    }
}

export default connect(mapStateToProps)(TasksApp)
