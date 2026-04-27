'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { Heart, Loader2 } from 'lucide-react'
import { AuthModalControlled } from './auth-modal'

interface FavoriteButtonProps {
  calculatorSlug: string
  calculatorTitle: string
  category?: string
  subcategory?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export function FavoriteButton({
  calculatorSlug,
  calculatorTitle,
  category = '',
  subcategory = '',
  variant = 'ghost',
  size = 'icon',
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const supabase = createClient()

  // Check auth status and favorite status
  useEffect(() => {
    const checkStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)

      if (user) {
        const { data: favorite } = await supabase
          .from('user_favorites')
          .select('id')
          .eq('calculator_slug', calculatorSlug)
          .single()

        setIsFavorite(!!favorite)
      }
    }

    checkStatus()
  }, [calculatorSlug, supabase.auth, supabase])

  const toggleFavorite = useCallback(async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setLoading(true)

    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch('/api/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ calculator_slug: calculatorSlug }),
        })

        if (response.ok) {
          setIsFavorite(false)
        }
      } else {
        // Add to favorites
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            calculator_slug: calculatorSlug,
            calculator_title: calculatorTitle,
            category,
            subcategory,
          }),
        })

        if (response.ok) {
          setIsFavorite(true)
        }
      }
    } catch (error) {
      console.error('Favorite toggle error:', error)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated, isFavorite, calculatorSlug, calculatorTitle, category, subcategory])

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={toggleFavorite}
        disabled={loading}
        className={isFavorite ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground'}
        title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        )}
        <span className="sr-only">
          {isFavorite ? 'В избранном' : 'Добавить в избранное'}
        </span>
      </Button>

      {!isAuthenticated && (
        <AuthModalControlled open={showAuthModal} onOpenChange={setShowAuthModal} />
      )}
    </>
  )
}
