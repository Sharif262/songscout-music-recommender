# 🎵 SongScout - Music Discovery Platform

A modern, full-stack music recommendation platform built with Next.js, TypeScript, and PostgreSQL. Features intelligent recommendations, real-time search, and a beautiful glassmorphism UI.

![SongScout Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.x-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue)

## ✨ Features

🔍 **Smart Search** - Find songs by title, artist, or album with real-time results  
❤️ **Like System** - Build your personal music collection with persistent storage  
🎯 **AI Recommendations** - Get personalized suggestions based on your music taste  
🎨 **Modern UI** - Dark theme with glassmorphism effects and smooth animations  
📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices  

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling with glassmorphism
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - RESTful API design
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Robust relational database

### Development
- **Hot Module Replacement** - Fast development experience
- **ESLint** - Code quality and consistency
- **Modern React Hooks** - useState, useEffect for state management

## 🏃‍♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/songscout-music-recommender.git
cd songscout-music-recommender

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Set up database
npx prisma db push
npx tsx prisma/seed.ts

# Start development server
npm run dev

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
