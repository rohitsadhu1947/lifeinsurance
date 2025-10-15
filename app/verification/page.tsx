"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Edit,
  Shield,
  User,
  Heart,
  CreditCard,
  FileText,
  AlertCircle,
  Info,
} from "lucide-react"

interface ProposalFormData {
  // Personal Details
  fullName: string
  preferredIdentityProof: string
  preferredAgeProof: string
  preferredAddressProof: string
  politicallyExposedPerson: boolean
  criminalOffenseRecord: boolean
  maritalStatus: string
  highestEducation: string
  mobileNumber: string
  emailId: string
  panNumber: string
  addressLine1: string
  addressLine2: string
  addressLine3: string
  landmark: string
  pinCode: string
  city: string
  state: string
  permanentAddressSameAsCommunication: boolean
  eInsuranceAccountExists: boolean

  // Occupation Details
  occupation: string
  engagedInSpecifiedIndustries: boolean | null
  organizationName: string
  organizationType: string
  annualIncome: number

  // Nominee Details
  relationshipWithNominee: string
  nomineeFirstName: string
  nomineeLastName: string
  nomineeDateOfBirth: string
  nomineeAdditionalDetails: string
  nomineeContactNumber: string
  nomineeEmail: string

  // Health Details
  weightKg: number
  heightFeet: number
  heightInches: number
  tobaccoConsumption: boolean | null
  alcoholConsumptionLastYear: boolean | null
  narcoticsConsumption: boolean | null
  hazardousOccupation: boolean | null
  armedForcesEmployment: boolean | null
  hospitalizationHistory: boolean | null
  hypertension: boolean | null
  heartDisease: boolean | null
  heartSurgery: boolean | null
  diabetes: boolean | null
  respiratoryDisorders: boolean | null
  nervousDisorders: boolean | null
  gastrointestinalDisorders: boolean | null
  liverDisorders: boolean | null
  genitourinaryDisorders: boolean | null
  cancerHistory: boolean | null
  hivInfection: boolean | null
  bloodDisorders: boolean | null
  psychiatricIllness: boolean | null
  otherDisorders: boolean | null
  congenitalDefects: boolean | null
  familyHistoryDisorders: boolean | null
  medicalTreatmentLastTwoYears: boolean | null
  weightChangeLastSixMonths: boolean | null

  // Declarations
  declarationAccepted: boolean
  electronicDocumentPreference: boolean
  iibAuthorization: boolean
  iibQuickFilling: boolean
}

function VerificationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<ProposalFormData | null>(null)
  const [quoteData, setQuoteData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get form data from localStorage or URL params
    const storedFormData = localStorage.getItem("proposal-form-data")
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData))
    }

    // Get quote data from URL params
    const quoteId = searchParams.get("quoteId")
    const planName = searchParams.get("planName")
    const companyName = searchParams.get("companyName")
    const premium = searchParams.get("premium")
    const coverageAmount = searchParams.get("coverageAmount")

    if (quoteId) {
      setQuoteData({
        id: quoteId,
        planName: planName || "",
        companyName: companyName || "",
        premium: parseFloat(premium || "0"),
        coverageAmount: parseFloat(coverageAmount || "0"),
      })
    }

    setLoading(false)
  }, [searchParams])

  const handleEdit = () => {
    // Go back to proposal form with saved data
    router.push("/proposal?edit=true")
  }

  const handleEditPersonalDetails = () => {
    // Save current form data with step info for Personal Details (Step 1, Sub-step 1)
    const formDataWithStep = {
      ...formData,
      currentStep: 1,
      currentSubStep: 1
    }
    localStorage.setItem("proposal-form-data", JSON.stringify(formDataWithStep))
    router.push("/proposal?edit=true")
  }

  const handleEditOccupationDetails = () => {
    // Save current form data with step info for Occupation Details (Step 1, Sub-step 2)
    const formDataWithStep = {
      ...formData,
      currentStep: 1,
      currentSubStep: 2
    }
    localStorage.setItem("proposal-form-data", JSON.stringify(formDataWithStep))
    router.push("/proposal?edit=true")
  }

  const handleEditNomineeDetails = () => {
    // Save current form data with step info for Nominee Details (Step 1, Sub-step 3)
    const formDataWithStep = {
      ...formData,
      currentStep: 1,
      currentSubStep: 3
    }
    localStorage.setItem("proposal-form-data", JSON.stringify(formDataWithStep))
    router.push("/proposal?edit=true")
  }

  const handleEditHealthDetails = () => {
    // Save current form data with step info for Health Details (Step 2)
    const formDataWithStep = {
      ...formData,
      currentStep: 2,
      currentSubStep: 1
    }
    localStorage.setItem("proposal-form-data", JSON.stringify(formDataWithStep))
    router.push("/proposal?edit=true")
  }

  const handleEditDeclarations = () => {
    // Save current form data with step info for Declarations (Step 3)
    const formDataWithStep = {
      ...formData,
      currentStep: 3,
      currentSubStep: 1
    }
    localStorage.setItem("proposal-form-data", JSON.stringify(formDataWithStep))
    router.push("/proposal?edit=true")
  }

  const handleSubmit = async () => {
    if (!formData) return

    try {
      const response = await fetch("/api/proposal/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          quoteData,
          uploadedDocuments: {},
        }),
      })

      const result = await response.json()
      if (result.success) {
        // Clear stored form data
        localStorage.removeItem("proposal-form-data")
        router.push(`/confirmation?proposalId=${result.proposalId}&sessionId=${result.sessionId}`)
      } else {
        alert("Error submitting proposal: " + result.message)
      }
    } catch (error) {
      console.error("Error submitting proposal:", error)
      alert("Error submitting proposal. Please try again.")
    }
  }

  const formatBoolean = (value: boolean | null) => {
    if (value === null) return "Not specified"
    return value ? "Yes" : "No"
  }

  const formatIncome = (income: number) => {
    if (income === 0) return "Not specified"
    if (income === 100000) return "₹1,00,000 - ₹2,50,000"
    if (income === 250000) return "₹2,50,000 - ₹5,00,000"
    if (income === 500000) return "₹5,00,000 - ₹7,50,000"
    if (income === 750000) return "₹7,50,000 - ₹10,00,000"
    if (income === 1000000) return "₹10,00,000 - ₹15,00,000"
    if (income === 1500000) return "₹15,00,000 - ₹20,00,000"
    if (income === 2000000) return "₹20,00,000 - ₹30,00,000"
    if (income === 3000000) return "₹30,00,000 - ₹50,00,000"
    if (income === 5000000) return "₹50,00,000 - ₹1,00,00,000"
    if (income === 10000000) return "Above ₹1,00,00,000"
    return `₹${income.toLocaleString('en-IN')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification details...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Form Data Found</h2>
          <p className="text-gray-600 mb-6">Please fill out the proposal form first.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Edit Details</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Verify Your Details</h1>
                <p className="text-sm text-gray-600">Please review all information before submitting</p>
              </div>
            </div>
            <div className="text-right">
              {quoteData && (
                <>
                  <p className="text-lg font-semibold text-gray-800">Premium: ₹{quoteData.premium}/year</p>
                  <p className="text-sm text-gray-600">Coverage: ₹{quoteData.coverageAmount}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Verification Notice */}
          <div className="bg-blue-50 border border-blue-200 px-8 py-6">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notice</h3>
                <p className="text-blue-800 text-sm">
                  Please carefully review all the information below. Once submitted, changes to your proposal will require 
                  contacting our support team. Ensure all details are accurate and complete.
                </p>
              </div>
            </div>
          </div>

          {/* Form Data Review */}
          <div className="p-8 space-y-8">
            {/* Personal Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Personal Details
                </h3>
                <button
                  onClick={handleEditPersonalDetails}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Full Name:</span>
                  <p className="font-medium">{formData.fullName || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Mobile Number:</span>
                  <p className="font-medium">{formData.mobileNumber || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{formData.emailId || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">PAN Number:</span>
                  <p className="font-medium">{formData.panNumber || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Marital Status:</span>
                  <p className="font-medium">{formData.maritalStatus || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Education:</span>
                  <p className="font-medium">{formData.highestEducation || "Not provided"}</p>
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-600">Address:</span>
                  <p className="font-medium">
                    {[formData.addressLine1, formData.addressLine2, formData.addressLine3]
                      .filter(Boolean)
                      .join(", ") || "Not provided"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formData.city}, {formData.state} - {formData.pinCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Occupation Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Occupation Details
                </h3>
                <button
                  onClick={handleEditOccupationDetails}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Occupation:</span>
                  <p className="font-medium">{formData.occupation || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Organization:</span>
                  <p className="font-medium">{formData.organizationName || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Organization Type:</span>
                  <p className="font-medium">{formData.organizationType || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Annual Income:</span>
                  <p className="font-medium">{formatIncome(formData.annualIncome)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Specified Industries:</span>
                  <p className="font-medium">{formatBoolean(formData.engagedInSpecifiedIndustries)}</p>
                </div>
              </div>
            </div>

            {/* Nominee Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Nominee Details
                </h3>
                <button
                  onClick={handleEditNomineeDetails}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Relationship:</span>
                  <p className="font-medium">{formData.relationshipWithNominee || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Full Name:</span>
                  <p className="font-medium">
                    {formData.nomineeFirstName && formData.nomineeLastName
                      ? `${formData.nomineeFirstName} ${formData.nomineeLastName}`
                      : "Not provided"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Date of Birth:</span>
                  <p className="font-medium">{formData.nomineeDateOfBirth || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Contact Number:</span>
                  <p className="font-medium">{formData.nomineeContactNumber || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <p className="font-medium">{formData.nomineeEmail || "Not provided"}</p>
                </div>
                {formData.nomineeAdditionalDetails && (
                  <div className="md:col-span-2">
                    <span className="text-gray-600">Additional Details:</span>
                    <p className="font-medium">{formData.nomineeAdditionalDetails}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Health Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-blue-600" />
                  Health Details
                </h3>
                <button
                  onClick={handleEditHealthDetails}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-600">Weight:</span>
                  <p className="font-medium">{formData.weightKg > 0 ? `${formData.weightKg} kg` : "Not provided"}</p>
                </div>
                <div>
                  <span className="text-gray-600">Height:</span>
                  <p className="font-medium">
                    {formData.heightFeet > 0 && formData.heightInches >= 0
                      ? `${formData.heightFeet}'${formData.heightInches}"`
                      : "Not provided"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Tobacco Consumption:</span>
                  <p className="font-medium">{formatBoolean(formData.tobaccoConsumption)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Alcohol Consumption:</span>
                  <p className="font-medium">{formatBoolean(formData.alcoholConsumptionLastYear)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Medical Conditions:</span>
                  <p className="font-medium">{formatBoolean(formData.hypertension)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Family History:</span>
                  <p className="font-medium">{formatBoolean(formData.familyHistoryDisorders)}</p>
                </div>
              </div>
            </div>

            {/* Declarations */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Declarations
                </h3>
                <button
                  onClick={handleEditDeclarations}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className={`h-5 w-5 ${formData.declarationAccepted ? "text-green-500" : "text-gray-400"}`} />
                  <span className="text-gray-700">I accept all terms and conditions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className={`h-5 w-5 ${formData.electronicDocumentPreference ? "text-green-500" : "text-gray-400"}`} />
                  <span className="text-gray-700">I prefer electronic documents</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className={`h-5 w-5 ${formData.iibAuthorization ? "text-green-500" : "text-gray-400"}`} />
                  <span className="text-gray-700">I authorize IIB data sharing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleEdit}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Edit className="h-5 w-5" />
                <span>Edit Details</span>
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit Proposal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProposalVerificationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading verification...</p>
        </div>
      </div>
    }>
      <VerificationContent />
    </Suspense>
  )
}
