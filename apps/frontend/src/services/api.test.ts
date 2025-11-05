import { describe, it, expect, beforeEach, vi } from 'vitest'
import { login, register } from './api'

globalThis.fetch = vi.fn()

describe('API Services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('login makes correct API call', async () => {
    const mockResponse = { token: 'test-token', user: { id: '1', email: 'test@test.com' } };
    
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await login('test@test.com', 'password')

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
      })
    )

    expect(result).toEqual(mockResponse);
  })

  it('register makes correct API call', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '1', email: 'test@test.com' }),
    })

    await register('test@test.com', 'password', 'user');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/register'),
      expect.objectContaining({
        method: 'POST',
      })
    )
  })
})