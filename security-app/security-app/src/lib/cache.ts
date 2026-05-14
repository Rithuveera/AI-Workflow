import type { ComprehensiveScanResult } from "@/types/security";
import crypto from "crypto";

interface CacheEntry {
    result: ComprehensiveScanResult;
    timestamp: number;
    hash: string;
}

// In-memory cache (in production, consider Redis or similar)
const scanCache = new Map<string, CacheEntry>();

// Cache TTL: 1 hour
const CACHE_TTL_MS = 60 * 60 * 1000;

/**
 * Generate cache key from URL
 */
function generateCacheKey(url: string): string {
    // Normalize URL to avoid cache misses from minor variations
    try {
        const urlObj = new URL(url);
        // Use protocol + hostname + pathname (ignore query params and hash)
        const normalized = `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname}`;
        return crypto.createHash('sha256').update(normalized).digest('hex');
    } catch {
        // Fallback to direct hash if URL parsing fails
        return crypto.createHash('sha256').update(url).digest('hex');
    }
}

/**
 * Get cached scan result if available and not expired
 */
export function getCachedScan(url: string): ComprehensiveScanResult | null {
    const key = generateCacheKey(url);
    const entry = scanCache.get(key);

    if (!entry) {
        return null;
    }

    // Check if cache is expired
    const age = Date.now() - entry.timestamp;
    if (age > CACHE_TTL_MS) {
        // Remove expired entry
        scanCache.delete(key);
        console.log(`[Cache] Expired cache entry removed for: ${url}`);
        return null;
    }

    console.log(`[Cache] ✓ Cache hit for: ${url} (age: ${Math.round(age / 1000)}s)`);
    return entry.result;
}

/**
 * Store scan result in cache
 */
export function setCachedScan(url: string, result: ComprehensiveScanResult): void {
    const key = generateCacheKey(url);
    const hash = crypto.createHash('sha256').update(JSON.stringify(result)).digest('hex');

    scanCache.set(key, {
        result,
        timestamp: Date.now(),
        hash,
    });

    console.log(`[Cache] Stored result for: ${url}`);
}

/**
 * Invalidate cache for specific URL
 */
export function invalidateCache(url: string): boolean {
    const key = generateCacheKey(url);
    const deleted = scanCache.delete(key);

    if (deleted) {
        console.log(`[Cache] Invalidated cache for: ${url}`);
    }

    return deleted;
}

/**
 * Clear all cached scans
 */
export function clearAllCache(): void {
    const size = scanCache.size;
    scanCache.clear();
    console.log(`[Cache] Cleared ${size} cached entries`);
}

/**
 * Get cache statistics
 */
export function getCacheStats(): {
    totalEntries: number;
    totalSizeBytes: number;
    oldestEntry: number | null;
    newestEntry: number | null;
} {
    let totalSizeBytes = 0;
    let oldestEntry: number | null = null;
    let newestEntry: number | null = null;

    for (const entry of scanCache.values()) {
        // Estimate size
        totalSizeBytes += JSON.stringify(entry.result).length;

        if (oldestEntry === null || entry.timestamp < oldestEntry) {
            oldestEntry = entry.timestamp;
        }
        if (newestEntry === null || entry.timestamp > newestEntry) {
            newestEntry = entry.timestamp;
        }
    }

    return {
        totalEntries: scanCache.size,
        totalSizeBytes,
        oldestEntry,
        newestEntry,
    };
}

/**
 * Clean up expired cache entries
 */
export function cleanupExpiredCache(): number {
    let removed = 0;
    const now = Date.now();

    for (const [key, entry] of scanCache.entries()) {
        if (now - entry.timestamp > CACHE_TTL_MS) {
            scanCache.delete(key);
            removed++;
        }
    }

    if (removed > 0) {
        console.log(`[Cache] Cleaned up ${removed} expired entries`);
    }

    return removed;
}

// Auto-cleanup every 15 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupExpiredCache, 15 * 60 * 1000);
}
