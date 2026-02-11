#!/bin/bash

# Tyne Tees Survey System - Local Development Setup
# This script sets up Supabase locally for development

set -e

echo "🏗️  Tyne Tees Survey System - Local Setup"
echo "=========================================="

# Check for Homebrew
if ! command -v brew &> /dev/null; then
    echo "❌ Homebrew not found. Install from https://brew.sh"
    exit 1
fi

# Check for Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker not found. Installing via Homebrew..."
    brew install --cask docker
else
    echo "✅ Docker found"
fi

# Install Supabase CLI
if ! command -v supabase &> /dev/null; then
    echo "📦 Installing Supabase CLI..."
    brew install supabase/tap/supabase
else
    echo "✅ Supabase CLI found"
fi

echo ""
echo "📋 Options:"
echo "   1) Docker Compose (simple, no Supabase CLI)"
echo "   2) Supabase CLI (full local Supabase)"
echo "   3) Just run the web app (mock data)"

read -p "Choose option (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "🐳 Starting Supabase with Docker Compose..."
        docker-compose up -d

        echo ""
        echo "⏳ Waiting for database to be ready..."
        sleep 5

        echo ""
        echo "🔧 Running database migrations..."
        # Run migrations against local PostgreSQL
        PGPASSWORD=postgres psql -h localhost -U postgres -d postgres \
            -f supabase/migrations/001_initial_schema.sql

        echo ""
        echo "✅ Setup complete!"
        echo ""
        echo "📝 Access points:"
        echo "   Database: localhost:5432 (postgres/postgres)"
        echo "   Admin UI: http://localhost:8080"
        echo ""
        echo "🚀 Next: Run the web app"
        echo "   cd survey-system"
        echo "   npm install"
        echo "   npm run dev"
        ;;
    2)
        echo ""
        echo "🚀 Starting Supabase locally with CLI..."
        supabase start

        echo ""
        echo "✅ Supabase local started!"
        echo ""
        echo "📝 Access points:"
        echo "   API: http://localhost:54321"
        echo "   Studio: http://localhost:54323"
        echo "   DB: localhost:54322"
        echo ""
        echo "🔑 Local anon key:"
        supabase status --show-keys
        ;;
    3)
        echo ""
        echo "🚀 Running web app with mock data..."
        echo ""
        echo "✅ No database needed - all data is sample/demo"
        echo ""
        echo "📝 The app will work but data won't persist between sessions"
        ;;
esac

echo ""
echo "🌐 Once running, open: http://localhost:3000"
