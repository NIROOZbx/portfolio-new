import { supabase } from './supabaseClient'

const COOKIE_NAME = 'portfolio_vid'

function getOrCreateVisitorId(): string {
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

export async function getAndIncrementTotalViews(): Promise<number | null> {
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

        // On localhost or owner ignored: show the count read-only without incrementing it
        if (isLocalhost || isIgnored) {
            return getTotalViews()
        }

        const visitorId = getOrCreateVisitorId()

        // Call SECURITY DEFINER RPC function with visitorId
        const { data, error } = await supabase.rpc('record_daily_visit', {
            p_visitor_id: visitorId
        })

        if (error) {
            console.error('[VisitorStats] Supabase RPC error:', error)
            return null
        }

        if (typeof data === 'number') {
            return data
        }
    } catch (err) {
        console.error('[VisitorStats] Unexpected error:', err)
    }

    return null
}
