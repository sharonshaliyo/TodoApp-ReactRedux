import axios from "axios"

export function fetchProjects() {
    const client = axios
    return client.get('/projects?_embed=tasks')
}
