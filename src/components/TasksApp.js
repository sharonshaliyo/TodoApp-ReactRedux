import React from 'react'
import { connect } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom'
import { Container } from '@mui/material';

import TasksPage from '../components/TasksPage';
import { filterTasks } from '../actions/index'
import { getFilteredTasks } from '../reducers'

const mockTasks = [
    {
        id: 1,
        title: 'Learn Redux',
        description: 'The store, actions, and reducers, oh my!',
        status: 'In Progress',
    },
    {
        id: 2,
        title: 'Peace on Earth',
        description: 'No big deal.',
        status: 'In Progress',
    },
];


const TasksApp = (props) => {
    const onSearch = searchTerm => {
        props.dispatch(filterTasks(searchTerm))
    }

    return <Container maxWidth="xl" sx={{ mt: 2 }}>
        <TasksPage
            tasks={props.tasks}
            onSearch={onSearch}
            // onCreateTask={this.onCreateTask}
            isLoading={props.isLoading}
        />
    </Container>

}


function mapStateToProps(state) {
    const { tasks, isLoading, error, searchTerm } = state

    console.log(state)
    return {
        tasks: getFilteredTasks(state), isLoading, error
    }
}

export default connect(mapStateToProps)(TasksApp);


