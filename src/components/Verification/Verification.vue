<template src="./Verification.html"></template>
<script>
import { mapState, mapActions } from "vuex"

import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import SuccessCheck from "@/partials/SuccessCheck/SuccessCheck.vue"

const container = {
  state: mapState({
    txn_status: state => state.merchants.status
  }),
  actions: mapActions({
    query: "merchants/query"
  })
}

export default {
  name: "Verification",
  components: {
    PageLoader,
    SuccessCheck
  },
  computed: {
    ...container.state
  },
  data() {
    return {
      loader: true,
      verify: false
    };
  },
  mounted() {
    this.loader = false
    this.checkHash()
  },
  methods: {
    ...container.actions,
    checkHash() {
      let self= this
      let token = self.$route.params.hash;

      if (token != '') {
          self.loader = true
          self.query('merchant/verify/' + token).then(() => {
            if (self.txn_status) {
              self.verify = true
              self.loader = false
            }
          }).catch(() => {
            self.loader = false
          })
      } else {
        self.loader = false
        self.verify = false
      }
    }
  }
};
</script>
<style src="./Verification.css"></style>
