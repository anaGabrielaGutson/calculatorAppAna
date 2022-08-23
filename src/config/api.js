import { create } from 'apisauce';

const api = create({
  baseURL: 'https://thesimpsonsquoteapi.glitch.me',
  timeout: 30000
});

export default api;
