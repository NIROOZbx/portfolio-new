import { supabase } from './supabaseClient'

const COOKIE_NAME = 'portfolio_vid'

export function getOrCreateVisitorId(): string {
    // 1. Try reading cookie
    const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'))
    if (match && match[2]) {
        return match[2]
    }

    // 2. Fallback check localStorage
    let vid = localStorage.getItem(COOKIE_NAME)
    if (!vid) {
        vid = crypto.randomUUID()
        localStorage.setItem(COOKIE_NAME, vid)
    }

    // 3. Set/refresh cookie (1 year expiration)
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `${COOKIE_NAME}=${vid}; expires=${expires}; path=/; SameSite=Lax`

    return vid
}

async function getTotalViews(): Promise<number | null> {
    const { data, error } = await supabase.rpc('get_total_views')

    if (error) {
        console.error('[VisitorStats] get_total_views error:', error)
        return null
    }

    return typeof data === 'number' ? data : null
}

let cachedTotalViews: number | null = (() => {
    try {
        const val = sessionStorage.getItem('portfolio_total_views')
        return val ? Number(val) : null
    } catch {
        return null
    }
})()
let inFlightPromise: Promise<number | null> | null = null

export async function getAndIncrementTotalViews(): Promise<number | null> {
    if (cachedTotalViews !== null) {
        return cachedTotalViews
    }
    if (inFlightPromise) {
        return inFlightPromise
    }

    inFlightPromise = (async () => {
        try {
            // Check if running on local development environment
            const isLocalhost = Boolean(
                window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.hostname === '[::1]' ||
                window.location.hostname.endsWith('.local')
            )

            // Check if visitor count tracking is explicitly disabled in localStorage (e.g. for site owner)
            const isIgnored = localStorage.getItem('ignore_visitor_count') === 'true'

            let result: number | null = null
            if (isLocalhost || isIgnored) {
                result = await getTotalViews()
            } else {
                const visitorId = getOrCreateVisitorId()
                const { data, error } = await supabase.rpc('record_daily_visit', {
                    p_visitor_id: visitorId
                })

                if (error) {
                    console.error('[VisitorStats] Supabase RPC error:', error)
                } else if (typeof data === 'number') {
                    result = data
                }
            }

            if (result !== null) {
                cachedTotalViews = result
                try {
                    sessionStorage.setItem('portfolio_total_views', String(result))
                } catch {
                    // ignore storage errors
                }
            }

            return result
        } catch (err) {
            console.error('[VisitorStats] Unexpected error:', err)
            return null
        } finally {
            inFlightPromise = null
        }
    })()

    return inFlightPromise
}
