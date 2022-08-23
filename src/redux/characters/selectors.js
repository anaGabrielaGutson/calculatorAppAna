import { createSelector } from 'reselect';

export const totalElectricSelector = createSelector(
  store => store.comparator.selectedAppliances,
  store => store.comparator.people,
  (selectedAppliances, people) => ({ selectedAppliances, people })
);
