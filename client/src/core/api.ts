import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  transformRequest: [
    (data) => {
      return JSON.stringify(data)
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data)
    },
  ],
})

export default api
