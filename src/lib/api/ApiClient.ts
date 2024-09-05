import axios from 'axios'

const client = axios.create({
  baseURL: "http://localhost:8080",
})

client.interceptors.request.use(
  function (config) {
    if (config.url?.startsWith('/api/v1')) {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config;
  }
)

client.interceptors.response.use(
  function (response) {
    console.warn("Interceptor on response", response);
    return response;
  },

  function (error) {
    return Promise.reject(error);
  },
)

export default client