"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wine, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      console.log('Response:', data, 'Status:', res.status)
      if (res.ok) { router.push('/admin/dashboard'); router.refresh() } else { setError(data.error || 'Credenciales incorrectas') }
    } catch (err) { setError('Error al iniciar sesión') } finally { setIsLoading(false) }
  }

  return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4"><Card className="w-full max-w-md"><CardHeader className="space-y-4 text-center"><div className="flex justify-center"><div className="p-3 rounded-full bg-purple-600"><Wine className="h-8 w-8 text-white" /></div></div><CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle><CardDescription>Ingresá tus credenciales para acceder</CardDescription></CardHeader><CardContent><form onSubmit={handleLogin} className="space-y-4"><div className="space-y-2"><Label htmlFor="email">Email</Label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="email" type="email" placeholder="admin@tragossalta.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required /></div></div><div className="space-y-2"><Label htmlFor="password">Contraseña</Label><div className="relative"><Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required /></div></div>{error && <div className="bg-red-500/20 border border-red-500 text-white px-4 py-2 rounded-lg text-sm">{error}</div>}<Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>{isLoading ? "Ingresando..." : "Ingresar"}</Button></form></CardContent></Card></div>)
}