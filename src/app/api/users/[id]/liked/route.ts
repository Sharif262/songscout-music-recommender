import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const userId = parseInt(id)

  try {
    const likedSongs = await prisma.songLike.findMany({
      where: { userId },
      include: { song: true },
      orderBy: { likedAt: 'desc' }
    })

    return NextResponse.json(likedSongs)
  } catch (error) {
    console.error('Fetch liked songs error:', error)
    return NextResponse.json({ error: 'Failed to fetch liked songs' }, { status: 500 })
  }
}