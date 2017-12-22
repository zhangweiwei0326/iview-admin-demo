<template>
  <div class="login">
    <div class="login_box">
      <qrcode-vue :value="value" size="270" level="H" className="qrcode"></qrcode-vue>
      <div class="user hidden">
        <div class="avatar"><img src="http://res.eweixue.com//img/4ac9a8909f91b8c706cdcc13b025c0a1.png" width="120px" height="120px"></div>
        <h4>186****0788</h4>
      </div>
      <div class="">
        <p class="title" v-html="title"></p>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
// import Cookies from 'js-cookie'
export default {
  components: {
    QrcodeVue
  },
  name: 'login',
  data () {
    return {
      title: '使用手机APP扫码登录',
      value: location.href
    }
  },
  created: function () {
    // init
    // this.init()
  },
  methods: {
    init: function () {
      // 获取code
      this.request({
        url: this.Api.AUTH_CODE,
        success: (response) => {
          if (response.status === 200) {
            this.value = this.Api.BASE_URL + this.Api.AUTH_PAGE + response.data.code
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../styles/login.less';
</style>
