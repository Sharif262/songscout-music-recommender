import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const songs = [
  { title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", genre: "Rock", year: 1975, popularity: 95 },
  { title: "Shape of You", artist: "Ed Sheeran", album: "÷", genre: "Pop", year: 2017, popularity: 90 },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", album: "Led Zeppelin IV", genre: "Rock", year: 1971, popularity: 90 },
  { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", genre: "Pop", year: 2019, popularity: 88 },
  { title: "God's Plan", artist: "Drake", album: "Scorpion", genre: "Hip-Hop", year: 2018, popularity: 87 },
  { title: "Sweet Child O' Mine", artist: "Guns N' Roses", album: "Appetite for Destruction", genre: "Rock", year: 1987, popularity: 85 },
  { title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights", genre: "Pop", year: 2022, popularity: 85 },
  { title: "HUMBLE.", artist: "Kendrick Lamar", album: "DAMN.", genre: "Hip-Hop", year: 2017, popularity: 82 },
  { title: "Smells Like Teen Spirit", artist: "Nirvana", album: "Nevermind", genre: "Rock", year: 1991, popularity: 88 },
  { title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", genre: "Pop", year: 1982, popularity: 92 }
]

async function main() {
  console.log('Seeding database...')
  
  for (const song of songs) {
    await prisma.song.create({
      data: song
    })
  }
  
  console.log('Seeding completed!')
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })