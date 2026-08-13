import { lazy, Suspense, useRef, useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './features/navigation/Navbar'
import NavbarFooter from './features/navigation/NavbarFooter'
import heroImg from './assets/hero.webp'
import heroImg1280 from './assets/hero-1280.webp'

import Home from './features/home/Home'
import Services from './features/services/Services'
import About from './features/about/About'
import Projects from './features/projects/Projects'
import Contact from './features/contact/Contact'
import NotFound from './features/NotFound'

import DesignsSkeleton from './features/designs/DesignsSkeleton'

const Analytics = lazy(() => import('@vercel/analytics/react').then(({ Analytics }) => ({ default: Analytics })))
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(({ SpeedInsights }) => ({ default: SpeedInsights })))
const Designs = lazy(() => import('./features/designs/Designs'))

function App() {
    const location = useLocation()
    const navigate = useNavigate()
    const mainRef = useRef<HTMLElement>(null)

    // Derive currentTab from URL for styling
    const currentPath = location.pathname.replace('/', '')
    const currentTab = currentPath === '' ? 'home' : currentPath

    const [hideFooter, setHideFooter] = useState(false)

    useEffect(() => {
        setHideFooter(false)
        if (mainRef.current) mainRef.current.scrollTop = 0
    }, [location.pathname])

    const handleTabChange = (tab: string) => {
        if (tab === 'home') navigate('/')
        else navigate('/' + tab)
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-svh relative bg-primary-bg">
            <DeferredTelemetry />
            {/* Viewport-wide Hero Background (only on Home tab) */}
            {currentTab === 'home' && (
                <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
                    <picture>
                        <source media="(min-width: 1440px)" srcSet={heroImg} />
                        <img
                            src={heroImg1280}
                            className="absolute right-[-3%] bottom-[-23%] -rotate-13  w-[140%] max-w-[700px] sm:max-w-[900px] md:w-[100%] md:max-w-[1200px] lg:w-[90%] lg:max-w-[1400px] xl:max-w-[1544px] h-auto max-w-none opacity-[0.4] md:opacity-[0.71] object-contain"
                            alt=""
                            fetchPriority="high"
                        />
                    </picture>
                </div>
            )}

            <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} scrollRef={mainRef} />

            {/* Main content */}
            <main
                ref={mainRef}
                className={`flex-1 min-h-0 px-6 box-border relative z-10 mobile-content-pad
          ${currentTab === 'home'
                        ? 'overflow-hidden md:py-0 md:px-16 pt-[72px] md:pt-8'
                        : 'overflow-y-auto pt-[96px] md:pt-8 md:pb-10 md:px-16'}`}
            >
                <div key={location.pathname} className={`tab-enter ${currentTab === 'home' ? 'h-full flex justify-center' : ''}`}>
                        <Routes>
                            <Route path="/" element={<Home onViewDesigns={() => navigate('/designs')} onGetInTouch={() => navigate('/contact')} />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route
                                path="/designs"
                                element={
                                    <Suspense fallback={<DesignsSkeleton showHeader />}>
                                        <Designs onHideFooter={setHideFooter} />
                                    </Suspense>
                                }
                            />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        {currentTab !== 'home' && !hideFooter && (
                            <div className="md:hidden mt-3 pb-8 border-t border-border/40 pt-8 w-full flex justify-center">
                                <NavbarFooter />
                            </div>
                        )}
                </div>

            </main>
        </div>
    )
}

function DeferredTelemetry() {
    const [enabled, setEnabled] = useState(false)

    useEffect(() => {
        const timer = window.setTimeout(() => setEnabled(true), 2500)
        return () => window.clearTimeout(timer)
    }, [])

    if (!enabled) return null

    return (
        <Suspense fallback={null}>
            <SpeedInsights />
            <Analytics />
        </Suspense>
    )
}

export default App
