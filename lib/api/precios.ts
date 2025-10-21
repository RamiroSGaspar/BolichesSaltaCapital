import { supabase } from '../supabase'

export async function getAllPrecios() {
  const { data, error } = await supabase
    .from('precios_por_boliche')
    .select('*')
  
  if (error) throw error
  return data
}

export async function updatePrecio(bolicheId: string, tragoId: string, precio: number) {
  const { data, error } = await supabase
    .from('precios_por_boliche')
    .upsert({ 
      boliche_id: bolicheId, 
      trago_id: tragoId, 
      precio,
      disponible: true 
    }, { 
      onConflict: 'boliche_id,trago_id' 
    })
    .select()
  
  if (error) throw error
  return data
}

export async function getPreciosByBoliche(bolicheId: string) {
  const { data, error } = await supabase
    .from('precios_por_boliche')
    .select('*, tragos(*)')
    .eq('boliche_id', bolicheId)
    .eq('disponible', true)
  
  if (error) throw error
  return data
}