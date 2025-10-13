"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Wine, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { searchItems } from "@/lib/data"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState<{ boliches: any[]; tragos: any[] }>({ boliches: [], tragos: [] })
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = searchItems(searchQuery)
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }, [searchQuery])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectBoliche = (id: string) => {
    router.push(`/boliche/${id}`)
    setSearchQuery("")
    setShowResults(false)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchResults.boliches.length > 0) {
      handleSelectBoliche(searchResults.boliches[0].id)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Wine className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-foreground">Tragos Salta</span>
          </a>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8" ref={searchRef}>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar tragos o boliches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />

              {showResults && (searchResults.boliches.length > 0 || searchResults.tragos.length > 0) && (
                <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-2xl max-h-96 overflow-y-auto">
                  {searchResults.boliches.length > 0 && (
                    <div className="p-2">
                      <p className="text-xs font-semibold text-muted-foreground px-3 py-2">BOLICHES</p>
                      {searchResults.boliches.map((boliche) => (
                        <button
                          key={boliche.id}
                          onClick={() => handleSelectBoliche(boliche.id)}
                          className="w-full text-left px-3 py-2 hover:bg-secondary rounded-md transition-colors"
                        >
                          <p className="font-medium text-foreground">{boliche.name}</p>
                          <p className="text-sm text-muted-foreground">{boliche.nightTheme}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.tragos.length > 0 && (
                    <div className="p-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground px-3 py-2">TRAGOS</p>
                      {searchResults.tragos.slice(0, 5).map((trago) => (
                        <div key={trago.id} className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                          <p className="font-medium text-foreground">{trago.name}</p>
                          <p className="text-sm text-accent">${trago.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#inicio" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="/#boliches" className="text-foreground hover:text-primary transition-colors">
              Boliches
            </a>
            <a href="/eventos" className="text-foreground hover:text-primary transition-colors">
              Eventos y Fiestas
            </a>
            <a href="/precios" className="text-foreground hover:text-primary transition-colors">
              Comparador de Precios
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar tragos o boliches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />

              {showResults && (searchResults.boliches.length > 0 || searchResults.tragos.length > 0) && (
                <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50">
                  {searchResults.boliches.length > 0 && (
                    <div className="p-2">
                      <p className="text-xs font-semibold text-muted-foreground px-3 py-2">BOLICHES</p>
                      {searchResults.boliches.map((boliche) => (
                        <button
                          key={boliche.id}
                          onClick={() => handleSelectBoliche(boliche.id)}
                          className="w-full text-left px-3 py-2 hover:bg-secondary rounded-md transition-colors"
                        >
                          <p className="font-medium text-foreground">{boliche.name}</p>
                          <p className="text-sm text-muted-foreground">{boliche.nightTheme}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {searchResults.tragos.length > 0 && (
                    <div className="p-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground px-3 py-2">TRAGOS</p>
                      {searchResults.tragos.slice(0, 5).map((trago) => (
                        <div key={trago.id} className="px-3 py-2 hover:bg-secondary rounded-md transition-colors">
                          <p className="font-medium text-foreground">{trago.name}</p>
                          <p className="text-sm text-accent">${trago.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <a
              href="/#inicio"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </a>
            <a
              href="/#boliches"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Boliches
            </a>
            <a
              href="/eventos"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Eventos y Fiestas
            </a>
            <a
              href="/precios"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Comparador de Precios
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
