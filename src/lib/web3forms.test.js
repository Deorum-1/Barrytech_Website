import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.resetModules()
})

describe('sendAssessmentRequest', () => {
  it('sends the assessment fields and generated email metadata', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key')
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    })
    vi.stubGlobal('fetch', fetch)
    vi.resetModules()

    const { sendAssessmentRequest } = await import('./web3forms.js')
    const formData = new FormData()
    formData.set('name', '  Ada Lovelace  ')
    formData.set('email', 'ada@example.com')
    formData.set('customer_type', 'business')
    formData.set('organization', 'Analytical Engines')
    formData.set('message', 'We need a secure network.')

    await sendAssessmentRequest(formData)

    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch).toHaveBeenCalledWith('https://api.web3forms.com/submit', {
      method: 'POST',
      body: expect.any(FormData),
    })
    const payload = fetch.mock.calls[0][1].body
    expect(payload.get('access_key')).toBe('test-access-key')
    expect(payload.get('subject')).toBe('Assessment request - Analytical Engines (Ada Lovelace)')
    expect(payload.get('from_name')).toBe('Ada Lovelace')
    expect(payload.get('replyto')).toBe('ada@example.com')
    expect(payload.get('reply_to')).toBe('ada@example.com')
    expect(payload.get('customer_type')).toBe('business')
    expect(payload.get('message')).toBe('We need a secure network.')
  })

  it('reports provider failures and unreadable responses', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key')
    const fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ success: false, message: 'Invalid request' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 502,
        json: async () => {
          throw new Error('Invalid JSON')
        },
      })
    vi.stubGlobal('fetch', fetch)
    vi.resetModules()

    const { sendAssessmentRequest } = await import('./web3forms.js')
    const formData = new FormData()

    await expect(sendAssessmentRequest(formData)).rejects.toThrow('Invalid request')
    await expect(sendAssessmentRequest(formData)).rejects.toThrow(
      'Web3Forms returned an unreadable response (HTTP 502).',
    )
  })

  it('fails clearly when no access key is configured', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '')
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    vi.resetModules()

    const { sendAssessmentRequest } = await import('./web3forms.js')

    await expect(sendAssessmentRequest(new FormData())).rejects.toThrow(
      'Web3Forms is not configured.',
    )
    expect(fetch).not.toHaveBeenCalled()
  })
})
