import axios from 'axios';

// Menyimpan url endpoint untuk request ke back-end
const api = axios.create({
  baseURL: 'http://203.175.11.225:8080/',
});

export default api;
