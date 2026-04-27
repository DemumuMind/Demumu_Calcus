'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mail, Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react'

const INTEREST_OPTIONS = [
  { id: 'finance', label: 'Финансы и кредиты' },
  { id: 'health', label: 'Здоровье и фитнес' },
  { id: 'cooking', label: 'Кулинария' },
  { id: 'construction', label: 'Строительство и ремонт' },
  { id: 'math', label: 'Математика и наука' },
  { id: 'new', label: 'Новые калькуляторы' },
]

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [frequency, setFrequency] = useState('weekly')
  const [interests, setInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const toggleInterest = useCallback((id: string) => {
    setInterests(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frequency, interests }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
        setInterests([])
      } else {
        setStatus('error')
        setMessage(data.error || 'Ошибка при подписке')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Ошибка при отправке. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }, [email, frequency, interests])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Подписка на обновления
        </CardTitle>
        <CardDescription>
          Получайте новые калькуляторы и полезные советы на email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Частота рассылки</Label>
            <Select value={frequency} onValueChange={(val) => setFrequency(val || 'weekly')}>
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Каждый день</SelectItem>
                <SelectItem value="weekly">Раз в неделю</SelectItem>
                <SelectItem value="monthly">Раз в месяц</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Интересы (необязательно)</Label>
            <div className="grid grid-cols-2 gap-2">
              {INTEREST_OPTIONS.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={interests.includes(option.id)}
                    onCheckedChange={() => toggleInterest(option.id)}
                  />
                  <Label htmlFor={option.id} className="text-sm font-normal cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
              <CheckCircle className="h-4 w-4" />
              <p className="text-sm">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{message}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !email}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Send className="h-4 w-4 mr-2" />
            )}
            Подписаться
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Отписаться можно в любой момент. Мы не передаём email третьим лицам.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
