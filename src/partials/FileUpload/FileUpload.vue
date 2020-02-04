<template src="./FileUpload.html"></template>
<script>
const image_file_types = ["image/jpeg", "image/gif", "image/png"]
const doc_file_types = ["application/msword", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
const csv_file_types = ["text/csv", "application/vnd.ms-excel"]

export default {
  name: "FileUpload",
  prop: ['value'],
  props: {
    label: String,
    customClass: {
      default: '',
      type: String
    },
    required: Boolean,
    file_type: {
      default: 'image',
      type: String
    }
  },
  data() {
    return {
      form: {
        required : '',
        format: ''
      },
      form_file: '',
      supported_format: '',
      file: ''
    };
  },
  created () {
    this.form_file = this.$refs.file_upload
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files || e.dataTransfer.files;
      if (!this.file.length || !this.isCorrectFile(this.file[0])) {
        this.value = '';
      } else {
        this.value = this.file[0]
      }
    },
    validate() {
      if (this.required) {
        return this.isCorrectFile(this.file[0])
      }
      return false
    },
    isCorrectFile(file) {
      this.form.required = false
      this.supported_format = ''

      if (file != undefined && this.verifyFileType(file.type)) {
        this.form.format = false
        return true;
      }

      if (this.file_type == 'image') {
        this.supported_format = '(JPG, GIF, PNG)'
      } else if (this.file_type == 'document') {
        this.supported_format = '(DOC, DOCX, PDF)'
      } else if (this.file_type == 'csv') {
        this.supported_format = '(CSV)'
      } else {
        this.supported_format = '(unsupported file type)'
      }

      this.form.format = true
      return false;
    },

    verifyFileType(fileType) {
      let self = this
      let verified = false
      self.supported_format = ''

      if (self.file_type == 'image') {
        if (image_file_types.indexOf(fileType) >= 0) {
          verified = true
        }
      } else if (self.file_type == 'document') {
        if (doc_file_types.indexOf(fileType) >= 0) {
          verified = true
        }
      } else if (self.file_type == 'csv') {
        if (csv_file_types.indexOf(fileType) >= 0) {
          verified = true
        }
      } else if (self.file_type == 'all') {
        if (doc_file_types.indexOf(fileType) >= 0 || image_file_types.indexOf(fileType) >= 0 ) {
          verified = true
        }
      }

      return verified
    }
  }
};
</script>
<style scoped src="./FileUpload.css"></style>
