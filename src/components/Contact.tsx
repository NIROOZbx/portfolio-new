import React, { useState } from 'react'
import { Calendar, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { SITE_CONFIG } from '../config/constants'
import ProgressIndicator from './ProgressIndicator'
import {
  isEmailJSConfigured,
  sendContactEmail,
  triggerMailtoFallback
} from '../services/contact'

const Contact: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  const emailAddress = SITE_CONFIG.email
  const calendlyUrl = SITE_CONFIG.calendly

  const configured = isEmailJSConfigured()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    setIsSending(true)
    setStatus('idle')

    if (!configured) {
      navigator.clipboard.writeText(emailAddress)
      setCopied(true)

      window.location.href = triggerMailtoFallback({ name, email, message })
      setIsSending(false)
      setStatus('success')

      setTimeout(() => setCopied(false), 3000)
      return
    }

    try {
      await sendContactEmail({ name, email, message })

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
    } finally {
      setIsSending(false)
    }
  }


  return (
    <section className="flex flex-col items-center animate-fade-in min-h-full w-full">
      <ProgressIndicator />

      {/* Black CTA Card / Form Container */}
      <div className="w-full max-w-[1215px] mx-auto bg-element-black text-white p-6 md:p-14 rounded-[20px] mt-6 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">

        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent pointer-events-none" />

        <div className="w-full max-w-2xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="font-heading font-bold text-3xl md:text-[42px] text-white tracking-tight mb-4 text-center">
            Ready to work with me?
          </h2>
          <p className="font-sans text-sm md:text-base text-[#b3b3b3] max-w-xl leading-relaxed mb-8 text-center">
            Whether you have a full project in mind or just a rough idea — drop a line below. I'll get back to you within 24 hours.
          </p>

          {status === 'success' ? (
            <div className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in">
              <CheckCircle2 size={48} className="text-green-400 mb-4" />
              <h3 className="font-heading font-bold text-2xl mb-2 text-white">
                Message Sent!
              </h3>
              <p className="font-sans text-sm text-[#b3b3b3] mb-6 max-w-md">
                {copied
                  ? "I've copied my email to your clipboard and opened your mail client with your message drafted. Talk soon!"
                  : "Thanks for reaching out! Your message was received and I'll get back to you shortly."}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 bg-white hover:bg-neutral-100 text-element-black font-sans text-sm font-semibold rounded-full transition-all cursor-pointer active:scale-[0.98]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 text-left">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-sans text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl font-sans text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/35 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="font-sans text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl font-sans text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/35 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-sans text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Tell me about your project
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about what you are building, design preferences, and timeline..."
                  className="px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl font-sans text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/35 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-neutral-100 disabled:bg-neutral-400 text-element-black font-sans text-sm font-bold rounded-xl transition-all cursor-pointer active:scale-[0.99] select-none"
              >
                {isSending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} className="translate-y-[0.5px]" />
                  </>
                )}
              </button>

              {status === 'error' && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-950/30 border border-red-500/20 text-red-300 text-xs rounded-xl mt-2 animate-fade-in">
                  <AlertCircle size={14} />
                  <span>Something went wrong. Please check or try again later.</span>
                </div>
              )}

              {/* DX Fallback helper (only displayed if credentials are not configured) */}
              {!isEmailJSConfigured && (
                <p className="text-[11px] text-neutral-500 text-center mt-2 leading-relaxed select-none">
                  Submitting will copy <strong>{emailAddress}</strong> to your clipboard and open your email client.
                </p>
              )}
            </form>
          )}

          {/* Alternative direct calendar link */}
          <div className="mt-4 border-t border-white/5 w-full flex flex-col items-center">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] text-white rounded-full font-sans text-[13px] font-semibold transition-all cursor-pointer select-none active:scale-[0.98]"
            >
              <Calendar size={13} strokeWidth={2.2} />
              Book a slot on my Calendar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
