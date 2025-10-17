import { supabase } from '../supabase'
import type { Trago } from '../data'

export async function getAllTragos() {
  const { data, error } = await supabase
    .from('tragos')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data as Trago[]
}

export async function createTrago(trago: any) {
  const { data, error } = await supabase
    .from('tragos')
    .insert([trago])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updateTrago(id: string, trago: any) {
  const { data, error } = await supabase
    .from('tragos')
    .update(trago)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteTrago(id: string) {
  const { error } = await supabase
    .from('tragos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}