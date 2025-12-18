import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page') || '1';

  if (!keyword) {
    return NextResponse.json(
      { error: 'Keyword is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(keyword)}&page=${page}`,
      {
        headers: {
          'User-Agent': 'KanjiKantan Dictionary'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Jisho API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dictionary API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dictionary data' },
      { status: 500 }
    );
  }
}
