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

