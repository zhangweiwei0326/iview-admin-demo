
import axios from 'axios'
import qs from 'qs'

export default function (opt) {
  var loading = opt.loading !== undefined ? opt.loading : true
  axios.defaults.baseURL = opt.baseURL || 'http://www.pl.com'
  // axios.defaults.baseURL = opt.baseURL || 'http://192.168.1.105:9999'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (loading) this.$Spin.show()
    return config
  }, error => {
    if (loading) this.$Spin.hide()
    return Promise.reject(error)
  })
  axios.interceptors.response.use(response => {
    if (loading) this.$Spin.hide()
    return response
  }, error => {
    if (loading) this.$Spin.hide()
    return Promise.reject(error)
  })
  var data = opt.params ? qs.stringify(opt.params) : ''
  axios.request({
    method: opt.method || 'POST',
    url: opt.url,
    data: data || '',
    timeout: opt.timeout || 0,
    // withCredentials: true,
    responseType: opt.dataType || 'json'
  }).then((response) => {
    // success
    console.log(response)
    if (response.data.status === 200) {
      if (opt.success && typeof opt.success === 'function') {
        opt.success(response.data)
      }
    } else {
      this.$Notice.error({
        title: '错误',
        desc: response.data.message
      })
      if (opt.error && typeof opt.error === 'function') {
        opt.error(response.data)
      }
    }
  }).catch((error) => {
    // error
    this.$Notice.error({
      title: '错误',
      desc: error.message
    })
    console.log(error)
    if (opt.catch && typeof opt.catch === 'function') {
      opt.catch()
    }
  })
}
