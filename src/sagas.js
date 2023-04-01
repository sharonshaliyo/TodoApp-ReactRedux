import { channel, delay } from 'redux-saga'
import { fork, take, put, call, takeLatest, takeEvery } from 'redux-saga/effects'

export default function* rootSaga() {
    // console.log('rootSaga reporting for duty')
    yield takeLatest('FETCH_TASKS_STARTED', fetchTasks)
    yield takeEvery('TIMER_STARTED', handleProgressTimer)

}

function* handleProgressTimer({ payload }) {
    while (true) {
        yield call(delay, 1000)
        yield put({
            type: 'TIMER_INCREMENT',
            payload: { taskId: payload.taskId }
        })
    }
}

function* takeLatestById(actionType, saga) {
    const channelsMap = {}

    while (true) {
        const action = yield take(actionType)
        const { taskId } = action.payload

        if (!channelsMap[tasksId]) {
            channelsMap[taskId] = channel()
            yield takeEvery(channelsMap[taskId], saga)
        }

        yield put(channelsMap[taskId], action)
    }
}


// function* watchFetchTasks() {
//     console.log('watching!')

//     while (true) {
//         yield take('FETCH_TASKS_STARTED')
//         console.log('started!')
//     }
// }

function* fetchTasks() {
    console.log('watching!')

    try {
        const { data } = yield call(api.fetchTasks)
        yield put({
            type: 'FETCH_TASKS_SUCCEEDED',
            payload: { tasks: data }
        })
    } catch (e) {
        yield put({
            type: 'FETCH_TASKS_FAILED',
            payload: { error: e.message }
        })
    }
}

function* watchSomethingElse() {
    console.log('watching something else!')
}
