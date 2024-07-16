import axios from 'axios';

const config = axios.create({
  baseURL: 'https://dummy.restapiexample.com/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default config;