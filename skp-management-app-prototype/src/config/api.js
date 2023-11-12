import axios from 'axios';

// Menyimpan url endpoint untuk request ke back-end
const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

export default api;
