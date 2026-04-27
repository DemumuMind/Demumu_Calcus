import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

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

    const { entries } = await request.json()

    if (!Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json(
        { error: 'Требуется массив entries' },
        { status: 400 }
      )
    }

    // Insert or update history entries
    const { data, error } = await supabase
      .from('user_history')
      .upsert(
        entries.map((entry: any) => ({
          user_id: user.id,
          calculator_slug: entry.calculator_slug,
          calculator_title: entry.calculator_title,
          inputs: entry.inputs,
          results: entry.results,
          url: entry.url,
          created_at: entry.created_at || new Date().toISOString(),
        })),
        { onConflict: 'id' }
      )

    if (error) throw error

    return NextResponse.json(
      { message: 'История синхронизирована', synced: entries.length },
      { status: 200 }
    )
  } catch (error) {
    console.error('Sync history error:', error)
    return NextResponse.json(
      { error: 'Ошибка при синхронизации истории' },
      { status: 500 }
    )
  }
}

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

    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '50')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    const { data: history, error } = await supabase
      .from('user_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ history: history || [] })
  } catch (error) {
    console.error('Get history error:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении истории' },
      { status: 500 }
    )
  }
}
