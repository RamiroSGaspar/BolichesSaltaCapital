"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { getAllBoliches } from "@/lib/api/boliches"
import { getAllTragos } from "@/lib/api/tragos"

export function HeroSection() {
  const [stats, setStats] = useState({
    boliches: 0,
    tragos: 0
  })

  useEffect(() => {
    Promise.all([getAllBoliches(), getAllTragos()])
      .then(([b, t]) => {
        setStats({
          boliches: b.length,
          tragos: t.length
        })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute bottom-40 left-1/3 w-36 h-36 bg-accent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-primary/30">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-foreground">La vida nocturna de Salta en un solo lugar</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
            Descubrí la <span className="text-primary">noche salteña</span> al mejor precio
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Explorá los boliches de Salta Capital, compará precios de tragos y encontrá las mejores noches.
          </p>

            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">{stats.tragos}+</div>
              <div className="text-sm text-muted-foreground">Tragos</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Actualizado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}