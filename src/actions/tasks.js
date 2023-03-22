let _id = 1;
export function uniqueId() {
    return _id++;
}


function createTask({ title, description }) {
    return {
        type: "CREATE_TASK",
        payload: {
            id: uniqueId(),
            title,
            description,
            status: 'Unstarted'
        }
    }
}

export default createTask;
