# Tyne Tees Survey System - Complete Documentation

## Overview

A comprehensive survey and costing system for damp proofing, timber, and condensation surveys. This system replicates and enhances the Excel workbook logic into a modern web application.

## System Architecture

### Core Workflow

```
Enquiry → Project → Survey → Costing → Materials → Quotation → Report
```

### Data Model

```
enquiries
├── client_info (name, email, phone)
├── site_address
├── survey_type (damp/timber/woodworm/condensation)
├── status (new/assigned/surveyed/quoted/accepted)
└── audit (created_at, updated_at, source)

projects
├── enquiry_id (links to enquiry)
├── project_number (e.g., TT-2026-0001)
├── weather_conditions
├── property_type & construction
├── total_cost & deposit_amount
└── status

room_inspections
├── project_id
├── room_name, room_type, floor_level
├── defects (JSON array with type, severity, location)
├── moisture_readings (JSON array with readings %)
├── findings & recommendations
├── photos (array)
└── flags (asbestos_risk, timber_at_risk)

cost_sections
├── project_id
├── section_name (Preparatory, DPC, Membranes, etc.)
├── markup_percentage
├── materials_total, labor_total
└── section_total

line_items
├── section_id
├── item_name, description, category (EQUIP/LBR/MTL/Other)
├── quantity (calculated or manual)
├── uom (Each/M2/LM/Hours)
├── unit_rate, waste_factor
├── hours_per_unit, hourly_rate
├── markup_percentage
└── material_cost, labor_cost, line_total

materials
├── product_code, name, category
├── unit_cost, unit_of_measure
├── coverage_per_unit
├── supplier_name, supplier_url
└── default_waste_factor, default_markup

quotations
├── project_id
├── quotation_number (e.g., Q-TT-2026-0001)
├── subtotal, vat_rate, vat_amount, total
├── deposit_percentage, deposit_amount
├── validity_days, valid_until
└── status (draft/sent/accepted/rejected)
```

## Key Features

### 1. Enquiry Management

- Auto-generates enquiry numbers (CF-DAMP-2026-0001)
- Auto-generates internal references (SMITH-001)
- Source tracking (Website/Phone/Email/Referral)
- Assign to surveyor with proposed survey date

### 2. Room-by-Room Inspection

- Add rooms to property
- Record defects with type, severity, location
- Take moisture readings (auto-flag if ≥20%)
- Add findings and recommendations
- Upload photos per room
- Auto-triggers warnings:
  - **Asbestos Risk**: If Artex/dec plaster noted
  - **Timber at Risk**: If wet rot/dry rot detected

### 3. Defect Types

| Defect Type | Survey Types | Triggers |
|-------------|--------------|----------|
| Rising Damp | Damp | DPC + Membrane sections |
| Penetrating Damp | Damp | External tanking |
| Wet Rot | Timber/Damp | Fungicidal treatment |
| Dry Rot | Timber | Specialist treatment |
| Woodworm | Woodworm/Timber | Treatment section |
| Condensation | Condensation | Ventilation |
| Mould | Condensation | Treatment |
| Asbestos Suspected | All | Asbestos Testing section |
| Wall Tie Failure | Structural | Structural repair |

### 4. Costing Engine

#### Section-Based Pricing

1. **Stripping Out Items**
2. **Walls (Membrane System)**
3. **Cementitious Tanking**
4. **Floor Membranes**
5. **Plastering & Finishing**
6. **Warmline Internal Wall Insulation**
7. **Floor Joists & Decking**
8. **Airbricks**
9. **Spray Treatments**
10. **Drains**
11. **External Water Repellant**
12. **Asbestos Testing**
13. **Skip Hire**

#### Line Item Formulas

```
Quantity = length × width (or manual entry)

Material Cost = Qty × Unit Rate × (1 + Waste Factor) × (1 + Markup %)
Labor Cost = Qty × Hours/Unit × Hourly Rate × (1 + Labor Markup %)

Line Total = Material Cost + Labor Cost

Hourly Rate = £30.63 (from rates table)
Default Material Markup = 35%
Default Labor Markup = 100%
Default Waste Factor = 10%
```

### 5. Materials List

- Auto-populates from survey quantities
- Links to product catalog with costs
- Shows coverage per unit (e.g., 10 plugs per M2)
- Procurement tracking (ordered/delivered)

### 6. Email Templates

#### Access Permission Email
Generated when destructive survey needed (lifting floorboards, etc.):

```
Subject: RE: Creation of Access Points for Further Inspection

Dear {{client_name}},
We have carried out a survey of your property at {{site_address}}.
During the survey it was not possible for the surveyor to inspect certain areas...
```

### 7. CAF1 Form

On-site acceptance form with:
- Client details
- Work type selection (Damp Proofing, Timber Treatments, etc.)
- Cost breakdown
- Customer signature

## Installation

### Prerequisites

- Node.js 18+
- PostgreSQL (or Supabase)
- pnpm or npm

### Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your database URL

# Run migrations
supabase db push

# Start development
npm run dev
```

## Deployment

### Vercel (Frontend)
1. Connect GitHub repo
2. Add environment variables
3. Deploy

### Supabase (Backend)
1. Create project at supabase.com
2. Run migrations
3. Deploy Edge Functions

## API Endpoints

### Enquiries
- `POST /enquiries` - Create enquiry
- `GET /enquiries` - List enquiries
- `GET /enquiries/:id` - Get enquiry
- `PATCH /enquiries/:id` - Update enquiry

### Projects
- `POST /projects` - Create project
- `GET /projects/:id` - Get project with rooms, items

### Rooms
- `POST /rooms` - Add room
- `PATCH /rooms/:id` - Update room
- `DELETE /rooms/:id` - Delete room

### Costing
- `GET /costing/:projectId` - Get costing
- `POST /line-items` - Add line item
- `PATCH /line-items/:id` - Update line item
- `DELETE /line-items/:id` - Delete line item

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Default Rates

| Rate | Value | Type |
|-------|--------|-------|
| Hourly Rate | £30.63 | Hourly |
| Travel Rate | £0.50 | KM |
| Contractor Hourly | £28.00 | Hourly |
| Material Markup | 35% | Percentage |
| Labor Markup | 100% | Percentage |
| VAT | 20% | Percentage |

## Risk Triggers

### Moisture Thresholds
- **≥20%**: Timber at risk warning → Auto-suggest fogging treatment
- **15-19%**: Elevated → Monitor
- **<15%**: Normal

### Asbestos Triggers
- Artex noted → Auto-add Asbestos Testing section
- Decorative plaster → Flag for assessment
- Confirmed asbestos → Generate access permission email

## License

Proprietary - Tyne Tees Damp Proofing Ltd
