import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, frequency = 'weekly', interests = [] } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Неверный email адрес' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('email_subscriptions')
      .select('*')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      if (existing.subscribed && !existing.unsubscribed_at) {
        return NextResponse.json(
          { message: 'Вы уже подписаны на рассылку' },
          { status: 200 }
        )
      }
      // Re-subscribe if previously unsubscribed
      const { error } = await supabase
        .from('email_subscriptions')
        .update({
          subscribed: true,
          frequency,
          interests,
          unsubscribed_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)

      if (error) throw error

      return NextResponse.json(
        { message: 'Подписка возобновлена!' },
        { status: 200 }
      )
    }

    // New subscription
    const { error } = await supabase.from('email_subscriptions').insert({
      email: email.toLowerCase(),
      frequency,
      interests,
      subscribed: true,
    })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'Вы уже подписаны на рассылку' },
          { status: 200 }
        )
      }
      throw error
    }

    // Send confirmation email (in real app, use Resend/Loops/ConvertKit)
    // await sendConfirmationEmail(email)

    return NextResponse.json(
      { message: 'Подписка оформлена! Проверьте email для подтверждения.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Ошибка при оформлении подписки' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email обязателен' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from('email_subscriptions')
      .update({
        subscribed: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email.toLowerCase())

    if (error) throw error

    return NextResponse.json(
      { message: 'Вы успешно отписались от рассылки' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Ошибка при отписке' },
      { status: 500 }
    )
  }
}
