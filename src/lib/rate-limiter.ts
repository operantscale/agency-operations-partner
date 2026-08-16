/**
 * Simple in-memory rate limiter for protecting against spam/abuse.
 * Tracks submissions per IP address with a configurable time window.
 * In production, consider using Redis or a database for distributed systems.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const limiterStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of limiterStore.entries()) {
    if (entry.resetTime < now) {
      limiterStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // Time window in milliseconds
}

/**
 * Check if a request from the given IP should be rate limited.
 * Returns { allowed: true } if request should proceed.
 * Returns { allowed: false, retryAfter: number } if rate limited (seconds until reset).
 */
export function checkRateLimit(
  ip: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour default
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = `ratelimit:${ip}`;

  let entry = limiterStore.get(key);

  // Create new entry if doesn't exist or has expired
  if (!entry || entry.resetTime < now) {
    limiterStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { allowed: true };
  }

  // Increment counter
  entry.count++;

  if (entry.count > config.maxRequests) {
    const retryAfterMs = entry.resetTime - now;
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
    return { allowed: false, retryAfter: retryAfterSeconds };
  }

  return { allowed: true };
}

/**
 * Reset the rate limit for a specific IP (useful for administrative purposes).
 */
export function resetRateLimit(ip: string): void {
  const key = `ratelimit:${ip}`;
  limiterStore.delete(key);
}

/**
 * Get current rate limit status for debugging.
 */
export function getRateLimitStatus(ip: string) {
  const key = `ratelimit:${ip}`;
  const entry = limiterStore.get(key);
  const now = Date.now();

  if (!entry || entry.resetTime < now) {
    return { active: false, count: 0, resetTime: null };
  }

  return {
    active: true,
    count: entry.count,
    resetTime: new Date(entry.resetTime).toISOString(),
    secondsUntilReset: Math.ceil((entry.resetTime - now) / 1000),
  };
}
