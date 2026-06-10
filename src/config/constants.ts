export const SITE_CONFIG = {
  email: import.meta.env.VITE_EMAIL,
  calendly: 'https://cal.com/nirooz-vp/15min',
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  },
  socials: {
    github: 'https://github.com/NIROOZbx',
    linkedin: 'https://www.linkedin.com/in/nirooz-vp-4a4227254/',
    discord: 'https://discord.com/channels/@me/972200231020167178',
    x: 'https://x.com/Nirooz18'
  },
  projects: {
    jerseyHub: {
      github: 'https://github.com/NIROOZbx/project-server',
      live: 'https://jerseyhub.site'
    },
    envoy: {
      github: 'https://github.com/NIROOZbx/notification-engine',
      live: 'https://envoy-client.vercel.app'
    },
    relay: {
      github: 'https://github.com/NIROOZbx/chat-app-backend',
      live: 'https://chat-app-frontend-pink-phi.vercel.app/'
    }
  }
}

