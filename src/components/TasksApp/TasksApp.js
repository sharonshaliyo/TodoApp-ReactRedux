import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container, Link } from '@mui/material'

import TasksPage from './TasksPage'
import { filterTasks } from '../../actions/index'
import { getFilteredTasks } from '../../reducers'

const TasksApp = (props) => {
    const onSearch = searchTerm => {
        props.dispatch(filterTasks(searchTerm))
    }

    return <Container maxWidth="xl" sx={{ mt: 2 }}>
        <div style={{ display: "none" }}>
            <BrowserRouter style={{ display: "none" }}>
                <Link href="/" underline="always">Home</Link>
                <Link sx={{ ml: 1 }} href="/managetasks" underline="always">Manage Tasks</Link>

                <Routes style={{ display: "none" }}>
                    {/* <Route exact path="/" element={<SimpleTodo />} ></Route> */}
                    <Route exact path="/managetasks" element={<TasksPage
                        tasks={props.tasks}
                        onSearch={onSearch}
                        isLoading={props.isLoading}
                    />} ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    </Container>
}

function mapStateToProps(state) {
    const { isLoading, error } = state

    return {
        tasks: getFilteredTasks(state), isLoading, error
    }
}

export default connect(mapStateToProps)(TasksApp)
