const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send'

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

export async function sendSelectedServicesEmail({ name, email, serviceNames, serviceDetails, replyTo }) {
  if (!Object.values(emailConfig).every(Boolean)) {
    throw new Error('The service information email is not configured yet.')
  }

  const response = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: {
        to_email: email,
        to_name: name,
        email_subject: `Your BarryTech assessment: ${serviceNames.join(', ')}`,
        email_body: serviceDetails,
        reply_to: replyTo.email,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('We received your assessment request, but could not email the service information.')
  }
}
