let _id = 1;
export function uniqueId() {
    return _id++;
}


function createTask({ title, description }) {
    const taskId = uniqueId()
    return {
        type: "CREATE_TASK_STARTED",
        payload: {
            id: taskId,
            title,
            description,
            status: 'Unstarted'
        },
        meta: {
            analytics: {
                event: 'create_task',
                data: {
                    id: taskId,
                },
            },
        },
    }
}

export default createTask;
