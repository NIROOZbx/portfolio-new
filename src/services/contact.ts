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
