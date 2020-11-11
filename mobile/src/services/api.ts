import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.234:3333',
});

export default api;
