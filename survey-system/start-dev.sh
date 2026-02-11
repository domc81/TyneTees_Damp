#!/bin/bash

# ==============================================================================
# Tyne Tees Survey System - One-Command Setup
# ==============================================================================
# This script installs all dependencies, sets up the database,
# runs migrations, and starts the development server.
#
# Usage: ./start-dev.sh
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_step() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# ==============================================================================
# STEP 0: PREREQUISITES CHECK
# ==============================================================================
print_step "Step 0: Checking Prerequisites"

# Check Docker
if ! command -v docker &> /dev/null; then
    print_error "Docker not found. Please install Docker Desktop first:"
    echo "  https://www.docker.com/products/docker-desktop/"
    exit 1
fi
print_success "Docker found"

# Check if Docker is running
if ! docker info &> /dev/null; then
    print_error "Docker is not running. Please start Docker Desktop first."
    exit 1
fi
print_success "Docker is running"

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js not found. Please install Node.js first:"
    echo "  https://nodejs.org/"
    exit 1
fi
print_success "Node.js found ($(node --version))"

# ==============================================================================
# STEP 1: NAVIGATE TO PROJECT
# ==============================================================================
print_step "Step 1: Setting Up Project"

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"
print_success "Working directory: $SCRIPT_DIR"

# ==============================================================================
# STEP 2: INSTALL DEPENDENCIES
# ==============================================================================
print_step "Step 2: Installing Dependencies"

if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed (skipping)"
fi

# ==============================================================================
# STEP 3: START DATABASE
# ==============================================================================
print_step "Step 3: Starting Database (PostgreSQL)"

# Check if container is already running
if docker ps --format '{{.Names}}' | grep -q "tynetees-postgres"; then
    print_success "PostgreSQL container already running"
else
    # Check if container exists but stopped
    if docker ps -a --format '{{.Names}}' | grep -q "tynetees-postgres"; then
        echo "Starting existing PostgreSQL container..."
        docker start tynetees-postgres
        print_success "PostgreSQL container started"
    else
        echo "Creating new PostgreSQL container..."
        docker run -d \
            --name tynetees-postgres \
            -e POSTGRES_USER=postgres \
            -e POSTGRES_PASSWORD=postgres \
            -e POSTGRES_DB=postgres \
            -p 5432:5432 \
            -v tynetees_postgres_data:/var/lib/postgresql/data \
            postgres:15
        print_success "PostgreSQL container created and started"
    fi
fi

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 3

# Test connection
for i in {1..10}; do
    if PGPASSWORD=postgres psql -h localhost -U postgres -d postgres -c "SELECT 1" &> /dev/null; then
        print_success "Database is ready"
        break
    fi
    if [ $i -eq 10 ]; then
        print_error "Database failed to start. Check Docker logs: docker logs tynetees-postgres"
        exit 1
    fi
    echo "  Waiting... ($i/10)"
    sleep 2
done

# ==============================================================================
# STEP 4: RUN MIGRATIONS
# ==============================================================================
print_step "Step 4: Running Database Migrations"

echo "Creating database schema..."
PGPASSWORD=postgres psql -h localhost -U postgres -d postgres \
    -f supabase/migrations/001_initial_schema.sql \
    -q 2>/dev/null || true

print_success "Database schema created"

# ==============================================================================
# STEP 5: SEED SAMPLE DATA
# ==============================================================================
print_step "Step 5: Seeding Sample Data"

# Insert sample projects for testing
PGPASSWORD=postgres psql -h localhost -U postgres -d postgres << 'EOF'
-- Clear existing demo data
DELETE FROM line_items;
DELETE FROM sections;
DELETE FROM photos;
DELETE FROM quotations;
DELETE FROM projects;

-- Insert sample projects
INSERT INTO projects (id, project_number, client_name, client_email, client_phone, site_address, site_city, site_county, site_postcode, survey_type, status, weather_conditions, survey_date, notes, internal_reference)
VALUES
    ('demo-1', 'TT-2026-0001', 'Smith Residence', 'smith@email.com', '01234 567890', '12 Victoria Street', 'Newcastle upon Tyne', 'Tyne and Wear', 'NE1 4LP', 'damp', 'in_progress', 'Dry', '2026-02-05', 'Rising damp to ground floor walls', 'SMITH-001'),
    ('demo-2', 'TT-2026-0002', 'Johnson Property', 'johnson@email.com', '', '45 Riverside Drive', 'Sunderland', 'Tyne and Wear', 'SR1 1AB', 'timber', 'pending_review', 'Overcast', '2026-02-04', 'Timber survey required', 'JOHNSON-001'),
    ('demo-3', 'TT-2026-0003', 'Williams Flat', '', '', 'Flat 3, 88 High Street', 'Middlesbrough', 'North Yorkshire', 'TS1 1XX', 'condensation', 'draft', 'Humid', '2026-02-03', 'Condensation issues reported', 'WILLIAMS-001');

