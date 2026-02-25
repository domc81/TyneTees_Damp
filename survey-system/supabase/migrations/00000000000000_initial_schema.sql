-- =============================================================================
-- TyneTees Damp Proofing — Complete Public Schema
-- Extracted from local Supabase on 2026-02-25
-- Single clean migration for remote deployment
-- =============================================================================

-- ─────────────────────────────────────────────
-- 1. CUSTOM ENUM TYPES
-- ─────────────────────────────────────────────

CREATE TYPE public.cost_formula_type AS ENUM (
    'standard',
    'ceiling_coverage',
    'tiered_disposal',
    'dpc_injection',
    'digital_dpc',
    'bag_and_cart',
    'ancillary_refit',
    'compound_material',
    'fixed_price',
    'per_room_fixed',
    'skip_hire'
);

CREATE TYPE public.defect_severity AS ENUM (
    'minor',
    'moderate',
    'significant',
    'severe',
    'critical'
);

CREATE TYPE public.enquiry_status AS ENUM (
    'new',
    'assigned',
    'surveyed',
    'quoted',
    'accepted',
    'declined',
    'on_hold',
    'completed'
);

CREATE TYPE public.item_type AS ENUM (
    'MTL',
    'LBR',
    'SUB',
    'OVR',
    'TRA'
);

CREATE TYPE public.project_status AS ENUM (
    'draft',
    'in_progress',
    'pending_review',
    'completed',
    'archived'
);

CREATE TYPE public.survey_type AS ENUM (
    'damp',
    'timber',
    'woodworm',
    'condensation',
    'structural',
    'comprehensive'
);

CREATE TYPE public.uom_type AS ENUM (
    'm2',
    'lm',
    'each',
    'hours',
    'bags',
    'pairs'
);

-- ─────────────────────────────────────────────
-- 2. FUNCTIONS
-- ─────────────────────────────────────────────

CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ─────────────────────────────────────────────
-- 3. TABLES
-- ─────────────────────────────────────────────

-- --- Legacy / Reference Tables ---

