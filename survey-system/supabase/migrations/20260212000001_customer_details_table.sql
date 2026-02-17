-- Migration: Create customer_details table for proper customer-survey separation
-- This implements the architecture where customers can have multiple surveys

-- Create customer_details table
CREATE TABLE customer_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(20) NOT NULL CHECK (title IN ('Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Other')),
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  address1 VARCHAR(200) NOT NULL,
  address2 VARCHAR(200),
  city VARCHAR(100) NOT NULL,
  county VARCHAR(100) NOT NULL,
  postCode VARCHAR(20) NOT NULL,
  emailAddress VARCHAR(255) NOT NULL UNIQUE,
  contactNumber VARCHAR(20) NOT NULL,
  secondaryContact VARCHAR(20),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_customer_details_email ON customer_details (emailAddress);
CREATE INDEX idx_customer_details_name ON customer_details (lastName, firstName);
CREATE INDEX idx_customer_details_postcode ON customer_details (postCode);

-- Add comments for documentation
COMMENT ON TABLE customer_details IS 'Customer contact information for communications and billing';
COMMENT ON COLUMN customer_details.emailAddress IS 'Primary email for customer communications';
COMMENT ON COLUMN customer_details.contactNumber IS 'Primary phone number for customer contact';
COMMENT ON COLUMN customer_details.secondaryContact IS 'Secondary/alternate phone number';