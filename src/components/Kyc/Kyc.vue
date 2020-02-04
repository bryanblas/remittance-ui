<template src="./Kyc.html"></template>
<script>
import PageLoader from "@/partials/PageLoader/PageLoader.vue"
import SuccessCheck from "@/partials/SuccessCheck/SuccessCheck.vue"
import FileUpload from "@/partials/FileUpload/FileUpload.vue"
import Modal from "@/partials/Modal/Modal.vue"

import { mapState, mapActions } from "vuex"

const container = {
  state: mapState({
    txn_status: state => state.kycdocuments.status,
    kyc_docs: state => state.kycdocuments.data
  }),
  actions: mapActions({
    save: "kycdocuments/store",
    query: "kycdocuments/query"
  })
}

export default {
  name: "Kyc",
  components: {
    PageLoader,
    SuccessCheck,
    FileUpload,
    Modal
  },
  computed: {
    ...container.state
  },
  data() {
    return {
      loader: true,
      form : {
        proof_identity : '',
        proof_address : ''
      },
      modal: {
        title : "Error",
        content: "There was an error encountered on your request."
      },
      documents : [],
      merchant: '',
      asset_path: process.env.VUE_APP_ROOT_ASSETS,
      file: {
          title: '',
          selected: ''
      },
    };
  },
  mounted() {
    this.loader = false
    this.merchant = JSON.parse(localStorage.getItem("info"))
    this.getKycDocuments()
  },
  methods: {
    ...container.actions,
    getKycDocuments() {
      let self = this
      let qry = 'kyc-document/merchant/' + self.merchant.merchant_id
      self.loader = true

      self.query(qry).then(() => {
        if (self.txn_status) {
          self.loader = false;
        }
      }).catch(() => {
        self.loader = false
      })
    },
    proofOfIndentity() {
      var formUpload = this.$refs.file_indentity
      if (formUpload.validate()) {
        this.submitKycDocument(formUpload, 'Proof of Identity')
      }
      return false
    },
    proofOfAddress() {
      var formUpload = this.$refs.file_address
      if (formUpload.validate()) {
        this.submitKycDocument(formUpload, 'Proof of Address')
      }
      return false
    },
    submitKycDocument(formUpload, doc_type) {
      let self = this
      let formData = new FormData()
      formData.append('type', 'image');
      formData.append('status', 'Pending');
      formData.append('document_type', doc_type);
      formData.append("document_file", formUpload.$refs.file.files[0])

      self.loader = true
      self.save(formData).then(() => {
        if (self.txn_status) {
            self.loader = false;
            self.modal.title = "KYC Uploaded";
            self.modal.content = "File has been uploaded successfully. Please wait while we check your documents.";
            self.$bvModal.show("g-modal");
            formUpload.$refs.file = null

            self.getKycDocuments()
          }
      }).catch(() => {
        self.loader = false
      })
    },
    previewFile(doc) {
        let self = this
        self.file.title = doc.document_type
        self.file.selected = self.asset_path + '/' + doc.filename

        self.$bvModal.show('show-preview')
    },
    getClassByStatus(status) {
      var returnClass = ''
      switch(status) {
        case 'Rejected':
          returnClass = 'badge badge-danger';
          break;
        case 'Verified':
          returnClass = 'badge badge-success';
          break;
        default:
          returnClass = 'badge badge-secondary';
          break;
      }

      return returnClass
    }
  }
};
</script>
<style scoped src="./Kyc.css"></style>
