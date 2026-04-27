import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Требуется авторизация' },
        { status: 401 }
      )
    }

    const { data: favorites, error } = await supabase
      .from('user_favorites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ favorites: favorites || [] })
  } catch (error) {
    console.error('Get favorites error:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении избранного' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Требуется авторизация' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { calculator_slug, calculator_title, category, subcategory } = body

    if (!calculator_slug || !calculator_title) {
      return NextResponse.json(
        { error: 'Обязательные поля: calculator_slug, calculator_title' },
        { status: 400 }
      )
    }

    // Check if already favorited
    const { data: existing } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('calculator_slug', calculator_slug)
      .single()

    if (existing) {
      return NextResponse.json(
        { message: 'Уже в избранном' },
        { status: 200 }
      )
    }

    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: user.id,
        calculator_slug,
        calculator_title,
        category: category || '',
        subcategory: subcategory || '',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { message: 'Добавлено в избранное', favorite: data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Add favorite error:', error)
    return NextResponse.json(
      { error: 'Ошибка при добавлении в избранное' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Требуется авторизация' },
        { status: 401 }
      )
    }

    const { calculator_slug } = await request.json()

    if (!calculator_slug) {
      return NextResponse.json(
        { error: 'Требуется calculator_slug' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('calculator_slug', calculator_slug)

    if (error) throw error

    return NextResponse.json(
      { message: 'Удалено из избранного' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Remove favorite error:', error)
    return NextResponse.json(
      { error: 'Ошибка при удалении из избранного' },
      { status: 500 }
    )
  }
}
