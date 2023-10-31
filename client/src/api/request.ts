import axios from 'axios';

const { VITE_SERVER_URL } = import.meta.env;

const config = {
  baseURL: `${VITE_SERVER_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
};

const client = axios.create(config);

export default client;
