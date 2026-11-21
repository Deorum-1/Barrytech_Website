const WEB3FORMS_SUBMIT_URL = 'https://api.web3forms.com/submit'
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export async function sendAssessmentRequest(formData) {
  if (!accessKey) {
    throw new Error('Web3Forms is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to the deployment environment; its access key must belong to the inbox that should receive assessment requests.')
  }

  const payload = new FormData()
  for (const [name, value] of formData.entries()) payload.append(name, value)
  payload.set('access_key', accessKey)
  payload.set('subject', 'New BarryTech free assessment request')
  payload.set('from_name', 'BarryTech Website')

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
