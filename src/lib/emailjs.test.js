import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.resetModules()
})

describe('sendSelectedServicesEmail', () => {
  it('sends selected service details using configured EmailJS credentials', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'test-service')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'test-template')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'test-public-key')
    const fetch = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetch)
    vi.resetModules()

    const { sendSelectedServicesEmail } = await import('./emailjs.js')
    await sendSelectedServicesEmail({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      serviceNames: ['Cloud Security', 'Network Support'],
      serviceDetails: 'Service descriptions',
      replyTo: { name: 'BarryTech', email: 'info@example.com' },
    })

    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch).toHaveBeenCalledWith('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        service_id: 'test-service',
        template_id: 'test-template',
        user_id: 'test-public-key',
        template_params: {
          to_email: 'ada@example.com',
          to_name: 'Ada Lovelace',
          from_name: 'BarryTech',
          from_email: 'info@example.com',
          email_subject: 'BarryTech service information: Cloud Security, Network Support',
          email_body: 'Service descriptions',
          reply_to: 'info@example.com',
        },
      }),
    })
  })

  it('reports provider failures and missing configuration', async () => {
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'test-service')
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ID', 'test-template')
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'test-public-key')
    const fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Rate limit exceeded',
    })
    vi.stubGlobal('fetch', fetch)
    vi.resetModules()

    const { sendSelectedServicesEmail } = await import('./emailjs.js')
    const request = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      serviceNames: ['Cloud Security'],
      serviceDetails: 'Service descriptions',
    }

    await expect(sendSelectedServicesEmail(request)).rejects.toThrow(
      'EmailJS could not send selected service details: Rate limit exceeded',
    )

    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', '')
    vi.resetModules()
    const unconfiguredModule = await import('./emailjs.js')
    await expect(unconfiguredModule.sendSelectedServicesEmail(request)).rejects.toThrow(
      'Email delivery is not configured.',
    )
  })
})
