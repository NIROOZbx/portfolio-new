import { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Services from './components/Services'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import heroImg from './assets/hero2.webp'

function App() {
  const [currentTab, setCurrentTab] = useState('home')
  const mainRef = useRef<HTMLElement>(null)

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    // reset scroll when switching tabs
    if (mainRef.current) mainRef.current.scrollTop = 0
  }

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <Home
            onViewProjects={() => setCurrentTab('projects')}
            onGetInTouch={() => setCurrentTab('contact')}
          />
        )
      case 'services':
        return <Services />
      case 'about':
        return <About />
      case 'projects':
        return <Projects />
      case 'contact':
        return <Contact />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen h-dvh relative bg-primary-bg">
      {/* Viewport-wide Hero Background (only on Home tab) */}
      {currentTab === 'home' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
          <img
            src={heroImg}
            className="absolute -right-[5%] -bottom-[40%] -rotate-9 w-[140%] max-w-[700px] sm:max-w-[900px] md:w-[100%] md:max-w-[1200px] lg:w-[90%] lg:max-w-[1400px] xl:max-w-[1544px] h-auto max-w-none opacity-[0.4] md:opacity-[0.71] object-contain"
            alt=""
            loading="lazy"
          />
        </div>
      )}

      <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} scrollRef={mainRef} />

      {/* Main content */}
      <main
        ref={mainRef}
        className={`flex-1 min-h-0 px-6 box-border relative z-10
          ${currentTab === 'home'
            ? 'overflow-hidden md:py-0 md:px-16 pt-[72px] md:pt-8 pb-28'
            : 'overflow-y-auto pt-[72px] md:pt-8 pb-46 md:pb-24 md:px-16 md:py-10'}`}
      >
        {renderContent()}
      </main>
    </div>
  )
}

export default App
