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
    })
    .select()
  
  if (error) throw error
  return data
}