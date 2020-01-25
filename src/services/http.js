import axios from 'axios'
import store from '../store'
import router from '../router'
import { TokenService } from './storage.service'
import { API_URL } from "./config"

let instance = axios.create({
  baseURL: API_URL
})

instance.interceptors.request.use((config) => {
  const token = TokenService.getToken()

  if (token) {
  	config.headers['Authorization'] = `Bearer ${token}` 
  }

  // config.responseType = 'arraybuffer'
  // config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Accept-Language'] = 'en'
  config.headers['Accept'] = 'application/json'

  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  (response) => {
    return response
  }, error => {
    // if (error.response.status === 401 && error.response.data.message == "Unauthenticated.") {
    //   store.dispatch('responseMessage', {
    //     type: 'warning',
    //     text: 'No tiene una sesión activa, por favor vuelva a iniciar sesión.',
    //     title: 'Sesión Expirada!',
    //     modal: true
    //   })
    //   .then(async () => {
    //     await store.dispatch('cleanSession')
    //     router.push({ name: 'Login' })
    //   })
    // }

    // if (error.response.status === 403) {
    //   router.push({ name: 'Unauthorized' })
    // }

    // if (error.response.status >= 500) {
    //   store.dispatch('responseMessage', {
    //     type: 'error',
    //     text: error.response.data.errors.message,
    //     title: 'Error',
    //     modal: true
    //   })
    // }
    
    return Promise.reject(error)
})

export const http = instance