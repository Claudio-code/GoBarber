import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.25.37:3001'
});

export default api;