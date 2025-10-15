import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

// Create a new proposal form
export async function POST(request: Request) {
  try {
    const { formData, quoteData, uploadedDocuments } = await request.json()

    // Check if database is available
    if (!sql || !process.env.DATABASE_URL) {
      console.log("Database not configured, returning mock response")
      return NextResponse.json({
        success: true,
        sessionId: `proposal_${uuidv4()}`,
        proposalId: Math.floor(Math.random() * 10000),
        message: "Proposal form submitted successfully (mock response - database not configured)",
      })
    }

    // Generate unique session ID
    const sessionId = `proposal_${uuidv4()}`
    const proposalId = await createProposalForm(sessionId, quoteData, formData)

    // Save personal details
    await savePersonalDetails(proposalId, formData)

    // Save occupation details
    await saveOccupationDetails(proposalId, formData)

    // Save nominee details
    await saveNomineeDetails(proposalId, formData)

    // Save health details
    await saveHealthDetails(proposalId, formData)

    // Save declarations
    await saveDeclarations(proposalId, formData)

    // Save uploaded documents info
    await saveDocuments(proposalId, uploadedDocuments)

    return NextResponse.json({
      success: true,
      sessionId,
      proposalId,
      message: "Proposal form submitted successfully",
    })
  } catch (error) {
    console.error("Error creating proposal form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create proposal form",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// Get proposal form by session ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Session ID is required",
        },
        { status: 400 }
      )
    }

    const proposal = await getProposalForm(sessionId)
    if (!proposal) {
      return NextResponse.json(
        {
          success: false,
          message: "Proposal form not found",
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      proposal,
    })
  } catch (error) {
    console.error("Error fetching proposal form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch proposal form",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// Update proposal form
export async function PUT(request: Request) {
  try {
    const { sessionId, formData, uploadedDocuments } = await request.json()

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Session ID is required",
        },
        { status: 400 }
      )
    }

    const proposal = await getProposalForm(sessionId)
    if (!proposal) {
      return NextResponse.json(
        {
          success: false,
          message: "Proposal form not found",
        },
        { status: 404 }
      )
    }

    // Update personal details
    await updatePersonalDetails(proposal.id, formData)

    // Update occupation details
    await updateOccupationDetails(proposal.id, formData)

    // Update nominee details
    await updateNomineeDetails(proposal.id, formData)

    // Update health details
    await updateHealthDetails(proposal.id, formData)

    // Update declarations
    await updateDeclarations(proposal.id, formData)

    // Update documents if provided
    if (uploadedDocuments) {
      await updateDocuments(proposal.id, uploadedDocuments)
    }

    return NextResponse.json({
      success: true,
      message: "Proposal form updated successfully",
    })
  } catch (error) {
    console.error("Error updating proposal form:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update proposal form",
        error: error.message,
      },
      { status: 500 }
    )
  }
}

// Helper functions
async function createProposalForm(sessionId: string, quoteData: any, formData: any) {
  const result = await sql`
    INSERT INTO proposal_forms (
      session_id,
      quote_id,
      plan_name,
      company_name,
      premium_amount,
      coverage_amount,
      status
    ) VALUES (
      ${sessionId},
      ${quoteData?.id || null},
      ${quoteData?.planName || ""},
      ${quoteData?.companyName || ""},
      ${quoteData?.premium || 0},
      ${quoteData?.coverageAmount || 0},
      'draft'
    ) RETURNING id
  `
  return result[0].id
}

