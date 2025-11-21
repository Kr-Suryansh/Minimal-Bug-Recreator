// simple axios instance — Vite dev proxy forwards /api to backend
import axios from 'axios'

const api = axios.create({
  baseURL: '/api', // use relative routes like api.get('/test')
  timeout: 10000
})

export default api
