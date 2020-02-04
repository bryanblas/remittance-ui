<template>
  <div id="app">
     <div v-if="$router.currentRoute.path != '/login'
     && $router.currentRoute.path != '/register'
     &&  $router.currentRoute.path != '/forgot-password'
     && ($router.currentRoute.path.indexOf('/verification') < 0)
     && ($router.currentRoute.path.indexOf('/reset-password') < 0)">
        <Header></Header>
        <router-view></router-view>
    </div>
    <template v-else>
      <div class="text-center login-base">
        <img class="mb-4" src="@/assets/logo.png" alt="" width="200">
      </div>
      <router-view></router-view>
    </template>

    <b-modal id="g-error-modal" title="Error">
      <p class="my-2">
        <icon-alert-outline class="text-danger mr-2" />
        {{ modal_error.content }}
      </p>
      <div slot="modal-footer">
          <button type="button" class="btn btn-info" @click="$bvModal.hide('g-error-modal')">OK</button>
      </div>
    </b-modal>

  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/";
import Header from "@/partials/Header/Header.vue";

export default {
  name: "default",
  components: {
    Header
  },
  data () {
    return {
      modal_error: {
        content: ''
      },
      error: {
        'validation.unique' : 'Email is already in use.'
      }
    }
  },
  created: function () {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response) {
          let err = error.response

          let selfInstance = this
          let errData = err.data

          selfInstance.modal_error.content = ''
          if (errData.data != undefined && errData.data.length > 0 && (typeof(errData.data) == 'object' || typeof(errData.data) == 'array')) {
            var errorList = Object.values(errData.data)
            for (var i = 0; i < errorList.length; i++) {
              if (Array.isArray(errorList[i])) {
                selfInstance.modal_error.content += errorList[i] + "\n"
              } else {
                selfInstance.modal_error.content += this.error[errorList[i]] + "\n"
              }
            }
          } else if (errData.error != undefined) {
            selfInstance.modal_error.content = errData.error.code + " - " + errData.error.message;
          } else {
            selfInstance.modal_error.content = errData.error_code + " - " + errData.message;
          }


          switch (error.response.status) {
            case 401:
              router.push("/login");
              break;

            default:
              selfInstance.$bvModal.show("g-error-modal");
              return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );

    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
            case 403:
              router.push("/login");
              break;

            default:
              return false;
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
};
</script>
