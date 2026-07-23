import React, { useRef, useEffect, Suspense } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './features/navigation/Navbar'
import NavbarFooter from './features/navigation/NavbarFooter'
import heroImg from './assets/hero2.webp'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'

// Lazy loaded route components for code splitting
const Home = React.lazy(() => import('./features/home/Home'))
const Services = React.lazy(() => import('./features/services/Services'))
const About = React.lazy(() => import('./features/about/About'))
const Projects = React.lazy(() => import('./features/projects/Projects'))
const Designs = React.lazy(() => import('./features/designs/Designs'))
const Contact = React.lazy(() => import('./features/contact/Contact'))
const NotFound = React.lazy(() => import('./features/NotFound'))

function App() {
    const location = useLocation()
    const navigate = useNavigate()
    const mainRef = useRef<HTMLElement>(null)

    // Derive currentTab from URL for styling
    const currentPath = location.pathname.replace('/', '')
    const currentTab = currentPath === '' ? 'home' : currentPath

    useEffect(() => {
        if (mainRef.current) mainRef.current.scrollTop = 0
    }, [location.pathname])

    const handleTabChange = (tab: string) => {
        if (tab === 'home') navigate('/')
        else navigate('/' + tab)
    }

    return (
        <div className="flex flex-col md:flex-row w-full h-svh relative bg-primary-bg">
            <SpeedInsights />
            <Analytics />
            {/* Viewport-wide Hero Background (only on Home tab) */}
            {currentTab === 'home' && (
                <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
                    <img
                        src={heroImg}
                        className="absolute -right-[5%] -bottom-[40%] -rotate-9 w-[140%] max-w-[700px] sm:max-w-[900px] md:w-[100%] md:max-w-[1200px] lg:w-[90%] lg:max-w-[1400px] xl:max-w-[1544px] h-auto max-w-none opacity-[0.4] md:opacity-[0.71] object-contain"
                        alt=""
                        fetchPriority="high"
                    />
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
                    <Suspense fallback={<div className="w-full h-full min-h-[50vh]"></div>}>
                        <Routes>
                            <Route path="/" element={<Home onViewProjects={() => navigate('/projects')} onGetInTouch={() => navigate('/contact')} />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/designs" element={<Designs />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>

                    {currentTab !== 'home' && (
                        <div className="md:hidden mt-3 pb-8 border-t border-border/40 pt-8 w-full flex justify-center">
                            <NavbarFooter />
                        </div>
                    )}
                </div>

            </main>
        </div>
    )
}

export default App
