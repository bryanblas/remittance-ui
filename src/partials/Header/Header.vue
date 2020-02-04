<template src="./Header.html"></template>
<script>
import { mapActions } from "vuex";

const container = {
  actions: mapActions({
    logout: "login/logout"
  })
};

export default {
  name: "Header",
  data() {
    return {
      permissions: [],
      info: []
    };
  },
  mounted() {
    this.permissions = JSON.parse(localStorage.getItem("permissions"))
    this.info = JSON.parse(localStorage.getItem("info"))
  },
  methods: {
    ...container.actions,
    onLogout() {
      this.logout().then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style src="./Header.css"></style>