-- Insert sample sections for project 1
INSERT INTO sections (id, project_id, name, display_order, markup_percentage)
VALUES
    ('sec-1', 'demo-1', 'Preparatory Work', 1, 0),
    ('sec-2', 'demo-1', 'DPC Installation', 2, 0),
    ('sec-3', 'demo-1', 'Wall Membrane System', 3, 0),
    ('sec-4', 'demo-1', 'Plastering & Finishing', 4, 0);

-- Insert sample line items
INSERT INTO line_items (id, section_id, project_id, item_name, category, length, width, quantity, uom, unit_rate, waste_factor, hours_per_unit, is_active, display_order)
VALUES
    ('item-1', 'sec-1', 'demo-1', 'Antinox HD Floor Protection', 'materials', 0, 0, 25, 'Each', 4.16, 0.1, 0, true, 1),
    ('item-2', 'sec-1', 'demo-1', 'Removal of stud walls etc', 'labor', 0, 0, 32, 'M2', 0, 0.1, 0.4, true, 2),
    ('item-3', 'sec-1', 'demo-1', 'Disposal via licensed transfer', 'materials', 0, 0, 12, 'Bags', 40, 0.1, 0, true, 3),
    ('item-4', 'sec-2', 'demo-1', 'DPC Installation - Traditional', 'materials', 8, 0.15, 0, 'LM', 13.93, 0.1, 0.35, true, 1),
    ('item-5', 'sec-3', 'demo-1', 'Wall membrane CM3 - 1.2m', 'materials', 6.5, 1.2, 0, 'M2', 18.35, 0.1, 0.3, true, 1),
    ('item-6', 'sec-4', 'demo-1', 'Skimming walls (multi finish)', 'labor', 6.5, 2.4, 0, 'M2', 0, 0.1, 0.267, true, 1);

-- Insert sample photos
INSERT INTO photos (id, project_id, file_name, description, photo_category, created_at)
VALUES
    ('photo-1', 'demo-1', 'IMG_001.jpg', 'Rising damp on living room wall', 'damp_evidence', NOW()),
    ('photo-2', 'demo-1', 'IMG_002.jpg', 'Salt crystallisation detail', 'damp_evidence', NOW()),
    ('photo-3', 'demo-1', 'IMG_003.jpg', 'Full room view', 'general', NOW()),
    ('photo-4', 'demo-1', 'IMG_004.jpg', 'Basement timber condition', 'timber_damage', NOW());

-- Insert sample quotation
INSERT INTO quotations (id, project_id, quotation_number, subtotal, vat_rate, vat_amount, total, deposit_percentage, deposit_amount, validity_days, status)
SELECT
    'quote-1',
    id,
    'Q-' || REPLACE(project_number, 'TT-', ''),
    10000.00,
    20.00,
    2000.00,
    12000.00,
    30.00,
    3600.00,
    30,
    'draft'
FROM projects WHERE project_number = 'TT-2026-0001';

SELECT 'Sample data seeded successfully!' as status;
EOF

print_success "Sample data seeded"

# ==============================================================================
# STEP 6: CONFIGURE ENV
# ==============================================================================
print_step "Step 6: Configuring Environment"

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    cat > .env.local << 'EOF'
# Tyne Tees Survey System - Local Development
NEXT_PUBLIC_SUPABASE_URL=http://localhost:5432
NEXT_PUBLIC_SUPABASE_ANON_KEY=any-value-for-local-dev
SUPABASE_SERVICE_ROLE_KEY=local-dev-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    print_success ".env.local created"
else
    print_success ".env.local already exists (skipping)"
fi

# ==============================================================================
# STEP 7: START DEVELOPMENT SERVER
# ==============================================================================
print_step "Step 7: Starting Development Server"

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  All Set! Starting the application...${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📍 Access the app at: ${BLUE}http://localhost:3000${NC}"
echo ""
echo "🛑  To stop: ${YELLOW}Ctrl+C${NC}"
echo "🔄  To restart: ${YELLOW}./start-dev.sh${NC}"
echo ""

# Start the dev server
npm run dev