async function savePersonalDetails(proposalId: number, formData: any) {
  await sql`
    INSERT INTO proposal_personal_details (
      proposal_form_id,
      full_name,
      preferred_identity_proof,
      preferred_age_proof,
      preferred_address_proof,
      politically_exposed_person,
      criminal_offense_record,
      marital_status,
      highest_education,
      mobile_number,
      email_id,
      pan_number,
      address_line_1,
      address_line_2,
      address_line_3,
      landmark,
      pin_code,
      city,
      state,
      permanent_address_same_as_communication,
      e_insurance_account_exists
    ) VALUES (
      ${proposalId},
      ${formData.fullName || ""},
      ${formData.preferredIdentityProof || ""},
      ${formData.preferredAgeProof || ""},
      ${formData.preferredAddressProof || ""},
      ${formData.politicallyExposedPerson || false},
      ${formData.criminalOffenseRecord || false},
      ${formData.maritalStatus || ""},
      ${formData.highestEducation || ""},
      ${formData.mobileNumber || ""},
      ${formData.emailId || ""},
      ${formData.panNumber || ""},
      ${formData.addressLine1 || ""},
      ${formData.addressLine2 || ""},
      ${formData.addressLine3 || ""},
      ${formData.landmark || ""},
      ${formData.pinCode || ""},
      ${formData.city || ""},
      ${formData.state || ""},
      ${formData.permanentAddressSameAsCommunication || true},
      ${formData.eInsuranceAccountExists || false}
    )
  `
}

async function saveOccupationDetails(proposalId: number, formData: any) {
  await sql`
    INSERT INTO proposal_occupation_details (
      proposal_form_id,
      occupation,
      engaged_in_specified_industries,
      organization_name,
      organization_type,
      annual_income
    ) VALUES (
      ${proposalId},
      ${formData.occupation || ""},
      ${formData.engagedInSpecifiedIndustries || false},
      ${formData.organizationName || ""},
      ${formData.organizationType || ""},
      ${formData.annualIncome || 0}
    )
  `
}

async function saveNomineeDetails(proposalId: number, formData: any) {
  await sql`
    INSERT INTO proposal_nominee_details (
      proposal_form_id,
      relationship_with_nominee,
      nominee_first_name,
      nominee_last_name,
      nominee_date_of_birth,
      nominee_additional_details
    ) VALUES (
      ${proposalId},
      ${formData.relationshipWithNominee || ""},
      ${formData.nomineeFirstName || ""},
      ${formData.nomineeLastName || ""},
      ${formData.nomineeDateOfBirth || null},
      ${formData.nomineeAdditionalDetails || ""}
    )
  `
}

async function saveHealthDetails(proposalId: number, formData: any) {
  await sql`
    INSERT INTO proposal_health_details (
      proposal_form_id,
      weight_kg,
      height_feet,
      height_inches,
      tobacco_consumption,
      alcohol_consumption_last_year,
      narcotics_consumption,
      hazardous_occupation,
      armed_forces_employment,
      hospitalization_history,
      hypertension,
      heart_disease,
      heart_surgery,
      diabetes,
      respiratory_disorders,
      nervous_disorders,
      gastrointestinal_disorders,
      liver_disorders,
      genitourinary_disorders,
      cancer_history,
      hiv_infection,
      blood_disorders,
      psychiatric_illness,
      other_disorders,
      congenital_defects,
      family_history_disorders,
      medical_treatment_last_two_years,
      weight_change_last_six_months
    ) VALUES (
      ${proposalId},
      ${formData.weightKg || 0},
      ${formData.heightFeet || 0},
      ${formData.heightInches || 0},
      ${formData.tobaccoConsumption ?? false},
      ${formData.alcoholConsumptionLastYear ?? false},
      ${formData.narcoticsConsumption ?? false},
      ${formData.hazardousOccupation ?? false},
      ${formData.armedForcesEmployment ?? false},
      ${formData.hospitalizationHistory ?? false},
      ${formData.hypertension ?? false},
      ${formData.heartDisease ?? false},
      ${formData.heartSurgery ?? false},
      ${formData.diabetes ?? false},
      ${formData.respiratoryDisorders ?? false},
      ${formData.nervousDisorders ?? false},
      ${formData.gastrointestinalDisorders ?? false},
      ${formData.liverDisorders ?? false},
      ${formData.genitourinaryDisorders ?? false},
      ${formData.cancerHistory ?? false},
      ${formData.hivInfection ?? false},
      ${formData.bloodDisorders ?? false},
      ${formData.psychiatricIllness ?? false},
      ${formData.otherDisorders ?? false},
      ${formData.congenitalDefects ?? false},
      ${formData.familyHistoryDisorders ?? false},
      ${formData.medicalTreatmentLastTwoYears ?? false},
      ${formData.weightChangeLastSixMonths ?? false}
    )
  `
}

