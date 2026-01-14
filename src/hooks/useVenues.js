import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

export function useVenues() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVenues()
  }, [])

  const fetchVenues = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setVenues(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { venues, loading, error, refetch: fetchVenues }
}
