import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../../lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const songId = parseInt(id)
  const { userId } = await request.json()

  try {
    const like = await prisma.songLike.create({
      data: { userId, songId }
    })
    return NextResponse.json(like)
  } catch (error) {
    console.error('Like error:', error)
    return NextResponse.json({ error: 'Failed to like song' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const songId = parseInt(id)
  const { userId } = await request.json()

  try {
    await prisma.songLike.deleteMany({
      where: { userId, songId }
    })
    return NextResponse.json({ message: 'Song unliked' })
  } catch (error) {
    console.error('Unlike error:', error)
    return NextResponse.json({ error: 'Failed to unlike song' }, { status: 500 })
  }
}