'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'

export type { User }

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    if (typeof window === 'undefined') {
      // Server-side during build
      return null
    }
    // Client-side - throw error
    throw new Error('Supabase environment variables are not set')
  }
  
  return { url, key }
}

let clientInstance: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  // Singleton pattern to avoid creating multiple instances
  if (clientInstance) {
    return clientInstance
  }
  
  const env = getSupabaseEnv()
  
  if (!env) {
    // Return a mock client during build
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signUp: async () => ({ data: null, error: null }),
        signInWithPassword: async () => ({ data: null, error: null }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
          }),
        }),
      }),
    } as any
  }
  
  clientInstance = createBrowserClient(env.url, env.key)
  return clientInstance
}

export interface UserProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  email_notifications: boolean
  created_at: string
  updated_at: string
}

export interface UserFavorite {
  id: string
  user_id: string
  calculator_slug: string
  calculator_title: string
  category: string
  subcategory: string
  created_at: string
}

export interface EmailSubscription {
  id: string
  email: string
  subscribed: boolean
  frequency: 'daily' | 'weekly' | 'monthly'
  interests: string[]
  created_at: string
  confirmed_at: string | null
  unsubscribed_at: string | null
}

export interface SyncedHistory {
  id: string
  user_id: string
  calculator_slug: string
  calculator_title: string
  inputs: Record<string, string>
  results: Array<{ label: string; value: number | string }>
  url: string
  created_at: string
}
