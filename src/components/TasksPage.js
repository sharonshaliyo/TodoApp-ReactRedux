import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, TextField, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

import TaskList from './TaskList'
// import createTask from '../actions/tasks.js'
import { fetchTasks, createTask } from '../actions/index.js'

const TASK_STATUSES = ['In Progress', 'Unstarted', 'Completed']
class TasksPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showNewCardForm: false,
            title: '',
            description: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchTasks('tasks'))
    }

    onTitleChange = (e) => {
        this.setState({ title: e.target.value })
    }

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value })
    }
    resetForm() {
        this.setState({
            showNewCardForm: false,
            title: '',
            description: '',
        })
    }
    onCreateTask = (e) => {
        e.preventDefault()
        // this.props.onCreateTask({
        //     title: this.state.title,
        //     description: this.state.description,
        // })
        this.props.dispatch(createTask({
            title: this.state.title,
            description: this.state.description,
        }))
        this.resetForm()
    }
    toggleForm = () => {
        this.setState({ showNewCardForm: !this.state.showNewCardForm })
    }

    onSearch = e => {
        console.log('Search term', e.target.value)
        this.props.onSearch(e.target.value)
    }

    renderTaskLists() {
        const { onStatusChange, tasks } = this.props

        const filteredTasks = tasks.filter(task => {
            return task.title.match(new RegExp(this.state.searchTerm, 'i'))
        })

        return TASK_STATUSES.map(status => {
            const statusTasks = tasks.filter(task => task.status === status)
            return <TaskList
                key={status}
                status={status}
                tasks={statusTasks}
                onStatusChange={onStatusChange}
            />
        })
    }
    render() {
        if (this.props.isLoading) {
            return <div className='tasks-loading'>Loading ...</div>
        }

        return (
            <div className="task-list">
                {!this.state.showNewCardForm && (<div className="tasks-header task-list-header">
                    <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
                        <Button
                            variant="contained"
                            onClick={this.toggleForm}
                            size="small"
                            startIcon={<AddIcon />}
                        >
                            Add task
                        </Button>
                    </Stack>
                </div>)}

                {this.state.showNewCardForm && (
                    <form className="task-list-form" onSubmit={this.onCreateTask}>
                        <Stack spacing={2} direction="row" sx={{ mb: 4 }} >
                            <TextField
                                className="full-width-input"
                                onChange={this.onTitleChange}
                                value={this.state.title}
                                type="text"
                                label="Task Title"
                                size="small"
                            />
                            <TextField
                                className="full-width-input"
                                onChange={this.onDescriptionChange}
                                value={this.state.description}
                                type="text"
                                label="Description"
                                size="small"
                            />
                            <Button
                                variant="contained"
                                className="button"
                                type="submit"
                                size="small"
                            >
                                Save
                            </Button>
                        </Stack>
                    </form>
                )}

                <div>
                    <TextField
                        onChange={this.onSearch}
                        type="text"
                        label="Search..."
                        size="small"
                    />
                </div>

                <div className="task-lists">
                    {this.renderTaskLists()}
                </div>
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         onCreateTask: (t) => dispatch({ type: "CREATE_TASK", payload: t })
//     }
// }

// export default connect(null, mapDispatchToProps)(TasksPage)

export default connect()(TasksPage)
