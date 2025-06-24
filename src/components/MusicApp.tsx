"use client"
import { useState, useEffect } from 'react'
import { Music, Search, Heart, TrendingUp, User, Sparkles, Play, Volume2 } from 'lucide-react'
import SearchComponent from './SearchComponent'
// Mock user ID for development
const MOCK_USER_ID = 1

interface Song {
  id: number
  title: string
  artist: string
  album?: string
  genre: string
  year?: number
  popularity: number
}

export default function ModernMusicApp() {
  const [activeTab, setActiveTab] = useState('search')
  const [likedSongs, setLikedSongs] = useState<number[]>([])
  const [likedSongsDetails, setLikedSongsDetails] = useState<Song[]>([])
  const [recommendations, setRecommendations] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchLikedSongs()
  }, [])

  useEffect(() => {
    if (activeTab === 'recommendations') {
      fetchRecommendations()
    }
  }, [activeTab, likedSongs])

  const fetchLikedSongs = async () => {
    try {
      const response = await fetch(`/api/users/${MOCK_USER_ID}/liked`)
      const data = await response.json()
      setLikedSongs(data.map((like) => like.songId))
      setLikedSongsDetails(data.map((like) => like.song))
    } catch (error) {
      console.error('Failed to fetch liked songs:', error)
    }
  }

  const fetchRecommendations = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/recommendations?userId=${MOCK_USER_ID}`)
      const songs = await response.json()
      setRecommendations(songs)
    } catch (error) {
      console.error('Failed to fetch recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSongLike = (songId: number) => {
    if (likedSongs.includes(songId)) {
      setLikedSongs(prev => prev.filter(id => id !== songId))
      setLikedSongsDetails(prev => prev.filter(song => song.id !== songId))
    } else {
      setLikedSongs(prev => [...prev, songId])
      fetchLikedSongs()
    }
  }

  const handleUnlike = async (songId: number) => {
    try {
      await fetch(`/api/songs/${songId}/like`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: MOCK_USER_ID })
      })
      handleSongLike(songId)
    } catch (error) {
      console.error('Unlike error:', error)
    }
  }

  const getGenreColor = (genre: string) => {
    const colors = {
      'Rock': 'from-red-500 to-orange-500',
      'Pop': 'from-pink-500 to-purple-500', 
      'Hip-Hop': 'from-yellow-500 to-red-500',
      'Jazz': 'from-blue-500 to-indigo-500',
      'Electronic': 'from-cyan-500 to-blue-500',
      'Classical': 'from-purple-500 to-indigo-500'
    }
    return colors[genre as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-4000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-300 rounded-full opacity-30 animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-25 animate-bounce animation-delay-5000"></div>
      </div>

      {/* Modern Header with enhanced glassmorphism */}
      <header className="relative bg-white/10 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg">
                  <Sparkles className="w-3 h-3 text-white ml-1 mt-1" />
                </div>
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 opacity-20 animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  SongScout
                </h1>
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Discover your next favorite song
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="px-5 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
                <span className="text-white text-sm font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                  {likedSongs.length}
                </span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex space-x-3 bg-white/10 backdrop-blur-2xl rounded-3xl p-3 mb-8 border border-white/20 shadow-2xl">
          {[
            { id: 'search', icon: Search, label: 'Discover', gradient: 'from-purple-500 to-pink-500', count: null },
            { id: 'recommendations', icon: TrendingUp, label: 'For You', gradient: 'from-cyan-500 to-blue-500', count: null },
            { id: 'liked', icon: Heart, label: 'Loved', gradient: 'from-pink-500 to-red-500', count: likedSongs.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 flex-1 justify-center group relative overflow-hidden ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-2xl transform scale-105`
                  : 'text-gray-300 hover:text-white hover:bg-white/15 hover:scale-102'
              }`}
            >
              {/* Animated background for active tab */}
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              )}
              
              <tab.icon className={`h-5 w-5 transition-transform group-hover:scale-110 relative z-10 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
              <span className="relative z-10">{tab.label}</span>
              {tab.count !== null && tab.count > 0 && (
                <span className={`relative z-10 px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'search' && (
          <SearchComponent 
            onSongLike={handleSongLike}
            likedSongs={likedSongs}
          />
        )}

        {activeTab === 'recommendations' && (
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-8 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-b border-white/20">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl shadow-xl">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  Curated Just for You
                </h2>
                <p className="text-gray-300 mt-3 text-lg">AI-powered recommendations based on your musical taste</p>
              </div>
              <div className="p-8">
                {loading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl"></div>
                          <div className="flex-1">
                            <div className="h-6 bg-white/20 rounded-lg w-3/4 mb-3"></div>
                            <div className="h-4 bg-white/10 rounded-lg w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recommendations.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <Heart className="h-14 w-14 text-white animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Start Your Musical Journey</h3>
                    <p className="text-gray-400 mb-8 text-lg">Like some songs to get personalized AI recommendations!</p>
                    <button 
                      onClick={() => setActiveTab('search')} 
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:scale-105 transition-transform shadow-xl"
                    >
                      <Search className="inline w-5 h-5 mr-2" />
                      Explore Music
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendations.map((song, index) => (
                      <div key={song.id} className="group flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-[1.02] shadow-lg">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl text-white font-bold text-sm shadow-xl">
                            #{index + 1}
                          </div>
                          <div className={`w-20 h-20 bg-gradient-to-br ${getGenreColor(song.genre)} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                            <Play className="h-10 w-10 text-white ml-1" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-xl group-hover:text-purple-300 transition-colors">{song.title}</h4>
                            <p className="text-gray-300 text-lg">{song.artist}</p>
                            {song.album && (
                              <p className="text-gray-500 text-sm">{song.album} • {song.year}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-4 py-2 bg-gradient-to-r ${getGenreColor(song.genre)} text-white rounded-2xl text-sm font-medium shadow-lg`}>
                            {song.genre}
                          </span>
                          <div className="text-orange-400 font-semibold text-lg">
                            🔥 {song.popularity}
                          </div>
                          <button
                            onClick={() => handleSongLike(song.id)}
                            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                              likedSongs.includes(song.id)
                                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/20'
                            }`}
                          >
                            <Heart className={`inline w-5 h-5 mr-2 ${likedSongs.includes(song.id) ? 'fill-current animate-pulse' : ''}`} />
                            {likedSongs.includes(song.id) ? 'Loved' : 'Love'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-8 bg-gradient-to-r from-pink-500/20 to-red-500/20 border-b border-white/20">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl shadow-xl">
                    <Heart className="h-7 w-7 text-white" />
                  </div>
                  Your Loved Songs
                </h2>
                <p className="text-gray-300 mt-3 text-lg">Your personal collection of favorite tracks</p>
              </div>
              <div className="p-8">
                {likedSongsDetails.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-28 h-28 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <Heart className="h-14 w-14 text-white animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">No loved songs yet</h3>
                    <p className="text-gray-400 mb-8 text-lg">Start building your personal music collection!</p>
                    <button 
                      onClick={() => setActiveTab('search')} 
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl font-semibold hover:scale-105 transition-transform shadow-xl"
                    >
                      <Search className="inline w-5 h-5 mr-2" />
                      Find Music
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {likedSongsDetails.map((song) => (
                      <div key={song.id} className="group flex items-center gap-6 p-6 bg-white/5 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/30 hover:scale-[1.02] shadow-lg">
                        <div className={`w-20 h-20 bg-gradient-to-br ${getGenreColor(song.genre)} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                          <Play className="h-10 w-10 text-white ml-1" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-xl group-hover:text-pink-300 transition-colors">{song.title}</h4>
                          <p className="text-gray-300 text-lg">{song.artist}</p>
                          {song.album && (
                            <p className="text-gray-500 text-sm">{song.album} • {song.year}</p>
                          )}
                        </div>
                        <span className={`px-4 py-2 bg-gradient-to-r ${getGenreColor(song.genre)} text-white rounded-2xl text-sm font-medium shadow-lg`}>
                          {song.genre}
                        </span>
                        <button
                          onClick={() => handleUnlike(song.id)}
                          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-red-500 hover:to-pink-500 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                        >
                          <Heart className="inline w-5 h-5 mr-2 fill-current group-hover:animate-pulse" />
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
