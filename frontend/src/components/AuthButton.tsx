'use client'

import { supabase } from '@/lib/supabase'
import { Button } from './ui/button'

export default function AuthButton() {
  const supabaseClient = supabase

  const handleSignOut = async () => {
    await supabaseClient.auth.signOut()
    window.location.href = '/auth/signin'
  }

  return (
    <Button onClick={handleSignOut}>
      Sign Out
    </Button>
  )
} 