async function saveDeclarations(proposalId: number, formData: any) {
  await sql`
    INSERT INTO proposal_declarations (
      proposal_form_id,
      declaration_accepted,
      electronic_document_preference,
      iib_authorization,
      iib_quick_filling
    ) VALUES (
      ${proposalId},
      ${formData.declarationAccepted || false},
      ${formData.electronicDocumentPreference || true},
      ${formData.iibAuthorization || false},
      ${formData.iibQuickFilling || false}
    )
  `
}

async function saveDocuments(proposalId: number, uploadedDocuments: Record<string, File[]>) {
  for (const [documentType, files] of Object.entries(uploadedDocuments)) {
    for (const file of files) {
      await sql`
        INSERT INTO proposal_documents (
          proposal_form_id,
          document_type,
          file_name,
          file_size,
          file_type,
          upload_status
        ) VALUES (
          ${proposalId},
          ${documentType},
          ${file.name},
          ${file.size},
          ${file.type},
          'uploaded'
        )
      `
    }
  }
}

async function getProposalForm(sessionId: string) {
  const result = await sql`
    SELECT 
      pf.*,
      pd.full_name,
      pd.mobile_number,
      pd.email_id,
      pd.pan_number,
      pd.address_line_1,
      pd.city,
      pd.state,
      pd.pin_code,
      od.occupation,
      od.organization_name,
      od.annual_income,
      nd.relationship_with_nominee,
      nd.nominee_first_name,
      nd.nominee_last_name,
      hd.weight_kg,
      hd.height_feet,
      hd.height_inches,
      dec.declaration_accepted,
      dec.electronic_document_preference
    FROM proposal_forms pf
    LEFT JOIN proposal_personal_details pd ON pf.id = pd.proposal_form_id
    LEFT JOIN proposal_occupation_details od ON pf.id = od.proposal_form_id
    LEFT JOIN proposal_nominee_details nd ON pf.id = nd.proposal_form_id
    LEFT JOIN proposal_health_details hd ON pf.id = hd.proposal_form_id
    LEFT JOIN proposal_declarations dec ON pf.id = dec.proposal_form_id
    WHERE pf.session_id = ${sessionId}
  `
  return result[0] || null
}

async function updatePersonalDetails(proposalId: number, formData: any) {
  await sql`
    UPDATE proposal_personal_details SET
      full_name = ${formData.fullName || ""},
      preferred_identity_proof = ${formData.preferredIdentityProof || ""},
      preferred_age_proof = ${formData.preferredAgeProof || ""},
      preferred_address_proof = ${formData.preferredAddressProof || ""},
      politically_exposed_person = ${formData.politicallyExposedPerson || false},
      criminal_offense_record = ${formData.criminalOffenseRecord || false},
      marital_status = ${formData.maritalStatus || ""},
      highest_education = ${formData.highestEducation || ""},
      mobile_number = ${formData.mobileNumber || ""},
      email_id = ${formData.emailId || ""},
      pan_number = ${formData.panNumber || ""},
      address_line_1 = ${formData.addressLine1 || ""},
      address_line_2 = ${formData.addressLine2 || ""},
      address_line_3 = ${formData.addressLine3 || ""},
      landmark = ${formData.landmark || ""},
      pin_code = ${formData.pinCode || ""},
      city = ${formData.city || ""},
      state = ${formData.state || ""},
      permanent_address_same_as_communication = ${formData.permanentAddressSameAsCommunication || true},
      e_insurance_account_exists = ${formData.eInsuranceAccountExists || false},
      updated_at = CURRENT_TIMESTAMP
    WHERE proposal_form_id = ${proposalId}
  `
}

