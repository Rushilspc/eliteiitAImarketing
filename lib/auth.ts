import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function getServerSession() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  const cookieStore = await cookies()
  const authCookie = cookieStore.get('sb-access-token')

  if (!authCookie) {
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const { data: { user } } = await supabase.auth.getUser(authCookie.value)
  
  return user
}
