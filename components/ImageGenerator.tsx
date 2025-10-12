'use client'

import { useState } from 'react'
import axios from 'axios'
import { supabase } from '@/lib/supabase'

export default function ImageGenerator() {
  const [idea, setIdea] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError('Please enter an image idea')
      return
    }

    setLoading(true)
    setError('')
    setEnhancedPrompt('')
    setImageUrl('')

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

      const response = await axios.post('/api/image', {
        imageDescription: idea
      }, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      setEnhancedPrompt(response.data.enhancedPrompt)
      setImageUrl(response.data.imageUrl)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate image')
    } finally {
      setLoading(false)
    }
  }

  const openChatGPT = () => {
    const url = `https://chat.openai.com/?q=${encodeURIComponent(enhancedPrompt)}`
    window.open(url, '_blank')
  }

  const openGemini = () => {
    const url = `https://gemini.google.com/app?q=${encodeURIComponent(enhancedPrompt)}`
    window.open(url, '_blank')
  }

  const downloadImage = () => {
    if (imageUrl.startsWith('data:')) {
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = 'eliteiit-marketing-image.png'
      link.click()
    } else {
      window.open(imageUrl, '_blank')
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Image Generator</h2>
      <p className="text-gray-600 mb-6">Create marketing images with AI-enhanced prompts</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marketing Image Idea
          </label>
          <input
            type="text"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g., 5th grade students in math class"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {enhancedPrompt && (
          <div className="mt-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <p className="text-sm font-medium text-gray-700 mb-2">Enhanced Prompt:</p>
              <p className="text-gray-900 text-sm">{enhancedPrompt}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={openChatGPT}
                className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 font-medium"
              >
                Open in ChatGPT
              </button>
              <button
                onClick={openGemini}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 font-medium"
              >
                Open in Gemini
              </button>
            </div>
          </div>
        )}

        {imageUrl && (
          <div className="mt-4 space-y-3">
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Generated marketing image" 
                className="w-full h-auto"
              />
            </div>
            <button
              onClick={downloadImage}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
