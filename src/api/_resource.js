import Vue from "vue"
import axios from 'axios'

axios.defaults.baseURL = `${process.env.VUE_APP_ROOT_API}`

export const _resource = {
  query,
  save,
  update,
  destroy,
  setHeaders
};

async function query(address, headers = [], isRaw = false) {
  this.setHeaders()

  if (isRaw) {
    return await axios.get(`/${address}`).then(response => response);
  } else {
    return await axios.get(`/${address}`).then(response => response.data);
  }
}

async function save(address, payload, headers = []) {
  this.setHeaders()
  return await axios
    .post(address, payload)
    .then(response => response.data);
}

async function update(address, payload, headers = []) {
  this.setHeaders()
  return await axios
    .put(address, payload)
    .then(response => response.data);
}

async function destroy(address) {
  this.setHeaders()
  return await axios.delete(address).then(response => response.data);
}

function setHeaders () {
  let accessToken = localStorage.token
  axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization' : `Bearer ${accessToken}`
  }
}
