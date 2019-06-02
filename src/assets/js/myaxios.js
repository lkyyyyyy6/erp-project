// 独立的向vue实例中添加axios

import axios from 'axios'

let myaxios = {}

myaxios.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.interceptors.request.use(config => {
    config.headers.common['Authorization'] = localStorage.getItem('token')
    return config
  })
  Vue.prototype.$http = axios
}

export default myaxios