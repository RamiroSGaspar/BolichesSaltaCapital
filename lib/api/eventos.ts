import { supabase } from '../supabase'
import type { Evento } from '../data'

export async function getAllEventos() {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('fecha', { ascending: true })
  
  if (error) throw error
  return data.map(e => ({...e, fecha: new Date(e.fecha)})) as Evento[]
}

export async function createEvento(evento: any) {
  const { data, error } = await supabase
    .from('eventos')
    .insert([evento])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function deleteEvento(id: string) {
  const { error } = await supabase
    .from('eventos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}