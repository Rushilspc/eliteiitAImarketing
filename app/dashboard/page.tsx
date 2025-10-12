'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import MessageCreator from '@/components/MessageCreator'
import ImageGenerator from '@/components/ImageGenerator'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) {
        router.push('/login')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
      } else {
        setUser(session.user)
        setLoading(false)
      }
    }

    checkUser()

    if (!supabase) return

    const { data: authListener } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-blue-600 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-blue-600">ELITEIIT Marketing Tools</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <MessageCreator />
          <ImageGenerator />
        </div>
      </main>
    </div>
  )
}
