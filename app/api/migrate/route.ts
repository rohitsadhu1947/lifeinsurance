import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST() {
  try {
    console.log("Running proposal form database migration...")
    
    // Create proposal_forms table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_forms (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) UNIQUE NOT NULL,
        quote_id INTEGER,
        plan_name VARCHAR(200),
        company_name VARCHAR(200),
        premium_amount DECIMAL(12, 2),
        coverage_amount DECIMAL(12, 2),
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create proposal_personal_details table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_personal_details (
        id SERIAL PRIMARY KEY,
        proposal_form_id INTEGER REFERENCES proposal_forms(id) ON DELETE CASCADE,
        full_name VARCHAR(200) NOT NULL,
        preferred_identity_proof VARCHAR(100),
        preferred_age_proof VARCHAR(100),
        preferred_address_proof VARCHAR(100),
        politically_exposed_person BOOLEAN DEFAULT FALSE,
        criminal_offense_record BOOLEAN DEFAULT FALSE,
        marital_status VARCHAR(50),
        highest_education VARCHAR(100),
        country_code VARCHAR(10) DEFAULT '91',
        mobile_number VARCHAR(20),
        email_id VARCHAR(255),
        pan_number VARCHAR(20),
        address_line_1 TEXT,
        address_line_2 TEXT,
        address_line_3 TEXT,
        landmark TEXT,
        pin_code VARCHAR(10),
        city VARCHAR(100),
        state VARCHAR(100),
        permanent_address_same_as_communication BOOLEAN DEFAULT TRUE,
        e_insurance_account_exists BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create proposal_occupation_details table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_occupation_details (
        id SERIAL PRIMARY KEY,
        proposal_form_id INTEGER REFERENCES proposal_forms(id) ON DELETE CASCADE,
        occupation VARCHAR(100),
        engaged_in_specified_industries BOOLEAN DEFAULT FALSE,
        organization_name VARCHAR(200),
        organization_type VARCHAR(100),
        annual_income DECIMAL(12, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create proposal_nominee_details table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_nominee_details (
        id SERIAL PRIMARY KEY,
        proposal_form_id INTEGER REFERENCES proposal_forms(id) ON DELETE CASCADE,
        relationship_with_nominee VARCHAR(100),
        nominee_first_name VARCHAR(100),
        nominee_last_name VARCHAR(100),
        nominee_date_of_birth DATE,
        nominee_additional_details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create proposal_health_details table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_health_details (
        id SERIAL PRIMARY KEY,
        proposal_form_id INTEGER REFERENCES proposal_forms(id) ON DELETE CASCADE,
        weight_kg DECIMAL(5, 2),
        height_feet INTEGER,
        height_inches INTEGER,
        tobacco_consumption BOOLEAN DEFAULT FALSE,
        alcohol_consumption_last_year BOOLEAN DEFAULT FALSE,
        narcotics_consumption BOOLEAN DEFAULT FALSE,
        hazardous_occupation BOOLEAN DEFAULT FALSE,
        armed_forces_employment BOOLEAN DEFAULT FALSE,
        hospitalization_history BOOLEAN DEFAULT FALSE,
        hypertension BOOLEAN DEFAULT FALSE,
        heart_disease BOOLEAN DEFAULT FALSE,
        heart_surgery BOOLEAN DEFAULT FALSE,
        diabetes BOOLEAN DEFAULT FALSE,
        respiratory_disorders BOOLEAN DEFAULT FALSE,
        nervous_disorders BOOLEAN DEFAULT FALSE,
        gastrointestinal_disorders BOOLEAN DEFAULT FALSE,
        liver_disorders BOOLEAN DEFAULT FALSE,
        genitourinary_disorders BOOLEAN DEFAULT FALSE,
        cancer_history BOOLEAN DEFAULT FALSE,
        hiv_infection BOOLEAN DEFAULT FALSE,
        blood_disorders BOOLEAN DEFAULT FALSE,
        psychiatric_illness BOOLEAN DEFAULT FALSE,
        other_disorders BOOLEAN DEFAULT FALSE,
        congenital_defects BOOLEAN DEFAULT FALSE,
        family_history_disorders BOOLEAN DEFAULT FALSE,
        medical_treatment_last_two_years BOOLEAN DEFAULT FALSE,
        weight_change_last_six_months BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create proposal_documents table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_documents (
        id SERIAL PRIMARY KEY,
        proposal_form_id INTEGER REFERENCES proposal_forms(id) ON DELETE CASCADE,
        document_type VARCHAR(100),
        document_subtype VARCHAR(100),
        file_name VARCHAR(255),
        file_path VARCHAR(500),
        file_size BIGINT,
        file_type VARCHAR(50),
        upload_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create proposal_declarations table
    await sql`
      CREATE TABLE IF NOT EXISTS proposal_declarations (
        id SERIAL PRIMARY KEY,
        proposal_form_id INTEGER REFERENCES proposal_forms(id) ON DELETE CASCADE,
        declaration_accepted BOOLEAN DEFAULT FALSE,
        electronic_document_preference BOOLEAN DEFAULT TRUE,
        iib_authorization BOOLEAN DEFAULT FALSE,
        iib_quick_filling BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create quotes_storage table for session-based quote retrieval
    await sql`
      CREATE TABLE IF NOT EXISTS quotes_storage (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) UNIQUE NOT NULL,
        quote_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours')
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_forms_session_id ON proposal_forms(session_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_forms_status ON proposal_forms(status)`
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_personal_details_proposal_id ON proposal_personal_details(proposal_form_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_occupation_details_proposal_id ON proposal_occupation_details(proposal_form_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_nominee_details_proposal_id ON proposal_nominee_details(proposal_form_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_health_details_proposal_id ON proposal_health_details(proposal_form_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_documents_proposal_id ON proposal_documents(proposal_form_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_proposal_declarations_proposal_id ON proposal_declarations(proposal_form_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_quotes_storage_session_id ON quotes_storage(session_id)`
    await sql`CREATE INDEX IF NOT EXISTS idx_quotes_storage_expires_at ON quotes_storage(expires_at)`

    console.log("✅ Migration completed successfully!")
    
    return NextResponse.json({
      success: true,
      message: "Proposal form tables created successfully",
    })
  } catch (error) {
    console.error("❌ Migration failed:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create proposal form tables",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
