'use client'

import { useState } from 'react'
import axios from 'axios'
import { supabase } from '@/lib/supabase'

export default function MessageCreator() {
  const [idea, setIdea] = useState('')
  const [platform, setPlatform] = useState('whatsapp')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Please enter a campaign idea')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (!supabase) {
        setError('Application not configured. Please check environment variables.')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setError('Not authenticated. Please login again.')
        return
      }

      const response = await axios.post('/api/message', {
        promotionalIdea: idea,
        messageType: platform
      }, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      setMessage(response.data.message)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate message')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message)
    alert('Message copied to clipboard!')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Message Creator</h2>
      <p className="text-gray-600 mb-6">Generate promotional WhatsApp/SMS marketing messages</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Idea
          </label>
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., 20% off all courses for Diwali"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
            <option value="interakt">Interakt</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Generating...' : 'Generate Message'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 space-y-3">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Generated Message:</p>
              <p className="text-gray-900 whitespace-pre-wrap">{message}</p>
            </div>
            <button
              onClick={handleCopy}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium"
            >
              Copy Message
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
