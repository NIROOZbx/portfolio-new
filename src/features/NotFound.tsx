import React from 'react'
import { useNavigate } from 'react-router-dom'
import noResultsIcon from '../assets/no-results.png'

const NotFound: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
            <img 
                src={noResultsIcon} 
                alt="Page Not Found" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain mb-8 opacity-90 drop-shadow-sm" 
            />
            <h1 className="font-heading font-semibold text-3xl md:text-5xl text-text-heading mb-4 tracking-tight">
                404 - Page Not Found
            </h1>
            <p className="font-sans text-text-subheading mb-8 max-w-md text-base md:text-lg">
                Whoops! It looks like you've wandered into an unknown route. This page doesn't exist.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-8 py-3.5 bg-element-black hover:bg-neutral-800 text-white rounded-full font-sans font-semibold transition-all duration-200 shadow-sm active:scale-[0.98]"
            >
                Take Me Home
            </button>
        </div>
    )
}

export default NotFound
