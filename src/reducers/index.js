import { createSelector } from 'reselect';
import { uniqueId } from '../actions/tasks.js';

const initialState = {
    tasks: [
        {
            id: uniqueId(),
            title: 'Learn Redux',
            description: 'The store, actions, and reducers, oh my!',
            status: 'In Progress',
        },
        {
            id: uniqueId(),
            title: 'Peace on Earth',
            description: 'No big deal.',
            status: 'In Progress',
        },
    ],
    isLoading: false,
    error: null,
    searchTerm: ''
}


export default function tasks(state = initialState, action) {
    switch (action.type) {
        case "FETCH_TASKS_SUCCEEDED":
            
            return {
                ...state,
                tasks: action.payload,
                isLoading: false
            };
        
        case "CREATE_TASK_SUCCEEDED":
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            }

        case "FILTER_TASKS": {
            return { ...state, searchTerm: action.payload.searchTerm }
        }

        default:
            return state;
    }
}

// export function getFilteredTasks(tasks, searchTerm) {
//     return tasks.filter(task => {
//         return task.title.match(new RegExp(searchTerm, 'i'))
//     })
// }

const getTasks = state => {
    console.log(state)
    return state.tasks
}
const getSearchTerm = state => {
    console.log(state)
    return state.searchTerm
}

export const getFilteredTasks = createSelector(
    [getTasks, getSearchTerm],
    (tasks, searchTerm) => {
        return tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')))
    }
)
