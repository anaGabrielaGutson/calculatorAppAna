import store from 'redux/store';

export const event = (category, action, label, value) => {
  const userId =
    (store.getState().user.currentUser && store.getState().user.currentUser.id) ||
    store.getState().user.publicUserId;
  return {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value,
    userId
  };
};
