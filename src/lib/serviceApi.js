/**
 * Normalizes list responses from GET /service (array or common wrappers).
 */
export function normalizeServiceList(payload) {
    if (Array.isArray(payload)) return payload;
    if (payload && typeof payload === 'object') {
        const nested =
            payload.data ?? payload.services ?? payload.items ?? payload.results ?? payload.service;
        if (Array.isArray(nested)) return nested;
    }
    return [];
}

import { BASE_URL } from '@/lib/constants';

export async function fetchServiceList() {
    try {
        const res = await fetch(`${BASE_URL}/service`);
        if (!res.ok) return [];
        const json = await res.json();
        return normalizeServiceList(json);
    } catch (e) {
        console.error('fetchServiceList:', e);
        return [];
    }
}

/**
 * Normalizes GET /service/:slug — direct document or { data } / { service } wrapper.
 */
export function normalizeServiceDetail(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return null;
    const nested = payload.data ?? payload.service;
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) return nested;
    return payload;
}

export async function fetchServiceBySlug(slug) {
    if (!slug) return null;
    try {
        const res = await fetch(`${BASE_URL}/service/${encodeURIComponent(slug)}`);
        if (res.status === 404) return null;
        if (!res.ok) return null;
        const json = await res.json();
        const data = normalizeServiceDetail(json);
        return data && data.slug ? data : null;
    } catch (e) {
        console.error('fetchServiceBySlug:', e);
        return null;
    }
}
