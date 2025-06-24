"use client"
import { useState } from "react"
import type React from "react"
import { Search, Music, Heart, Play, Sparkles, Zap } from "lucide-react"

interface Song {
  id: number
  title: string
  artist: string
  album?: string
  genre: string
  year?: number
  popularity: number
}


interface SearchComponentProps {
  onSongLike?: (songId: number) => void
  likedSongs?: number[]
}

export default function SearchComponent({ onSongLike, likedSongs = [] }: SearchComponentProps) {
  console.log('🚀 SearchComponent loaded!')
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)

  const searchSongs = async () => {
    console.log('🔍 SEARCH CLICKED! Query:', query)
    console.log('Query length:', query.length)
    console.log('Query trimmed:', query.trim())
    console.log('Query trimmed length:', query.trim().length)
    
    if (!query.trim()) {
      console.log('❌ Query is empty, returning early')
      return
    }
  
    console.log('✅ Query is valid, proceeding with API call')
    setLoading(true)
    
    try {
      console.log('Making API call to:', `/api/songs/search?q=${encodeURIComponent(query)}`)
      
      const response = await fetch(`/api/songs/search?q=${encodeURIComponent(query)}`)
      console.log('Response status:', response.status)
      
      const songs = await response.json()
      console.log('Search results:', songs)
      
      setResults(songs)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchSongs()
    }
  }

  const handleLike = async (songId: number) => {
    console.log('🔥 LOVE BUTTON CLICKED! Song ID:', songId)
    try {
      const method = likedSongs.includes(songId) ? "DELETE" : "POST"
      await fetch(`/api/songs/${songId}/like`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1 }), // Mock user ID
      })
      onSongLike?.(songId)
    } catch (error) {
      console.error("Like error:", error)
    }
  }

  const getGenreColor = (genre: string) => {
    const colors = {
      Rock: "from-red-500 to-orange-500",
      Pop: "from-pink-500 to-purple-500",
      "Hip-Hop": "from-yellow-500 to-red-500",
      Jazz: "from-blue-500 to-indigo-500",
      Electronic: "from-cyan-500 to-blue-500",
      Classical: "from-purple-500 to-indigo-500",
    }
    return colors[genre as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  const popularSearches = [
    { name: "Queen", icon: "👑" },
    { name: "Rock", icon: "🎸" },
    { name: "Pop", icon: "🎵" },
    { name: "Hip-Hop", icon: "🎤" },
    { name: "Jazz", icon: "🎺" },
    { name: "Drake", icon: "🔥" },
    { name: "Taylor Swift", icon: "✨" },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Enhanced Search Section */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 mb-8 border border-white/20 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl shadow-xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Discover Amazing Music
            </h2>
          </div>
          <p className="text-gray-300 text-lg">Search through thousands of songs from every genre</p>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur opacity-30"></div>
          <div className="relative flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for songs, artists, or albums..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg transition-all duration-300 hover:bg-white/15"
              />
            </div>
            <button
              onClick={searchSongs}
              disabled={loading || !query.trim()}
              className="px-10 py-5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-2xl hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all duration-300 hover:scale-105 shadow-xl disabled:hover:scale-100 min-w-[140px]"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5" />
                  Search
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Popular Searches */}
        {!query && results.length === 0 && (
          <div className="text-center relative z-10">
            <p className="text-gray-400 mb-6 text-lg">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((search) => (
                <button
                  key={search.name}
                  onClick={() => setQuery(search.name)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-2xl text-sm transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 shadow-lg backdrop-blur-sm flex items-center gap-2"
                >
                  <span className="text-lg">{search.icon}</span>
                  {search.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Results */}
      {results.length > 0 && (
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-b border-white/20">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              Found {results.length} amazing songs
            </h3>
          </div>

          <div className="p-8">
            <div className="space-y-4">
              {results.map((song, index) => (
                <div
                  key={song.id}
                  className="group flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-[1.02] shadow-lg"
                >
                  <div className="flex items-center gap-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl text-white font-bold text-sm shadow-lg">
                      {index + 1}
                    </div>
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${getGenreColor(song.genre)} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}
                    >
                      <Play className="h-10 w-10 text-white ml-1" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-white text-xl group-hover:text-purple-300 transition-colors">
                        {song.title}
                      </h3>
                      <p className="text-gray-300 font-medium text-lg">{song.artist}</p>
                      {song.album && (
                        <p className="text-gray-500 text-sm">
                          {song.album} • {song.year}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-4 py-2 bg-gradient-to-r ${getGenreColor(song.genre)} text-white rounded-2xl text-sm font-medium shadow-lg`}
                    >
                      {song.genre}
                    </span>
                    <div className="text-center">
                      <div className="text-orange-400 font-bold text-xl">🔥</div>
                      <div className="text-gray-400 text-xs font-semibold">{song.popularity}</div>
                    </div>
                    <button
                      onClick={() => handleLike(song.id)}
                      className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                        likedSongs.includes(song.id)
                          ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20"
                      }`}
                    >
                      <Heart
                        className={`inline w-5 h-5 mr-2 ${likedSongs.includes(song.id) ? "fill-current animate-pulse" : ""}`}
                      />
                      {likedSongs.includes(song.id) ? "Loved" : "Love"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Empty State */}
      {query && results.length === 0 && !loading && (
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-20 text-center">
          <div className="w-28 h-28 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Music className="h-14 w-14 text-gray-300" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">No songs found</h3>
          <p className="text-gray-400 mb-8 text-lg">Try searching for a different song, artist, or genre</p>
          <button
            onClick={() => setQuery("")}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-2xl font-semibold hover:scale-105 transition-transform shadow-xl"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  )
}
