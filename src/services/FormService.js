import api from 'config/api';

export default {
  postUserForm: value => api.post('/form_responses', { input_values: value })
};
