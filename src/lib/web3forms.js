const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit'
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export async function sendAssessmentRequest(formData) {
  if (!accessKey) {
    throw new Error('Web3Forms is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to the deployment environment; its access key must belong to the inbox that should receive assessment requests.')
  }

  const payload = new FormData()
  for (const [name, value] of formData.entries()) payload.append(name, value)

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const customerType = String(formData.get('customer_type') ?? 'individual').trim()
  const organization = String(formData.get('organization') ?? '').trim()

  payload.set('access_key', accessKey)
  payload.set(
    'subject',
    organization
      ? `Assessment request - ${organization} (${name})`
      : `Assessment request - ${name || 'Individual'}`,
  )
  payload.set('from_name', name || 'BarryTech website visitor')
  payload.set('replyto', email)
  payload.set('reply_to', email)
  payload.set('sender_name', name || 'BarryTech website visitor')
  payload.set('sender_email', email)
  payload.set('customer_type', customerType)

  const response = await fetch(WEB3FORMS_SUBMIT_URL, { method: 'POST', body: payload })
  let result
  try {
    result = await response.json()
  } catch {
    throw new Error(`Web3Forms returned an unreadable response (HTTP ${response.status}).`)
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Web3Forms could not send the assessment request (HTTP ${response.status}).`)
  }
}
