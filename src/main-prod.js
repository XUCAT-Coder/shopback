import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/all.css'
import axios from 'axios'
import installElementPlus from './plugins/element'
import { ElMessage, ElMessageBox } from 'element-plus'
import ElementPlus from 'element-plus'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
// import Timeline from './plugins/timeline/index'
// import TimelineItem from './plugins/timeline-item/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const app = createApp(App)

installElementPlus(app)
app.component('QuillEditor', QuillEditor)
app.config.globalProperties.$http = axios
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$confirm = ElMessageBox
app.use(store).use(router).use(ElementPlus).mount('#app')
axios.defaults.baseURL = '/dark_p/'
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    NProgress.start()
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  (res) => {
    NProgress.done()
    return res
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
