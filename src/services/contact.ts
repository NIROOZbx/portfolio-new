import emailjs from '@emailjs/browser'
import { SITE_CONFIG } from '../config/constants'

export interface SendEmailParams {
  name: string
  email: string
  message: string
}

export const isEmailJSConfigured = (): boolean => {
  return (
    !!SITE_CONFIG.emailjs.serviceId &&
    !!SITE_CONFIG.emailjs.templateId &&
    !!SITE_CONFIG.emailjs.publicKey
  )
}

export const sendContactEmail = async (params: SendEmailParams): Promise<boolean> => {
  const { name, email, message } = params

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    reply_to: email
  }

  await emailjs.send(
    SITE_CONFIG.emailjs.serviceId,
    SITE_CONFIG.emailjs.templateId,
    templateParams,
    SITE_CONFIG.emailjs.publicKey
  )
  return true
}

export const triggerMailtoFallback = (params: SendEmailParams): string => {
  const { name, email, message } = params
  const emailAddress = SITE_CONFIG.email

  return `mailto:${emailAddress}?subject=Project Enquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(
    `Hi Nirooz,\n\n${message}\n\nBest regards,\n${name}\n${email}`
  )}`
}

export const getGmailComposeUrl = (params?: Partial<SendEmailParams>): string => {
  const emailAddress = SITE_CONFIG.email
  const subject = params?.name
    ? encodeURIComponent(`Project Enquiry from ${params.name}`)
    : encodeURIComponent('Project Enquiry')
  const body = params?.message
    ? encodeURIComponent(`Hi Nirooz,\n\n${params.message}\n\nBest regards,\n${params.name || ''}\n${params.email || ''}`)
    : ''

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}${subject ? `&su=${subject}` : ''}${body ? `&body=${body}` : ''}`
}

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768
}

export const getSmartEmailUrl = (params?: Partial<SendEmailParams>): string => {
  const emailAddress = SITE_CONFIG.email
  if (isMobileDevice()) {
    const subject = params?.name
      ? encodeURIComponent(`Project Enquiry from ${params.name}`)
      : encodeURIComponent('Project Enquiry')
    const body = params?.message
      ? encodeURIComponent(`Hi Nirooz,\n\n${params.message}\n\nBest regards,\n${params.name || ''}\n${params.email || ''}`)
      : ''
    return `mailto:${emailAddress}?subject=${subject}&body=${body}`
  }
  return getGmailComposeUrl(params)
}

export const openSmartEmail = (params?: Partial<SendEmailParams>) => {
  const url = getSmartEmailUrl(params)
  if (isMobileDevice()) {
    window.location.href = url
  } else {
    window.open(url, '_blank')
  }
}
