import axios from 'axios'
import https from 'https'

const fetch = async (
    method = 'GET',
    endpoint = '/',
    body = {},
    token = '[',
    apiUrl = 'http://localhost:3000/dev',
    // apiUrl = 'https://q69b66o8d0.execute-api.ap-southeast-1.amazonaws.com/dev',
    options = {}
) => {
    const url = `${apiUrl}${endpoint}`
    const data = body
    const queryName = method === 'GET' ? 'params' : 'data'

    const api = await axios.create({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
        baseURL: url,
    })

    api.interceptors.request.use((config) => {

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    })

    try {
        let res = await api.request({
            method,
            url,
            [queryName]: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            ...options,
        })
        return res.data
    } catch (err) {
        return err
    }
}

export default fetch
