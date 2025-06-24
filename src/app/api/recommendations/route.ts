import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = parseInt(searchParams.get('userId') || '0')

  try {
    // Get user's liked songs
    const userLikes = await prisma.songLike.findMany({
      where: { userId },
      include: { song: true }
    })

    if (userLikes.length === 0) {
      // No likes yet - show popular songs
      const popularSongs = await prisma.song.findMany({
        orderBy: { popularity: 'desc' },
        take: 10
      })
      return NextResponse.json(popularSongs)
    }

    // Get user's favorite genres with proper typing
    const likedGenres: string[] = userLikes.map((like) => like.song.genre)
    const genreCounts: Record<string, number> = {}
    
    likedGenres.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1
    })

    // Find most liked genre with proper typing
    const genres = Object.keys(genreCounts)
    if (genres.length === 0) {
      return NextResponse.json([])
    }
    
    const topGenre = genres.reduce((a: string, b: string) => 
      genreCounts[a] > genreCounts[b] ? a : b
    )

    // Get liked song IDs to exclude with proper typing
    const likedSongIds: number[] = userLikes.map((like) => like.songId)


    // Recommend songs from favorite genre user hasn't liked
    const recommendations = await prisma.song.findMany({
      where: {
        genre: topGenre,
        id: { notIn: likedSongIds }
      },
      orderBy: { popularity: 'desc' },
      take: 10
    })

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error('Recommendations error:', error)
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 })
  }
}