import api from 'config/api';

export default {
  getQuotes: count => api.get('/quotes', { count })
};
