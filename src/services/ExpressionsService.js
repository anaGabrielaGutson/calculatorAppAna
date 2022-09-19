import api from 'config/api';

export default {
  getExpressions: () => api.get('/expressions'),
  postExpression: value => api.post('/expressions', { value }),
  putExpression: (id, newExpression) => api.put(`/expressions/${id}`, { value: newExpression }),
  deleteExpression: id => api.delete(`/expressions/${id}`)
};
