import { create } from 'apisauce';

const api = create({
  baseURL: 'http://localhost:3001',
  timeout: 30000
});

export default api;