async function updateOccupationDetails(proposalId: number, formData: any) {
  await sql`
    UPDATE proposal_occupation_details SET
      occupation = ${formData.occupation || ""},
      engaged_in_specified_industries = ${formData.engagedInSpecifiedIndustries || false},
      organization_name = ${formData.organizationName || ""},
      organization_type = ${formData.organizationType || ""},
      annual_income = ${formData.annualIncome || 0},
      updated_at = CURRENT_TIMESTAMP
    WHERE proposal_form_id = ${proposalId}
  `
}

async function updateNomineeDetails(proposalId: number, formData: any) {
  await sql`
    UPDATE proposal_nominee_details SET
      relationship_with_nominee = ${formData.relationshipWithNominee || ""},
      nominee_first_name = ${formData.nomineeFirstName || ""},
      nominee_last_name = ${formData.nomineeLastName || ""},
      nominee_date_of_birth = ${formData.nomineeDateOfBirth || null},
      nominee_additional_details = ${formData.nomineeAdditionalDetails || ""},
      updated_at = CURRENT_TIMESTAMP
    WHERE proposal_form_id = ${proposalId}
  `
}

async function updateHealthDetails(proposalId: number, formData: any) {
  await sql`
    UPDATE proposal_health_details SET
      weight_kg = ${formData.weightKg || 0},
      height_feet = ${formData.heightFeet || 0},
      height_inches = ${formData.heightInches || 0},
      tobacco_consumption = ${formData.tobaccoConsumption ?? false},
      alcohol_consumption_last_year = ${formData.alcoholConsumptionLastYear ?? false},
      narcotics_consumption = ${formData.narcoticsConsumption ?? false},
      hazardous_occupation = ${formData.hazardousOccupation ?? false},
      armed_forces_employment = ${formData.armedForcesEmployment ?? false},
      hospitalization_history = ${formData.hospitalizationHistory ?? false},
      hypertension = ${formData.hypertension ?? false},
      heart_disease = ${formData.heartDisease ?? false},
      heart_surgery = ${formData.heartSurgery ?? false},
      diabetes = ${formData.diabetes ?? false},
      respiratory_disorders = ${formData.respiratoryDisorders ?? false},
      nervous_disorders = ${formData.nervousDisorders ?? false},
      gastrointestinal_disorders = ${formData.gastrointestinalDisorders ?? false},
      liver_disorders = ${formData.liverDisorders ?? false},
      genitourinary_disorders = ${formData.genitourinaryDisorders ?? false},
      cancer_history = ${formData.cancerHistory ?? false},
      hiv_infection = ${formData.hivInfection ?? false},
      blood_disorders = ${formData.bloodDisorders ?? false},
      psychiatric_illness = ${formData.psychiatricIllness ?? false},
      other_disorders = ${formData.otherDisorders ?? false},
      congenital_defects = ${formData.congenitalDefects ?? false},
      family_history_disorders = ${formData.familyHistoryDisorders ?? false},
      medical_treatment_last_two_years = ${formData.medicalTreatmentLastTwoYears ?? false},
      weight_change_last_six_months = ${formData.weightChangeLastSixMonths ?? false},
      updated_at = CURRENT_TIMESTAMP
    WHERE proposal_form_id = ${proposalId}
  `
}

async function updateDeclarations(proposalId: number, formData: any) {
  await sql`
    UPDATE proposal_declarations SET
      declaration_accepted = ${formData.declarationAccepted || false},
      electronic_document_preference = ${formData.electronicDocumentPreference || true},
      iib_authorization = ${formData.iibAuthorization || false},
      iib_quick_filling = ${formData.iibQuickFilling || false},
      updated_at = CURRENT_TIMESTAMP
    WHERE proposal_form_id = ${proposalId}
  `
}

async function updateDocuments(proposalId: number, uploadedDocuments: Record<string, File[]>) {
  // Delete existing documents for this proposal
  await sql`DELETE FROM proposal_documents WHERE proposal_form_id = ${proposalId}`
  
  // Insert new documents
  await saveDocuments(proposalId, uploadedDocuments)
}
