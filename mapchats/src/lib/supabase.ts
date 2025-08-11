import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hwlefmwmwwxnwcxqnxzc.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key-for-development'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)