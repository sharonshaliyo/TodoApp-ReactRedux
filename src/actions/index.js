import { CALL_API } from '../middleware/api'
import * as api from '../actions/index'

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED'
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED'
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED'

export function fetchTasks () {
    return {
        [CALL_API]: {
            types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
            endpoint: '/tasks'
        }
    }
}

export const CREATE_TASKS_STARTED = 'CREATE_TASKS_STARTED'
export const CREATE_TASKS_SUCCEEDED = 'CREATE_TASKS_SUCCEEDED'
export const CREATE_TASKS_FAILED = 'CREATE_TASKS_FAILED'

export function createTask ({ title, description, status = 'Unstarted' }) {
    return {
        [CALL_API]: {
            types: [CREATE_TASKS_STARTED, CREATE_TASKS_SUCCEEDED, CREATE_TASKS_FAILED],
            endpoint: '/tasks',
            method: 'POST',
            body: {
                title,
                description,
                status
            }
        }
    }
}

export function filterTasks (searchTerm) {
    return {
        type: 'FILTER_TASKS',
        payload: {
            searchTerm
        }
    }
}

function fetchProjectsStarted (boards) {
    return { type: 'FETCH_PROJECTS_STARTED', payload: { boards } }
}

function fetchProjectsSucceeded (projects) {
    return { type: 'FETCH_PROJECTS_SUCCEEDED', payload: { projects } }
}

function fetchProjectsFailed (err) {
    return { type: 'FETCH_PROJECTS_FAILED', payload: err }
}

export function fetchProjects () {
    return (dispatch, getState) => {
        dispatch(fetchProjectsStarted())

        return api
            .fetchProjects()
            .then(resp => {
                const projects = resp.data

                dispatch(fetchProjectsSucceeded(projects))
            })
            .catch(err => {
                console.error(err)

                fetchProjectsFailed(err)
            })
    }
}
