<template src="./Modal.html"></template>
<script>
export default {
  name: "Modal",
  props: {
    title: String,
    content: String,
    type: String
  },
  created() {},
  data() {
    return {};
  },
  methods: {
    triggerOk() {
      this.$bvModal.hide('g-modal')
      this.$emit('triggerOkButton')
    }
  }
};
</script>
<style src="./Modal.css"></style>
