import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Example function to fetch data from a table
export async function fetchFromTable(tableName: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
  
  if (error) {
    console.error('Error fetching data:', error)
    throw error
  }
  
  return data
}

// Example function to insert data into a table
export async function insertIntoTable(tableName: string, data: any) {
  const { data: result, error } = await supabase
    .from(tableName)
    .insert([data])
    .select()
  
  if (error) {
    console.error('Error inserting data:', error)
    throw error
  }
  
  return result
}
