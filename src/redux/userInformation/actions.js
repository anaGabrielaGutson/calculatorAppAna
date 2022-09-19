import { createTypes, completeTypes } from 'redux-recompose';

import FormService from 'services/FormService';

export const actions = createTypes(completeTypes(['SUBMIT_FORM'], ['SAVE_VALUES']), '@@USER_INFORMATION');

const privateActionCreators = {
  submitFormSuccess: data => ({
    type: actions.SUBMIT_FORM_SUCCESS,
    payload: data,
    target: 'inputValues'
  }),
  submitFormFailure: error => ({
    type: actions.SUBMIT_FORM_FAILURE,
    payload: error,
    target: 'inputValues'
  })
};

export const actionCreators = {
  submitForm: values => async dispatch => {
    dispatch({ type: actions.SUBMIT_FORM, target: 'inputValues' });
    const response = await FormService.postUserForm(values);
    if (response.ok) {
      dispatch(privateActionCreators.submitFormSuccess(response.data.input_values));
      dispatch(actionCreators.saveValues(null, null));
    } else dispatch(privateActionCreators.submitFormFailure(response.data));
  },
  saveValues: (name, lastName) => async dispatch =>
    dispatch({ type: actions.SAVE_VALUES, payload: { name, lastName } })
};
export default actionCreators;
