import axios from 'axios'

export const CALL_API = 'CALL_API'

// const API_BASE_URL = 'http://localhost:3001'
// const API_BASE_URL = 'http://localhost/wordpress/wp-json/tto/v1'
const API_BASE_URL = 'https://sharonshaliyo.com/wp-json/tto/v1'

function makeCall ({ endpoint, method = 'GET', body }) {
    const url = `${API_BASE_URL}${endpoint}`

    const params = {
        method,
        url,
        data: body,
        headers: {
            'Content-Type': 'application/json'
        }

    }

    return axios(params)
}

const apiMiddleware = store => next => action => {
    console.log('apiMiddleware')
    const callApi = action[CALL_API]
    if (typeof callApi === 'undefined') {
        return next(action)
    }
    const [successType, failureType] = callApi.types

    return makeCall({
        endpoint: callApi.endpoint,
        method: callApi.method,
        body: callApi.body
    }).then(
        response => next({
            type: successType,
            payload: response.data
        }),
        error => {
            console.log('error')
            return next({
                type: failureType,
                error: error.message
            })
        }
    )
}

export default apiMiddleware
