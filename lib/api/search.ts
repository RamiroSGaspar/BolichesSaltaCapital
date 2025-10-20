import { supabase } from '../supabase'

export async function searchItems(query: string) {
  const lowerQuery = query.toLowerCase().trim()

  if (!lowerQuery) return { boliches: [], tragos: [] }

  try {
    const [bolichesResult, tragosResult] = await Promise.all([
      supabase
        .from('boliches')
        .select('*')
        .or(`name.ilike.%${lowerQuery}%,barrio.ilike.%${lowerQuery}%,location.ilike.%${lowerQuery}%`)
        .limit(5),
      supabase
        .from('tragos')
        .select('*')
        .or(`name.ilike.%${lowerQuery}%,category.ilike.%${lowerQuery}%`)
        .limit(5)
    ])

    return {
      boliches: bolichesResult.data || [],
      tragos: tragosResult.data || []
    }
  } catch (error) {
    console.error(error)
    return { boliches: [], tragos: [] }
  }
}