CREATE TABLE public.base_rates (
    id text NOT NULL,
    category text NOT NULL,
    rate_name text NOT NULL,
    rate_value numeric(10,4) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.markup_config (
    id text NOT NULL,
    item_type public.item_type NOT NULL,
    percentage numeric(6,2) DEFAULT 0 NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.work_sections (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    is_optional boolean DEFAULT false NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.pricing_items (
    id text NOT NULL,
    section_id text NOT NULL,
    name text NOT NULL,
    unit text NOT NULL,
    material_cost numeric(10,2) DEFAULT 0 NOT NULL,
    labor_hours numeric(6,4) DEFAULT 0 NOT NULL,
    item_type public.item_type DEFAULT 'MTL'::public.item_type NOT NULL,
    is_mandatory boolean DEFAULT false NOT NULL,
    markup_override numeric(6,2),
    contractor_cost numeric(10,2),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- --- CRM Tables ---

CREATE TABLE public.customers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    mobile text,
    address_line1 text NOT NULL,
    address_line2 text,
    city text NOT NULL,
    county text,
    postcode text NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    title character varying(20),
    CONSTRAINT customers_title_check CHECK (((title)::text = ANY ((ARRAY['Mr'::character varying, 'Mrs'::character varying, 'Miss'::character varying, 'Ms'::character varying, 'Dr'::character varying, 'Other'::character varying])::text[]))),
    CONSTRAINT valid_email CHECK ((email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'::text))
);

COMMENT ON TABLE public.customers IS 'Customer contact and billing information. Renamed from customer_details.';

CREATE TABLE public.enquiries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    enquiry_number text NOT NULL,
    internal_reference text,
    client_name text NOT NULL,
    client_email text,
    client_phone text,
    site_address_1 text NOT NULL,
    site_address_2 text,
    site_city text NOT NULL,
    site_county text,
    site_postcode text NOT NULL,
    survey_type public.survey_type DEFAULT 'damp'::public.survey_type NOT NULL,
    status public.enquiry_status DEFAULT 'new'::public.enquiry_status NOT NULL,
    source text,
    enquiry_date date DEFAULT CURRENT_DATE NOT NULL,
    proposed_survey_date date,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    distance_miles numeric(6,1),
    reported_problem text
);

CREATE TABLE public.surveyors (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    full_name text NOT NULL,
    email text NOT NULL,
    phone text,
    qualifications text,
    availability boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

COMMENT ON TABLE public.surveyors IS 'Table for managing surveyor details and assignments';
COMMENT ON COLUMN public.surveyors.user_id IS 'Reference to the Supabase auth user';
COMMENT ON COLUMN public.surveyors.availability IS 'Indicates if the surveyor is available for new assignments';

-- --- Core Survey Tables ---

CREATE TABLE public.surveys (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    enquiry_id uuid,
    project_number text NOT NULL,
    survey_type public.survey_type DEFAULT 'damp'::public.survey_type NOT NULL,
    status public.project_status DEFAULT 'draft'::public.project_status NOT NULL,
    survey_date date,
    weather_conditions text,
    site_address text NOT NULL,
    site_postcode text NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    survey_data jsonb DEFAULT '{}'::jsonb,
    survey_skipped_sections text[] DEFAULT '{}'::text[],
    survey_progress integer DEFAULT 0,
    survey_completed boolean DEFAULT false,
    customer_id uuid,
    surveyor_id uuid,
    client_name text,
    site_address_line2 text,
    site_city character varying(100),
    site_county character varying(100),
    reported_problem text,
    reported_problem_override text,
    completion_pct integer DEFAULT 0,
    is_complete boolean DEFAULT false,
    submitted_at timestamp with time zone,
    office_notes text
);

COMMENT ON COLUMN public.surveys.survey_data IS 'JSON object storing all structured survey question answers';
COMMENT ON COLUMN public.surveys.survey_skipped_sections IS 'Array of section IDs that were skipped';
COMMENT ON COLUMN public.surveys.survey_progress IS 'Percentage of survey completion (0-100)';
COMMENT ON COLUMN public.surveys.survey_completed IS 'Whether the survey has been marked as complete';
COMMENT ON COLUMN public.surveys.customer_id IS 'Foreign key to customer_details table';
COMMENT ON COLUMN public.surveys.surveyor_id IS 'Reference to the assigned surveyor from the surveyors table';
COMMENT ON COLUMN public.surveys.client_name IS 'Denormalised from customers table for display. Set on project creation/customer change.';
COMMENT ON COLUMN public.surveys.site_address_line2 IS 'Second line of site address';
COMMENT ON COLUMN public.surveys.site_city IS 'Site city/town';
COMMENT ON COLUMN public.surveys.site_county IS 'Site county';

CREATE TABLE public.survey_rooms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    name text NOT NULL,
    room_type text NOT NULL,
    floor_level text NOT NULL,
    display_order integer DEFAULT 0 NOT NULL,
    wall_type text,
    plaster_type text,
    floor_type text,
    findings text,
    recommendations text,
    surveyor_notes text,
    is_completed boolean DEFAULT false NOT NULL,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    issues_identified text[] DEFAULT '{}'::text[],
    room_data jsonb DEFAULT '{}'::jsonb
);

COMMENT ON COLUMN public.survey_rooms.issues_identified IS 'Multi-select array of issue types identified in this room. Valid values: damp, condensation, timber_decay, woodworm. A room can have 0-N issues. Empty array means no issues identified yet.';
COMMENT ON COLUMN public.survey_rooms.room_data IS 'Per-room measurements and findings, keyed by issue type. Structure matches RoomData interface in survey-wizard.types.ts. Example: {"damp": {"walls": [...], "dpc_required": true}, "timber_decay": {"floor_type": "suspended_timber", ...}}. Only contains keys for issues present in issues_identified array.';

-- --- Legacy per-room detail tables ---

CREATE TABLE public.defects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    defect_type text NOT NULL,
    severity public.defect_severity DEFAULT 'moderate'::public.defect_severity NOT NULL,
    location text NOT NULL,
    description text,
    photo_id uuid,
    recommendation text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.moisture_readings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    room_id uuid NOT NULL,
    location text NOT NULL,
    reading numeric(5,2) NOT NULL,
    unit text DEFAULT 'percentage'::text NOT NULL,
    material text,
    notes text,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.photos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    room_id uuid,
    file_path text,
    file_name text NOT NULL,
    category text DEFAULT 'general'::text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    question_id text,
    storage_path text,
    file_size integer,
    mime_type text,
    photo_category text,
    taken_at timestamp with time zone,
    uploaded_by text
);

COMMENT ON COLUMN public.photos.file_path IS 'DEPRECATED: Legacy base64 storage. Use storage_path instead.';
COMMENT ON COLUMN public.photos.storage_path IS 'Path in Supabase Storage bucket (e.g., project-id/question-id/filename.jpg)';

-- --- Legacy costing ---

CREATE TABLE public.project_costing (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    project_id uuid NOT NULL,
    selected_items jsonb DEFAULT '{}'::jsonb NOT NULL,
    selected_optional_items text[] DEFAULT '{}'::text[] NOT NULL,
    travel_miles integer DEFAULT 0 NOT NULL,
    notes text,
    material_subtotal numeric(10,2) DEFAULT 0 NOT NULL,
    labor_subtotal numeric(10,2) DEFAULT 0 NOT NULL,
    optional_extras numeric(10,2) DEFAULT 0 NOT NULL,
    travel_cost numeric(10,2) DEFAULT 0 NOT NULL,
    subtotal numeric(10,2) DEFAULT 0 NOT NULL,
    vat_amount numeric(10,2) DEFAULT 0 NOT NULL,
    total_inc_vat numeric(10,2) DEFAULT 0 NOT NULL,
    deposit_amount numeric(10,2) DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- --- Costing Engine Tables ---

CREATE TABLE public.costing_sections (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_type public.survey_type NOT NULL,
    section_key text NOT NULL,
    section_name text NOT NULL,
    display_order integer NOT NULL,
    is_optional boolean DEFAULT false
);

CREATE TABLE public.costing_line_templates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    section_id uuid NOT NULL,
    line_key text NOT NULL,
    description text NOT NULL,
    uom public.uom_type NOT NULL,
    base_unit_cost numeric(10,4) DEFAULT 0,
    wastage_factor numeric(5,3) DEFAULT 1.1,
    coverage_rate numeric(10,4),
    material_markup numeric(5,3) DEFAULT 0.3,
    labour_rate_per_unit numeric(10,4) DEFAULT 0,
    labour_markup numeric(5,3) DEFAULT 1.0,
    cost_formula public.cost_formula_type DEFAULT 'standard'::public.cost_formula_type NOT NULL,
    formula_params jsonb DEFAULT '{}'::jsonb,
    product_url text,
    display_order integer NOT NULL,
    is_active boolean DEFAULT true
);

CREATE TABLE public.costing_section_adjustments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    section_id uuid NOT NULL,
    adjustment_pct numeric(5,2) DEFAULT 0,
    CONSTRAINT costing_section_adjustments_adjustment_pct_check CHECK (((adjustment_pct >= ('-5'::integer)::numeric) AND (adjustment_pct <= (50)::numeric)))
);

CREATE TABLE public.pricing_config (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    config_key text NOT NULL,
    config_value numeric(10,4) NOT NULL,
    description text,
    effective_from date DEFAULT CURRENT_DATE NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.materials_catalog (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    supplier text,
    supplier_url text,
    unit_cost numeric(10,2) DEFAULT 0 NOT NULL,
    unit text,
    coverage text,
    category text NOT NULL,
    default_quantity integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    product_key text,
    coverage_m2 numeric(10,2),
    unit_size text
);

CREATE TABLE public.survey_costing_lines (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    template_id uuid NOT NULL,
    input_quantity numeric(10,2),
    input_dimension numeric(10,2),
    calculated_area numeric(10,2),
    material_unit_cost numeric(10,4),
    material_adjusted_cost numeric(10,4),
    material_total numeric(10,2),
    labour_hours numeric(10,2),
    labour_total numeric(10,2),
    line_total numeric(10,2),
    contractor_mat_cost numeric(10,2),
    contractor_lab_cost numeric(10,2),
    material_markup_override numeric(5,3),
    labour_markup_override numeric(5,3),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- --- Survey Type Extension Tables ---

CREATE TABLE public.survey_damp_report (
    survey_id uuid NOT NULL,
    existing_dpc_found boolean,
    existing_dpc_type text,
    ground_level_issue boolean,
    ground_level_details text,
    internal_tanking_observed boolean,
    solid_floor_type text,
    solid_floor_membrane_found boolean,
    wall_ties_issue boolean,
    wall_ties_details text,
    drain_issue boolean,
    drain_details text,
    external_aquaban_required boolean,
    digital_dpc_offered boolean DEFAULT false,
    digital_dpc_type text,
    digital_dpc_radius numeric(4,1),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_damp_wall_readings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    wall_location text NOT NULL,
    room_name text,
    reading_value numeric(5,1),
    reading_unit text DEFAULT 'WME'::text,
    height_mm integer,
    notes text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_condensation_report (
    survey_id uuid NOT NULL,
    condensation_on_windows boolean DEFAULT false,
    low_temp_dew_points boolean DEFAULT false,
    black_spot_mould boolean DEFAULT false,
    lack_of_ventilation boolean DEFAULT false,
    piv_recommended boolean DEFAULT false,
    piv_type text,
    trickle_vents_adequate boolean,
    airbricks_adequate boolean,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_condensation_rooms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    room_name text NOT NULL,
    has_mould boolean DEFAULT false,
    mould_severity text,
    has_condensation boolean DEFAULT false,
    ventilation_notes text,
    detailed_findings jsonb DEFAULT '{}'::jsonb,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_timber_report (
    survey_id uuid NOT NULL,
    non_guaranteed_work_note boolean DEFAULT false,
    party_wall_letter_required boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_timber_rooms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    room_number integer NOT NULL,
    room_name text,
    is_visible boolean DEFAULT false,
    floor_type text,
    floor_condition text,
    joist_accessible boolean,
    joist_condition text,
    joist_moisture_reading numeric(5,1),
    fungal_attack_found boolean DEFAULT false,
    fungal_type text,
    fungal_details text,
    insect_attack_found boolean DEFAULT false,
    insect_type text,
    insect_status text,
    insect_details text,
    treatment_required boolean DEFAULT false,
    treatment_notes text,
    detailed_findings jsonb DEFAULT '{}'::jsonb,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT survey_timber_rooms_room_number_check CHECK (((room_number >= 1) AND (room_number <= 9)))
);

CREATE TABLE public.survey_woodworm_report (
    survey_id uuid NOT NULL,
    infestation_status text DEFAULT 'none'::text NOT NULL,
    beetle_species text DEFAULT 'anobium_punctatum'::text,
    ground_floor_affected boolean DEFAULT false,
    first_floor_affected boolean DEFAULT false,
    loft_affected boolean DEFAULT false,
    ground_floor_rooms text,
    first_floor_rooms text,
    loft_details text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_images (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    section_key text NOT NULL,
    image_url text NOT NULL,
    description text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

-- --- Survey Output Tables ---

CREATE TABLE public.survey_customer_summary (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    section_key text NOT NULL,
    section_name text NOT NULL,
    material_total numeric(10,2) DEFAULT 0,
    labour_total numeric(10,2) DEFAULT 0,
    section_total numeric(10,2) DEFAULT 0,
    is_optional boolean DEFAULT false,
    display_order integer DEFAULT 0
);

CREATE TABLE public.survey_overheads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    overhead_type text NOT NULL,
    description text,
    quantity numeric(6,1) DEFAULT 1,
    unit_cost numeric(10,2) DEFAULT 0,
    total_cost numeric(10,2) DEFAULT 0,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_caf1 (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    subtotal_ex_vat numeric(10,2),
    vat_amount numeric(10,2),
    total_inc_vat numeric(10,2),
    deposit_pct numeric(5,2),
    deposit_ex_vat numeric(10,2),
    deposit_inc_vat numeric(10,2),
    payment_method text,
    signed boolean DEFAULT false,
    signed_at timestamp with time zone,
    signatory_name text,
    waive_cooling_off boolean DEFAULT false,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.survey_subcontractor_costs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    section_key text NOT NULL,
    section_name text,
    contractor_mat_cost numeric(10,2) DEFAULT 0,
    contractor_lab_cost numeric(10,2) DEFAULT 0,
    contractor_total numeric(10,2) DEFAULT 0,
    projected_hours numeric(6,1),
    assigned_to text,
    notes text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

-- --- Report Tables ---

CREATE TABLE public.report_templates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    survey_type text NOT NULL,
    version integer DEFAULT 1,
    sections jsonb NOT NULL,
    settings jsonb NOT NULL,
    is_default boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT report_templates_survey_type_check CHECK ((survey_type = ANY (ARRAY['damp'::text, 'condensation'::text, 'timber'::text, 'woodworm'::text])))
);

CREATE TABLE public.survey_reports (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,
    template_id uuid NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    sections jsonb DEFAULT '[]'::jsonb NOT NULL,
    generated_at timestamp with time zone,
    reviewed_by text,
    finalised_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    publish_token text,
    published_at timestamp with time zone,
    CONSTRAINT survey_reports_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'generated'::text, 'reviewed'::text, 'finalised'::text, 'published'::text])))
);

COMMENT ON COLUMN public.survey_reports.publish_token IS 'Unique token for public report access. Generated on publish, cleared on unpublish.';
COMMENT ON COLUMN public.survey_reports.published_at IS 'Timestamp when the report was published for customer viewing.';

-- ─────────────────────────────────────────────
-- 4. PRIMARY KEYS
-- ─────────────────────────────────────────────

ALTER TABLE ONLY public.base_rates ADD CONSTRAINT base_rates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.costing_line_templates ADD CONSTRAINT costing_line_templates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.costing_section_adjustments ADD CONSTRAINT costing_section_adjustments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.costing_sections ADD CONSTRAINT costing_sections_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.customers ADD CONSTRAINT customer_details_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.defects ADD CONSTRAINT defects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.enquiries ADD CONSTRAINT enquiries_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.markup_config ADD CONSTRAINT markup_config_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.materials_catalog ADD CONSTRAINT materials_catalog_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.moisture_readings ADD CONSTRAINT moisture_readings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pricing_config ADD CONSTRAINT pricing_config_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.pricing_items ADD CONSTRAINT pricing_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.project_costing ADD CONSTRAINT project_costing_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.surveys ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.report_templates ADD CONSTRAINT report_templates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_caf1 ADD CONSTRAINT survey_caf1_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_condensation_report ADD CONSTRAINT survey_condensation_report_pkey PRIMARY KEY (survey_id);
ALTER TABLE ONLY public.survey_condensation_rooms ADD CONSTRAINT survey_condensation_rooms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_costing_lines ADD CONSTRAINT survey_costing_lines_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_customer_summary ADD CONSTRAINT survey_customer_summary_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_damp_report ADD CONSTRAINT survey_damp_report_pkey PRIMARY KEY (survey_id);
ALTER TABLE ONLY public.survey_damp_wall_readings ADD CONSTRAINT survey_damp_wall_readings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_images ADD CONSTRAINT survey_images_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_overheads ADD CONSTRAINT survey_overheads_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_reports ADD CONSTRAINT survey_reports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_rooms ADD CONSTRAINT survey_rooms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_subcontractor_costs ADD CONSTRAINT survey_subcontractor_costs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_timber_report ADD CONSTRAINT survey_timber_report_pkey PRIMARY KEY (survey_id);
ALTER TABLE ONLY public.survey_timber_rooms ADD CONSTRAINT survey_timber_rooms_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.survey_woodworm_report ADD CONSTRAINT survey_woodworm_report_pkey PRIMARY KEY (survey_id);
ALTER TABLE ONLY public.surveyors ADD CONSTRAINT surveyors_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.work_sections ADD CONSTRAINT work_sections_pkey PRIMARY KEY (id);

-- ─────────────────────────────────────────────
-- 5. UNIQUE CONSTRAINTS
-- ─────────────────────────────────────────────

ALTER TABLE ONLY public.costing_line_templates ADD CONSTRAINT costing_line_templates_section_id_line_key_key UNIQUE (section_id, line_key);
ALTER TABLE ONLY public.costing_section_adjustments ADD CONSTRAINT costing_section_adjustments_survey_id_section_id_key UNIQUE (survey_id, section_id);
ALTER TABLE ONLY public.costing_sections ADD CONSTRAINT costing_sections_survey_type_section_key_key UNIQUE (survey_type, section_key);
ALTER TABLE ONLY public.enquiries ADD CONSTRAINT enquiries_enquiry_number_key UNIQUE (enquiry_number);
ALTER TABLE ONLY public.markup_config ADD CONSTRAINT markup_config_item_type_key UNIQUE (item_type);
ALTER TABLE ONLY public.materials_catalog ADD CONSTRAINT materials_catalog_product_key_key UNIQUE (product_key);
ALTER TABLE ONLY public.pricing_config ADD CONSTRAINT pricing_config_config_key_key UNIQUE (config_key);
ALTER TABLE ONLY public.project_costing ADD CONSTRAINT project_costing_project_id_key UNIQUE (project_id);
ALTER TABLE ONLY public.surveys ADD CONSTRAINT projects_project_number_key UNIQUE (project_number);
ALTER TABLE ONLY public.survey_caf1 ADD CONSTRAINT survey_caf1_survey_id_key UNIQUE (survey_id);
ALTER TABLE ONLY public.survey_costing_lines ADD CONSTRAINT survey_costing_lines_survey_id_template_id_key UNIQUE (survey_id, template_id);
ALTER TABLE ONLY public.survey_customer_summary ADD CONSTRAINT survey_customer_summary_survey_id_section_key_key UNIQUE (survey_id, section_key);
ALTER TABLE ONLY public.survey_reports ADD CONSTRAINT survey_reports_publish_token_key UNIQUE (publish_token);
ALTER TABLE ONLY public.survey_timber_rooms ADD CONSTRAINT survey_timber_rooms_survey_id_room_number_key UNIQUE (survey_id, room_number);
ALTER TABLE ONLY public.surveyors ADD CONSTRAINT surveyors_email_key UNIQUE (email);

-- ─────────────────────────────────────────────
-- 6. INDEXES
-- ─────────────────────────────────────────────

-- Costing engine
CREATE INDEX idx_costing_sections_type ON public.costing_sections USING btree (survey_type);
CREATE INDEX idx_costing_templates_section ON public.costing_line_templates USING btree (section_id);
CREATE INDEX idx_costing_lines_survey ON public.survey_costing_lines USING btree (survey_id);
CREATE INDEX idx_costing_lines_template ON public.survey_costing_lines USING btree (template_id);
CREATE INDEX idx_section_adjustments_survey ON public.costing_section_adjustments USING btree (survey_id);

-- Customers
CREATE INDEX idx_customer_email ON public.customers USING btree (email);
CREATE INDEX idx_customer_name ON public.customers USING btree (last_name, first_name);
CREATE INDEX idx_customer_postcode ON public.customers USING btree (postcode);

-- Enquiries
CREATE INDEX idx_enquiries_created_at ON public.enquiries USING btree (created_at DESC);
CREATE INDEX idx_enquiries_status ON public.enquiries USING btree (status);
CREATE INDEX idx_enquiries_survey_type ON public.enquiries USING btree (survey_type);

-- Surveys
CREATE INDEX idx_projects_created_at ON public.surveys USING btree (created_at DESC);
CREATE INDEX idx_projects_customer ON public.surveys USING btree (customer_id);
CREATE INDEX idx_projects_status ON public.surveys USING btree (status);
CREATE INDEX idx_projects_survey_completed ON public.surveys USING btree (survey_completed) WHERE (survey_completed = true);
CREATE INDEX idx_projects_survey_data ON public.surveys USING gin (survey_data);
CREATE INDEX idx_projects_survey_progress ON public.surveys USING btree (survey_progress);
CREATE INDEX idx_projects_survey_type ON public.surveys USING btree (survey_type);
CREATE INDEX idx_surveys_enquiry ON public.surveys USING btree (enquiry_id);
CREATE INDEX idx_surveys_status ON public.surveys USING btree (status);
CREATE INDEX idx_surveys_survey_type ON public.surveys USING btree (survey_type);

COMMENT ON INDEX public.idx_projects_customer IS 'Index for fast customer lookup in projects';

-- Survey rooms
CREATE INDEX idx_survey_rooms_survey ON public.survey_rooms USING btree (survey_id);
CREATE INDEX idx_survey_rooms_data ON public.survey_rooms USING gin (room_data);
CREATE INDEX idx_survey_rooms_issues ON public.survey_rooms USING gin (issues_identified);

COMMENT ON INDEX public.idx_survey_rooms_data IS 'GIN index for efficient queries on room_data JSONB field. Supports queries like: WHERE room_data @> ''{"damp": {"dpc_required": true}}'' or WHERE room_data ? ''condensation''';
COMMENT ON INDEX public.idx_survey_rooms_issues IS 'GIN index for efficient queries on issues_identified array. Supports queries like: WHERE issues_identified @> ARRAY[''damp''] or WHERE ''timber_decay'' = ANY(issues_identified)';

-- Legacy per-room detail
CREATE INDEX idx_defects_room ON public.defects USING btree (room_id);
CREATE INDEX idx_moisture_readings_room ON public.moisture_readings USING btree (room_id);
CREATE INDEX idx_photos_project ON public.photos USING btree (project_id);
CREATE INDEX idx_photos_question_id ON public.photos USING btree (project_id, question_id);

-- Materials
CREATE INDEX idx_materials_catalog_category ON public.materials_catalog USING btree (category);
CREATE INDEX idx_pricing_items_section ON public.pricing_items USING btree (section_id);

-- Survey type extensions
CREATE INDEX idx_damp_wall_readings_survey ON public.survey_damp_wall_readings USING btree (survey_id);
CREATE INDEX idx_condensation_rooms_survey ON public.survey_condensation_rooms USING btree (survey_id);
CREATE INDEX idx_timber_rooms_survey ON public.survey_timber_rooms USING btree (survey_id);
CREATE INDEX idx_survey_images_survey ON public.survey_images USING btree (survey_id);
CREATE INDEX idx_survey_images_section ON public.survey_images USING btree (survey_id, section_key);

-- Survey output tables
CREATE INDEX idx_customer_summary_survey ON public.survey_customer_summary USING btree (survey_id);
CREATE INDEX idx_overheads_survey ON public.survey_overheads USING btree (survey_id);
CREATE INDEX idx_caf1_survey ON public.survey_caf1 USING btree (survey_id);
CREATE INDEX idx_subcontractor_costs_survey ON public.survey_subcontractor_costs USING btree (survey_id);

-- Surveyors
CREATE INDEX idx_surveyors_email ON public.surveyors USING btree (email);
CREATE INDEX idx_surveyors_user_id ON public.surveyors USING btree (user_id);

-- Reports
CREATE INDEX idx_report_templates_type ON public.report_templates USING btree (survey_type);
CREATE UNIQUE INDEX idx_report_templates_default ON public.report_templates USING btree (survey_type) WHERE (is_default = true);
CREATE INDEX idx_survey_reports_survey ON public.survey_reports USING btree (survey_id);
CREATE INDEX idx_survey_reports_template ON public.survey_reports USING btree (template_id);
CREATE INDEX idx_survey_reports_status ON public.survey_reports USING btree (status);
CREATE INDEX idx_survey_reports_token ON public.survey_reports USING btree (publish_token) WHERE (publish_token IS NOT NULL);

-- ─────────────────────────────────────────────
-- 7. FOREIGN KEYS
-- ─────────────────────────────────────────────

-- Surveys → CRM
ALTER TABLE ONLY public.surveys ADD CONSTRAINT projects_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.surveys ADD CONSTRAINT projects_enquiry_id_fkey FOREIGN KEY (enquiry_id) REFERENCES public.enquiries(id) ON DELETE SET NULL;
ALTER TABLE ONLY public.surveys ADD CONSTRAINT projects_surveyor_id_fkey FOREIGN KEY (surveyor_id) REFERENCES public.surveyors(id) ON DELETE SET NULL;

-- Surveyors → Auth
ALTER TABLE ONLY public.surveyors ADD CONSTRAINT surveyors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Survey rooms / legacy detail → Surveys
ALTER TABLE ONLY public.survey_rooms ADD CONSTRAINT survey_rooms_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.defects ADD CONSTRAINT defects_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.survey_rooms(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.moisture_readings ADD CONSTRAINT moisture_readings_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.survey_rooms(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.photos ADD CONSTRAINT photos_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.photos ADD CONSTRAINT photos_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.survey_rooms(id) ON DELETE SET NULL;

-- Legacy costing
ALTER TABLE ONLY public.pricing_items ADD CONSTRAINT pricing_items_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.work_sections(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.project_costing ADD CONSTRAINT project_costing_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.surveys(id) ON DELETE CASCADE;

-- Costing engine
ALTER TABLE ONLY public.costing_line_templates ADD CONSTRAINT costing_line_templates_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.costing_sections(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.costing_section_adjustments ADD CONSTRAINT costing_section_adjustments_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.costing_sections(id);
ALTER TABLE ONLY public.costing_section_adjustments ADD CONSTRAINT costing_section_adjustments_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_costing_lines ADD CONSTRAINT survey_costing_lines_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_costing_lines ADD CONSTRAINT survey_costing_lines_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.costing_line_templates(id);

-- Survey type extensions → Surveys
ALTER TABLE ONLY public.survey_damp_report ADD CONSTRAINT survey_damp_report_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_damp_wall_readings ADD CONSTRAINT survey_damp_wall_readings_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_condensation_report ADD CONSTRAINT survey_condensation_report_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_condensation_rooms ADD CONSTRAINT survey_condensation_rooms_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_timber_report ADD CONSTRAINT survey_timber_report_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_timber_rooms ADD CONSTRAINT survey_timber_rooms_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_woodworm_report ADD CONSTRAINT survey_woodworm_report_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_images ADD CONSTRAINT survey_images_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;

-- Survey output → Surveys
ALTER TABLE ONLY public.survey_customer_summary ADD CONSTRAINT survey_customer_summary_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_overheads ADD CONSTRAINT survey_overheads_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_caf1 ADD CONSTRAINT survey_caf1_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_subcontractor_costs ADD CONSTRAINT survey_subcontractor_costs_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;

-- Reports
ALTER TABLE ONLY public.survey_reports ADD CONSTRAINT survey_reports_survey_id_fkey FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE;
ALTER TABLE ONLY public.survey_reports ADD CONSTRAINT survey_reports_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.report_templates(id);

-- ─────────────────────────────────────────────
-- 8. TRIGGERS (updated_at auto-update)
-- ─────────────────────────────────────────────

CREATE TRIGGER set_base_rates_updated_at BEFORE UPDATE ON public.base_rates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_customers_updated_at BEFORE UPDATE ON public.customers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_markup_config_updated_at BEFORE UPDATE ON public.markup_config FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_materials_catalog_updated_at BEFORE UPDATE ON public.materials_catalog FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_pricing_items_updated_at BEFORE UPDATE ON public.pricing_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_project_costing_updated_at BEFORE UPDATE ON public.project_costing FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.surveys FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_survey_rooms_updated_at BEFORE UPDATE ON public.survey_rooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER set_work_sections_updated_at BEFORE UPDATE ON public.work_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ─────────────────────────────────────────────
-- 9. ROW LEVEL SECURITY — Enable on all tables
-- ─────────────────────────────────────────────

ALTER TABLE public.base_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.costing_line_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.costing_section_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.costing_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.defects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.markup_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moisture_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_costing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_caf1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_condensation_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_condensation_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_costing_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_customer_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_damp_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_damp_wall_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_overheads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_subcontractor_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_timber_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_timber_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_woodworm_report ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveyors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_sections ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────
-- 10. RLS POLICIES
-- ─────────────────────────────────────────────

-- --- "Full access" policies for tables using the simpler pattern ---

CREATE POLICY "Authenticated users full access" ON public.base_rates TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.customers TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.defects TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.enquiries TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.markup_config TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.materials_catalog TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.moisture_readings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.photos TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.pricing_items TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.project_costing TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.survey_rooms TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.surveyors TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.surveys TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users full access" ON public.work_sections TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access" ON public.base_rates TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.customers TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.defects TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.enquiries TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.markup_config TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.materials_catalog TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.moisture_readings TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.photos TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.pricing_items TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.project_costing TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.survey_rooms TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.surveyors TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on surveys" ON public.surveys TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access" ON public.work_sections TO service_role USING (true) WITH CHECK (true);

-- --- Surveys: granular SELECT/INSERT/UPDATE policies ---

CREATE POLICY "Authenticated users can view all surveys" ON public.surveys FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create surveys" ON public.surveys FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update surveys" ON public.surveys FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- --- Per-operation policies for costing/reporting tables ---

-- costing_line_templates
CREATE POLICY "Authenticated read costing_line_templates" ON public.costing_line_templates FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert costing_line_templates" ON public.costing_line_templates FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update costing_line_templates" ON public.costing_line_templates FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete costing_line_templates" ON public.costing_line_templates FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role costing_line_templates" ON public.costing_line_templates TO service_role USING (true) WITH CHECK (true);

-- costing_section_adjustments
CREATE POLICY "Authenticated read costing_section_adjustments" ON public.costing_section_adjustments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert costing_section_adjustments" ON public.costing_section_adjustments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update costing_section_adjustments" ON public.costing_section_adjustments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete costing_section_adjustments" ON public.costing_section_adjustments FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role costing_section_adjustments" ON public.costing_section_adjustments TO service_role USING (true) WITH CHECK (true);

-- costing_sections
CREATE POLICY "Authenticated read costing_sections" ON public.costing_sections FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert costing_sections" ON public.costing_sections FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update costing_sections" ON public.costing_sections FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete costing_sections" ON public.costing_sections FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role costing_sections" ON public.costing_sections TO service_role USING (true) WITH CHECK (true);

-- pricing_config
CREATE POLICY "Authenticated read pricing_config" ON public.pricing_config FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert pricing_config" ON public.pricing_config FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update pricing_config" ON public.pricing_config FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete pricing_config" ON public.pricing_config FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role pricing_config" ON public.pricing_config TO service_role USING (true) WITH CHECK (true);

-- report_templates
CREATE POLICY "Authenticated read report_templates" ON public.report_templates FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert report_templates" ON public.report_templates FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update report_templates" ON public.report_templates FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete report_templates" ON public.report_templates FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role report_templates" ON public.report_templates TO service_role USING (true) WITH CHECK (true);

-- survey_caf1
CREATE POLICY "Authenticated read survey_caf1" ON public.survey_caf1 FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_caf1" ON public.survey_caf1 FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_caf1" ON public.survey_caf1 FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_caf1" ON public.survey_caf1 FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_caf1" ON public.survey_caf1 TO service_role USING (true) WITH CHECK (true);

-- survey_condensation_report
CREATE POLICY "Authenticated read survey_condensation_report" ON public.survey_condensation_report FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_condensation_report" ON public.survey_condensation_report FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_condensation_report" ON public.survey_condensation_report FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_condensation_report" ON public.survey_condensation_report FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_condensation_report" ON public.survey_condensation_report TO service_role USING (true) WITH CHECK (true);

-- survey_condensation_rooms
CREATE POLICY "Authenticated read survey_condensation_rooms" ON public.survey_condensation_rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_condensation_rooms" ON public.survey_condensation_rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_condensation_rooms" ON public.survey_condensation_rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_condensation_rooms" ON public.survey_condensation_rooms FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_condensation_rooms" ON public.survey_condensation_rooms TO service_role USING (true) WITH CHECK (true);

-- survey_costing_lines
CREATE POLICY "Authenticated read survey_costing_lines" ON public.survey_costing_lines FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_costing_lines" ON public.survey_costing_lines FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_costing_lines" ON public.survey_costing_lines FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_costing_lines" ON public.survey_costing_lines FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_costing_lines" ON public.survey_costing_lines TO service_role USING (true) WITH CHECK (true);

-- survey_customer_summary
CREATE POLICY "Authenticated read survey_customer_summary" ON public.survey_customer_summary FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_customer_summary" ON public.survey_customer_summary FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_customer_summary" ON public.survey_customer_summary FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_customer_summary" ON public.survey_customer_summary FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_customer_summary" ON public.survey_customer_summary TO service_role USING (true) WITH CHECK (true);

-- survey_damp_report
CREATE POLICY "Authenticated read survey_damp_report" ON public.survey_damp_report FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_damp_report" ON public.survey_damp_report FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_damp_report" ON public.survey_damp_report FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_damp_report" ON public.survey_damp_report FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_damp_report" ON public.survey_damp_report TO service_role USING (true) WITH CHECK (true);

-- survey_damp_wall_readings
CREATE POLICY "Authenticated read survey_damp_wall_readings" ON public.survey_damp_wall_readings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_damp_wall_readings" ON public.survey_damp_wall_readings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_damp_wall_readings" ON public.survey_damp_wall_readings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_damp_wall_readings" ON public.survey_damp_wall_readings FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_damp_wall_readings" ON public.survey_damp_wall_readings TO service_role USING (true) WITH CHECK (true);

-- survey_images
CREATE POLICY "Authenticated read survey_images" ON public.survey_images FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_images" ON public.survey_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_images" ON public.survey_images FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_images" ON public.survey_images FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_images" ON public.survey_images TO service_role USING (true) WITH CHECK (true);

-- survey_overheads
CREATE POLICY "Authenticated read survey_overheads" ON public.survey_overheads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_overheads" ON public.survey_overheads FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_overheads" ON public.survey_overheads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_overheads" ON public.survey_overheads FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_overheads" ON public.survey_overheads TO service_role USING (true) WITH CHECK (true);

-- survey_reports
CREATE POLICY "Authenticated read survey_reports" ON public.survey_reports FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_reports" ON public.survey_reports FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_reports" ON public.survey_reports FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_reports" ON public.survey_reports FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_reports" ON public.survey_reports TO service_role USING (true) WITH CHECK (true);

-- survey_subcontractor_costs
CREATE POLICY "Authenticated read survey_subcontractor_costs" ON public.survey_subcontractor_costs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_subcontractor_costs" ON public.survey_subcontractor_costs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_subcontractor_costs" ON public.survey_subcontractor_costs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_subcontractor_costs" ON public.survey_subcontractor_costs FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_subcontractor_costs" ON public.survey_subcontractor_costs TO service_role USING (true) WITH CHECK (true);

-- survey_timber_report
CREATE POLICY "Authenticated read survey_timber_report" ON public.survey_timber_report FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_timber_report" ON public.survey_timber_report FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_timber_report" ON public.survey_timber_report FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_timber_report" ON public.survey_timber_report FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_timber_report" ON public.survey_timber_report TO service_role USING (true) WITH CHECK (true);

-- survey_timber_rooms
CREATE POLICY "Authenticated read survey_timber_rooms" ON public.survey_timber_rooms FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_timber_rooms" ON public.survey_timber_rooms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_timber_rooms" ON public.survey_timber_rooms FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_timber_rooms" ON public.survey_timber_rooms FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_timber_rooms" ON public.survey_timber_rooms TO service_role USING (true) WITH CHECK (true);

-- survey_woodworm_report
CREATE POLICY "Authenticated read survey_woodworm_report" ON public.survey_woodworm_report FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated insert survey_woodworm_report" ON public.survey_woodworm_report FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update survey_woodworm_report" ON public.survey_woodworm_report FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete survey_woodworm_report" ON public.survey_woodworm_report FOR DELETE TO authenticated USING (true);
CREATE POLICY "Service role survey_woodworm_report" ON public.survey_woodworm_report TO service_role USING (true) WITH CHECK (true);
