'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [configStatus, setConfigStatus] = useState({
    supabase: false,
    openrouter: false,
    freepik: false
  })
  const router = useRouter()

  useEffect(() => {
    const checkConfig = async () => {
      const hasSupabase = !!supabase
      
      try {
        const checkOpenRouter = await fetch('/api/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ promotionalIdea: 'test', messageType: 'sms' })
        })
        const orData = await checkOpenRouter.json()
        const hasOpenRouter = !orData.error?.includes('configuration')

        const checkFreepik = await fetch('/api/image', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageDescription: 'test' })
        })
        const fpData = await checkFreepik.json()
        const hasFreepik = !fpData.error?.includes('configuration')

        setConfigStatus({
          supabase: hasSupabase,
          openrouter: hasOpenRouter,
          freepik: hasFreepik
        })
      } catch (e) {
        setConfigStatus({
          supabase: hasSupabase,
          openrouter: false,
          freepik: false
        })
      }
    }
    checkConfig()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!supabase) {
      setError('Application not configured. Please check environment variables.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const allConfigured = configStatus.supabase && configStatus.openrouter && configStatus.freepik

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-lg w-full space-y-8 p-8">
        <div>
          <h1 className="text-4xl font-bold text-center text-blue-600">ELITEIIT</h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Marketing Tools
          </h2>
        </div>

        {!allConfigured && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Configuration Required</h3>
            <p className="text-sm text-gray-700 mb-4">
              Missing required environment variables. Please set up the following:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className={configStatus.supabase ? 'text-green-600' : 'text-red-600'}>
                  {configStatus.supabase ? '✓' : '✗'}
                </span>
                <span className={configStatus.supabase ? 'text-green-700' : 'text-gray-700'}>
                  NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className={configStatus.openrouter ? 'text-green-600' : 'text-red-600'}>
                  {configStatus.openrouter ? '✓' : '✗'}
                </span>
                <span className={configStatus.openrouter ? 'text-green-700' : 'text-gray-700'}>
                  OPENROUTER_API_KEY
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className={configStatus.freepik ? 'text-green-600' : 'text-red-600'}>
                  {configStatus.freepik ? '✓' : '✗'}
                </span>
                <span className={configStatus.freepik ? 'text-green-700' : 'text-gray-700'}>
                  FREEPIK_API_KEY
                </span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-4">
              See <strong>DEPLOYMENT.md</strong> for setup instructions.
            </p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={!configStatus.supabase}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={!configStatus.supabase}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !configStatus.supabase}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
