import { useEffect } from 'react';

import { trackEvent } from 'services/AnalyticsService';

const useAnalytics = (shouldTrack, category, action, label, value) => {
  useEffect(() => {
    if (shouldTrack) {
      trackEvent(category, action, label, value);
    }
  }, [shouldTrack, category, action, label, value]);
};

export default useAnalytics;
