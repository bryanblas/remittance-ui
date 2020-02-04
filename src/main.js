import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from "@/router/"
import store from "@/store/"
import BootstrapVue from "bootstrap-vue"
import VueAnimated from '@codekraft-studio/vue-animated'
import Vuelidate from "vuelidate"

import 'vue-material-design-icons/styles.css'

require("@/assets/css/bootstrap.min.css")
require("@/assets/css/override.css")

import IconAlertOutline from 'vue-material-design-icons/AlertOutline.vue'
import IconPlusCircleOutline from 'vue-material-design-icons/PlusCircleOutline.vue'
import IconAccountClockOutline from 'vue-material-design-icons/AccountClockOutline.vue'
import IconInformationOutline from 'vue-material-design-icons/InformationOutline.vue'
import IconDownloadOutline from 'vue-material-design-icons/DownloadOutline.vue'
import IconImage from 'vue-material-design-icons/Image.vue'
import IconAccountCardDetailsOutline from 'vue-material-design-icons/AccountCardDetailsOutline.vue'
import IconAccountLockOutline from 'vue-material-design-icons/AccountLockOutline.vue'
import IconMapMarkerRadius from 'vue-material-design-icons/MapMarkerRadius.vue'
import IconCheck from 'vue-material-design-icons/Check.vue'

Vue.component('icon-alert-outline', IconAlertOutline)
Vue.component('icon-plus-circle-outline', IconPlusCircleOutline)
Vue.component('icon-account-clock-outline', IconAccountClockOutline)
Vue.component('icon-information-outline', IconInformationOutline)
Vue.component('icon-download-outline', IconDownloadOutline)
Vue.component('icon-image', IconImage)
Vue.component('icon-account-card-details-outline', IconAccountCardDetailsOutline)
Vue.component('icon-account-lock-outline', IconAccountLockOutline)
Vue.component('icon-map-marker-radius', IconMapMarkerRadius)
Vue.component('icon-check', IconCheck)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueAnimated, {
  functional: true
})
Vue.use(Vuelidate)

Vue.prototype.$http = axios

Vue.directive("verified", {
  inserted: function(el, binding) {
    let verified = JSON.parse(localStorage.getItem("verified"));
    if (verified == 'Verified') {
        return true
    }
    el.parentNode.removeChild(el);
  }
})

Vue.mixin({
  methods: {
    formatAmount(value) {
        let val = (value/1).toFixed(2).replace(',', '.')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    formatDate(date, time) {
      let arrayMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      let tempDate = date.replace(' ', 'T') + 'Z'
      let formatDate = new Date(tempDate)
      let meredian = ' AM'
      let day = formatDate.getDate()

      if (day  < 10) {
        day = '0' + String(day);
      }

      let returnDate = arrayMonth[parseInt(formatDate.getMonth())] + ' ' +  day + ', ' +  formatDate.getFullYear()

      let hour = formatDate.getHours()
      let minutes = formatDate.getMinutes()
      if (hour > 12) {
        meredian = ' PM'
        hour = hour - 12
      }

      if (hour < 10) {
        hour = '0' + hour
      }

      if (minutes < 10) {
        minutes = '0' + minutes
      }

      if (time) {
        returnDate =  returnDate + ' ' + hour + ':' + minutes + meredian
      }
      return returnDate
    },
    hasPermission(strPermssion) {
      let permissions = JSON.parse(localStorage.getItem("permissions"))
      let has = false
      if (permissions.length) {
        if (permissions.indexOf(strPermssion) >= 0) {
          has =  true
        }
      }
      return has
    }
  }
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
