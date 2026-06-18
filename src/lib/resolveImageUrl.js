import { BASE_URL } from '@/lib/constants';

/**
 * Resolve an image path from the API to a usable URL.
 *
 * - Full URLs (http/https) pass through unchanged
 * - Relative paths (/uploads/...) get BASE_URL prepended (backward compat)
 * - Null/empty/falsy values return the fallback
 *
 * Once the backend returns full URLs this becomes a simple passthrough,
 * but it still handles edge cases (null, empty, old DB records with relative paths).
 */
export function resolveImageUrl(path, fallback = '/ImagePlaceholder.png') {
    if (!path || typeof path !== 'string' || path.trim() === '') return fallback;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('/')) return `${BASE_URL}${path}`;
    return fallback;
}
