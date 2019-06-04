import axios from 'axios'
import { Loading, Message } from 'element-ui'
import router from './../router'

function startLoading() {
  Loading.service({
    fullscreen: true,
    lock: true,
    text: "加载中",
    background: 'rgba(0, 0, 0, .7)'
  })
}
function endLoading() {
  Loading.service().close()
}

//请求拦截
axios.interceptors.request.use(config => {
  startLoading()
  if (localStorage.eletoken) {
    config.headers.Authorization = localStorage.eletoken
  }
  return config
}, error => {
  endLoading()
  return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response => {
  endLoading()
  return Promise.resolve(response)
}, error => {
  endLoading()
  if (error.response.status === 401) {
    //401 token 失效
    Message.error('请重新登录')
    localStorage.removeItem('eletoken')
    router.replace('/login')
    Message.error("请重新登录")
  }else{
    Message.error("登录失败")
  }
  return Promise.reject(error)
})

export default function request(type = "get", url = "", data = {}) {
  let promise
  if (type === 'get') {
    promise = axios.get(url)
  } else if (type === 'post') {
    promise = axios.post(url, data)
  }else if (type === 'delete'){
    promise = axios.delete(url,data)
  }
  return promise
}