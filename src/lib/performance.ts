export const measurePerformance = (metric: string) => {
  if (process.env.NODE_ENV === 'production') {
    const entry = performance.mark(metric);
    
    // Report to analytics service
    console.info(`Performance metric - ${metric}:`, entry.startTime);
    
    return () => {
      const measure = performance.measure(metric);
      console.info(`Performance measure - ${metric}:`, measure.duration);
    };
  }
  
  return () => {};
};

export const trackPageLoad = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType('paint');
      
      console.info('Page Load Metrics:', {
        loadTime: navigation.loadEventEnd - navigation.startTime,
        firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime
      });
    });
  }
};