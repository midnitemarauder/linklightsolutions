import xss from 'xss';

export const sanitizeInput = (input: string): string => {
  return xss(input.trim(), {
    whiteList: {}, // No HTML tags allowed
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style']
  });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const rateLimit = (() => {
  const requests = new Map<string, number[]>();
  const WINDOW_MS = 60000; // 1 minute
  const MAX_REQUESTS = 5; // Maximum 5 requests per minute

  return (identifier: string): boolean => {
    const now = Date.now();
    const timestamps = requests.get(identifier) || [];
    const recentRequests = timestamps.filter(time => now - time < WINDOW_MS);
    
    if (recentRequests.length >= MAX_REQUESTS) {
      return false;
    }

    recentRequests.push(now);
    requests.set(identifier, recentRequests);

    // Cleanup old entries
    setTimeout(() => {
      const current = requests.get(identifier) || [];
      requests.set(identifier, current.filter(time => now - time < WINDOW_MS));
    }, WINDOW_MS);

    return true;
  };
})();