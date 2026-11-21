const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export async function sendSelectedServicesEmail({ name, email, serviceNames, serviceDetails, replyTo }) {
  if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
    throw new Error('Email delivery is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to the deployment environment.')
  }

  return sendEmail({
    toEmail: email,
    toName: name,
    subject: `Your BarryTech assessment: ${serviceNames.join(', ')}`,
    body: serviceDetails,
    replyTo: replyTo?.email,
    purpose: 'selected service details',
  })
}

async function sendEmail({ toEmail, toName, subject, body, replyTo, purpose }) {
  const response = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: {
        to_email: toEmail,
        to_name: toName,
        email_subject: subject,
        email_body: body,
        reply_to: replyTo,
      },
    }),
  })

  if (!response.ok) {
    let providerMessage = ''
    try {
      providerMessage = await response.text()
    } catch {
      providerMessage = ''
    }
    throw new Error(
      providerMessage
        ? `EmailJS could not send ${purpose}: ${providerMessage}`
        : `EmailJS could not send ${purpose}.`,
    )
  }
}
