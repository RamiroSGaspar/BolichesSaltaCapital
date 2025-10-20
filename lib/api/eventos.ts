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

export async function getEventoById(id: string) {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) return null
  return {...data, fecha: new Date(data.fecha)} as Evento
}

export async function getEventosByBoliche(bolicheId: string) {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('boliche_id', bolicheId)
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

export async function updateEvento(id: string, evento: any) {
  const { data, error } = await supabase
    .from('eventos')
    .update(evento)
    .eq('id', id)
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