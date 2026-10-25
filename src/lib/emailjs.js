const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export const isEmailDeliveryConfigured = () =>
  Object.values(emailConfig).every(Boolean)

export async function sendEmail({ recipient, recipientName, subject, body, replyTo }) {
  if (!isEmailDeliveryConfigured()) {
    throw new Error('Email delivery is not configured yet. Please contact BarryTech by phone.')
  }

  const response = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: {
        to_email: recipient,
        to_name: recipientName,
        email_subject: subject,
        email_body: body,
        reply_to: replyTo,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('We could not send the email. Please try again or contact BarryTech by phone.')
  }
}
