import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/webproxy',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
