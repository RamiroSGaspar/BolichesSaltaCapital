import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@boliches.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')
      
      cookies().set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}