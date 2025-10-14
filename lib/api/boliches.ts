import { supabase } from '../supabase'
import type { Boliche } from '../data'

export async function getAllBoliches() {
  const { data, error } = await supabase
    .from('boliches')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data as Boliche[]
}

export async function getBolicheById(id: string) {
  const { data, error } = await supabase
    .from('boliches')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Boliche
}

export async function createBoliche(boliche: Omit<Boliche, 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('boliches')
    .insert([boliche])
    .select()
    .single()
  
  if (error) throw error
  return data as Boliche
}

export async function updateBoliche(id: string, updates: Partial<Boliche>) {
  const { data, error } = await supabase
    .from('boliches')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Boliche
}

export async function deleteBoliche(id: string) {
  const { error } = await supabase
    .from('boliches')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}