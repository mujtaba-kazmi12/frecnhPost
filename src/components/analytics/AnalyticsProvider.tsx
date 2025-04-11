'use client';

import React from 'react';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleTagManager from './GoogleTagManager';
import PageViewTracker from './PageViewTracker';

export default function AnalyticsProvider() {
  return (
    <>
      <GoogleAnalytics />
      <GoogleTagManager />
      <PageViewTracker />
    </>
  );
} 