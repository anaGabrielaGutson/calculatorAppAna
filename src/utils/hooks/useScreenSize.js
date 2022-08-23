import { useState, useEffect, useCallback } from 'react';
import {
  isMobile,
  isTablet,
  isDesktop,
  RESIZE_EVENT,
  retrieveWidth,
  isLandscape
} from '@widergy/web-utils/lib/browser';

import { debounce } from '../functionUtils';

export const useScreenSize = (sizes = {}) => {
  const mobileBP = sizes.mobileBreakpoint || 767;
  const tabletBP = sizes.tabletBreakpoint || 1024;

  const [screenWidth, setScreenWidth] = useState(retrieveWidth);
  const [isMobileSize, setIsMobileSize] = useState(isMobile(mobileBP));
  const [isTabletSize, setIsTabletSize] = useState(isTablet(mobileBP, tabletBP));
  const [isDesktopSize, setIsDesktopSize] = useState(isDesktop(tabletBP));
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    isMobile(mobileBP) || isTablet(mobileBP, tabletBP)
  );
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(
    isTablet(mobileBP, tabletBP) || isDesktop(tabletBP)
  );
  const [isLandscapeScreen, setIsLandscapeScreen] = useState(isLandscape());

  const handleUpdateScreen = useCallback(() => {
    setScreenWidth(retrieveWidth);
    setIsMobileSize(isMobile(mobileBP));
    setIsTabletSize(isTablet(mobileBP, tabletBP));
    setIsDesktopSize(isDesktop(tabletBP));
    setIsMobileOrTablet(isMobile(mobileBP) || isTablet(mobileBP, tabletBP));
    setIsTabletOrDesktop(isTablet(mobileBP, tabletBP) || isDesktop(tabletBP));
    setIsLandscapeScreen(isLandscape());
  }, [mobileBP, tabletBP]);

  useEffect(() => {
    window.addEventListener(RESIZE_EVENT, debounce(handleUpdateScreen, 100));

    return () => window.removeEventListener(RESIZE_EVENT, debounce(handleUpdateScreen, 100));
  }, [handleUpdateScreen]);

  return {
    isMobileSize,
    isTabletSize,
    isDesktopSize,
    isMobileOrTablet,
    isTabletOrDesktop,
    isLandscapeScreen,
    screenWidth
  };
};
