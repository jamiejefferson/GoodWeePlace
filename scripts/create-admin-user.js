/**
 * One-time script to create an admin user in Supabase
 * 
 * Run this with: node scripts/create-admin-user.js
 * 
 * You'll need to add SUPABASE_SERVICE_ROLE_KEY to your .env file
 * Find it in Supabase Dashboard > Settings > API > service_role key (secret)
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Error: Missing environment variables')
  console.error('Please add SUPABASE_SERVICE_ROLE_KEY to your .env file')
  console.error('\nFind it in: Supabase Dashboard > Settings > API > service_role key (secret)')
  process.exit(1)
}

// Create admin client with service role key
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  const email = 'jj@eqtr.com'
  const password = 'GWP2026!'

  try {
    console.log(`Creating admin user: ${email}...`)
    
    // Check if user already exists
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = users?.find(u => u.email === email)
    
    if (existingUser) {
      console.log(`User ${email} already exists. Updating password...`)
      const { error } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        { password }
      )
      if (error) throw error
      console.log('✓ Password updated successfully!')
    } else {
      // Create new user
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })
      if (error) throw error
      console.log('✓ Admin user created successfully!')
    }
    
    console.log(`\nLogin credentials:`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log(`\nAccess admin at: /admin`)
    
  } catch (error) {
    console.error('Error:', error.message)
    process.exit(1)
  }
}

createAdminUser()
