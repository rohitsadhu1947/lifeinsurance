"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Upload,
  Camera,
  FileText,
  Shield,
  User,
  Heart,
  CreditCard,
  AlertCircle,
  Info,
  Edit,
  ChevronDown,
  ChevronUp,
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
  existingPolicy: string
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
  cancer: boolean | null
  kidneyDisease: boolean | null
  liverDisease: boolean | null
  tuberculosis: boolean | null
  asthma: boolean | null
  alcoholConsumption: boolean | null

  // Declarations
  declarationAccepted: boolean
  electronicDocumentPreference: boolean
  iibAuthorization: boolean
  iibQuickFilling: boolean
}

function ProposalFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [currentSubStep, setCurrentSubStep] = useState(1)
  const [formData, setFormData] = useState<ProposalFormData>({
    // Personal Details
    fullName: "",
    preferredIdentityProof: "",
    preferredAgeProof: "",
    preferredAddressProof: "",
    politicallyExposedPerson: false,
    criminalOffenseRecord: false,
    maritalStatus: "",
    highestEducation: "",
    mobileNumber: "",
    emailId: "",
    panNumber: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
    existingPolicy: "",
    permanentAddressSameAsCommunication: true,
    eInsuranceAccountExists: false,

    // Occupation Details
    occupation: "",
    engagedInSpecifiedIndustries: null,
    organizationName: "",
    organizationType: "",
    annualIncome: 0,

    // Nominee Details
    relationshipWithNominee: "",
    nomineeFirstName: "",
    nomineeLastName: "",
    nomineeDateOfBirth: "",
    nomineeAdditionalDetails: "",
    nomineeContactNumber: "",
    nomineeEmail: "",

    // Health Details
    weightKg: 0,
    heightFeet: 0,
    heightInches: 0,
    tobaccoConsumption: false,
    alcoholConsumptionLastYear: false,
    narcoticsConsumption: false,
    hazardousOccupation: false,
    armedForcesEmployment: false,
    hospitalizationHistory: false,
    hypertension: false,
    heartDisease: false,
    heartSurgery: false,
    diabetes: false,
    respiratoryDisorders: false,
    nervousDisorders: false,
    gastrointestinalDisorders: false,
    liverDisorders: false,
    genitourinaryDisorders: false,
    cancerHistory: false,
    hivInfection: false,
    bloodDisorders: false,
    psychiatricIllness: false,
    otherDisorders: false,
    congenitalDefects: false,
    familyHistoryDisorders: false,
    medicalTreatmentLastTwoYears: false,
    weightChangeLastSixMonths: false,
    cancer: false,
    kidneyDisease: false,
    liverDisease: false,
    tuberculosis: false,
    asthma: false,
    alcoholConsumption: false,

    // Declarations
    declarationAccepted: false,
    electronicDocumentPreference: true,
    iibAuthorization: false,
    iibQuickFilling: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({})
  const [quoteData, setQuoteData] = useState(null)

  const steps = [
    { id: 1, name: "Life Assured Details", icon: User },
    { id: 2, name: "Health Details", icon: Heart },
    { id: 3, name: "Payment", icon: CreditCard },
  ]

  const subSteps = [
    { id: 1, name: "Personal Details" },
    { id: 2, name: "Occupation Details" },
    { id: 3, name: "Nominee Details" },
  ]

  useEffect(() => {
    // Get quote data from URL parameters
    const quoteId = searchParams.get("quoteId")
    const planName = searchParams.get("planName")
    const companyName = searchParams.get("companyName")
    const companyLogo = searchParams.get("companyLogo")
    const premium = searchParams.get("premium")
    const coverageAmount = searchParams.get("coverageAmount")

    // Try to get full quote data from localStorage first
    const storedQuoteData = localStorage.getItem("quote-data")
    if (storedQuoteData) {
      try {
        const parsedQuoteData = JSON.parse(storedQuoteData)
        setQuoteData(parsedQuoteData)
      } catch (error) {
        console.error("Error parsing stored quote data:", error)
      }
    }

    // Fallback to URL parameters if no stored data
    if (!storedQuoteData && quoteId) {
      setQuoteData({
        id: quoteId,
        planName: planName || "",
        companyName: companyName || "",
        companyLogo: companyLogo || "INS",
        premium: parseFloat(premium || "0"),
        coverageAmount: parseFloat(coverageAmount || "0"),
      })
    }

    // Check if user is coming from verification page (editing) vs starting new proposal
    const isEditingFromVerification = searchParams.get("edit") === "true"
    
    // Load saved form data from localStorage (only when editing from verification page)
    const savedFormData = localStorage.getItem("proposal-form-data")
    if (savedFormData && isEditingFromVerification) {
      try {
        const parsedData = JSON.parse(savedFormData)
        // Extract step information if available
        const { currentStep: savedStep, currentSubStep: savedSubStep, ...formDataOnly } = parsedData
        
        setFormData(formDataOnly)
        
        // Restore step information if available
        if (savedStep) {
          setCurrentStep(savedStep)
        }
        if (savedSubStep) {
          setCurrentSubStep(savedSubStep)
        }
        
        console.log("Editing from verification page - loaded saved form data:", formDataOnly)
        console.log("Restored to step:", savedStep, "sub-step:", savedSubStep)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
        // Fallback to step 1 if parsing fails
        setCurrentStep(1)
        setCurrentSubStep(1)
      }
    } else {
      // New proposal or no saved data - always start from step 1
      setCurrentStep(1)
      setCurrentSubStep(1)
      console.log("Starting new proposal from step 1")
      
      // Clear any existing saved data for new proposals
      if (savedFormData && !isEditingFromVerification) {
        localStorage.removeItem("proposal-form-data")
        console.log("Cleared existing saved data for new proposal")
      }
    }
  }, [searchParams])

  const handleInputChange = (field: keyof ProposalFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (currentSubStep === 1) {
        // Personal Details validation
        if (!formData.fullName.trim()) {
          newErrors.fullName = "Full name is required"
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
          newErrors.fullName = "Name should only contain letters and spaces"
        }
        
        // Email validation
        if (!formData.emailId.trim()) {
          newErrors.emailId = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId.trim())) {
          newErrors.emailId = "Please enter a valid email address"
        }
        
        // Mobile Number validation
        if (!formData.mobileNumber.trim()) {
          newErrors.mobileNumber = "Mobile number is required"
        } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
          newErrors.mobileNumber = "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
        }
        
        // Education validation
        if (!formData.highestEducation.trim()) {
          newErrors.highestEducation = "Education is required"
        }
        
        // Existing Policy validation
        if (!formData.existingPolicy) {
          newErrors.existingPolicy = "Please select if you have an existing policy"
        }
      } else if (currentSubStep === 2) {
        // Occupation Details validation
        if (!formData.occupation.trim()) {
          newErrors.occupation = "Occupation is required"
        }
        
        if (!formData.organizationName.trim()) {
          newErrors.organizationName = "Organization name is required"
        } else if (!/^[a-zA-Z0-9\s&.,-]+$/.test(formData.organizationName.trim())) {
          newErrors.organizationName = "Organization name should only contain letters, numbers, spaces, and common punctuation"
        }
        
        if (!formData.organizationType.trim()) {
          newErrors.organizationType = "Organization type is required"
        }
        
        if (!formData.annualIncome || formData.annualIncome <= 0) {
          newErrors.annualIncome = "Annual income is required"
        }
        
        if (formData.engagedInSpecifiedIndustries === null) {
          newErrors.engagedInSpecifiedIndustries = "Please select if you work in high-risk industries"
        }
      } else if (currentSubStep === 3) {
        // Nominee Details validation
        if (!formData.relationshipWithNominee.trim()) newErrors.relationshipWithNominee = "Relationship is required"
        
        // Nominee First Name validation
        if (!formData.nomineeFirstName.trim()) {
          newErrors.nomineeFirstName = "Nominee first name is required"
        } else if (!/^[a-zA-Z\s]+$/.test(formData.nomineeFirstName.trim())) {
          newErrors.nomineeFirstName = "Name should only contain letters and spaces"
        }
        
        // Nominee Last Name validation
        if (!formData.nomineeLastName.trim()) {
          newErrors.nomineeLastName = "Nominee last name is required"
        } else if (!/^[a-zA-Z\s]+$/.test(formData.nomineeLastName.trim())) {
          newErrors.nomineeLastName = "Name should only contain letters and spaces"
        }
        
        if (!formData.nomineeDateOfBirth.trim()) newErrors.nomineeDateOfBirth = "Nominee date of birth is required"
        
        // Nominee Contact Number validation (optional)
        if (formData.nomineeContactNumber && formData.nomineeContactNumber.trim()) {
          if (!/^[6-9]\d{9}$/.test(formData.nomineeContactNumber.trim())) {
            newErrors.nomineeContactNumber = "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
          }
        }
        
        // Nominee Email validation (optional)
        if (formData.nomineeEmail && formData.nomineeEmail.trim()) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.nomineeEmail.trim())) {
            newErrors.nomineeEmail = "Please enter a valid email address"
          }
        }
      }
    } else if (currentStep === 2) {
      // Health Details validation
      if (!formData.weightKg || formData.weightKg <= 0) newErrors.weightKg = "Weight is required"
      if (!formData.heightFeet || formData.heightFeet <= 0) newErrors.heightFeet = "Height (feet) is required"
      if (!formData.heightInches || formData.heightInches < 0) newErrors.heightInches = "Height (inches) is required"
    } else if (currentStep === 3) {
      // Payment validation
      if (!formData.declarationAccepted) newErrors.declarationAccepted = "You must accept the declaration"
      
      // Document upload validation
      if (!uploadedDocuments.pan_card) {
        newErrors.pan_card = "PAN Card document is required"
      }
      if (!uploadedDocuments.address_proof) {
        newErrors.address_proof = "Address Proof document is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep === 1 && currentSubStep < 3) {
        setCurrentSubStep(currentSubStep + 1)
      } else if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
        setCurrentSubStep(1)
      } else if (currentStep === 3) {
        // Handle form submission
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (currentStep === 1 && currentSubStep > 1) {
      setCurrentSubStep(currentSubStep - 1)
    } else if (currentStep === 2) {
      // Go back to Nominee Details (Step 1, Sub-step 3)
      setCurrentStep(1)
      setCurrentSubStep(3)
    } else if (currentStep === 3) {
      // Go back to Health Details (Step 2)
      setCurrentStep(2)
      setCurrentSubStep(1)
    } else {
      // Go back to results page
      router.back()
    }
  }

  const handleFileUpload = (documentType: string, file: File) => {
    setUploadedDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumberToWords = (num: number) => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ]
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

    if (num === 0) return "Zero"
    if (num < 20) return ones[num]
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
    if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + formatNumberToWords(num % 100) : "")
    if (num < 100000) return formatNumberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + formatNumberToWords(num % 1000) : "")
    if (num < 10000000) return formatNumberToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? " " + formatNumberToWords(num % 100000) : "")
    return formatNumberToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? " " + formatNumberToWords(num % 10000000) : "")
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    // Save form data and current step to localStorage for verification page
    const formDataWithStep = {
      ...formData,
      currentStep,
      currentSubStep
    }
    localStorage.setItem("proposal-form-data", JSON.stringify(formDataWithStep))
    
    // Also save quote data to localStorage for confirmation page
    if (quoteData) {
      localStorage.setItem("quote-data", JSON.stringify(quoteData))
    }
    
    // Redirect to verification page
    router.push("/verification")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Professional Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">ICE by Ensuredit</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Simple Progress Bar - Hidden for clean look */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
              <div className="text-sm text-gray-600">
                Step {currentStep === 1 ? currentSubStep : currentStep + 2} of {steps.length + 2}
              </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Form + Plan Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {currentStep === 1 && currentSubStep === 1 && (
                <PersonalDetailsStep 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                  errors={errors} 
                />
              )}
              {currentStep === 1 && currentSubStep === 2 && (
                <OccupationDetailsStep 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                  errors={errors} 
                />
              )}
              {currentStep === 1 && currentSubStep === 3 && (
                  <NomineeDetailsStep
                    formData={formData}
                    onInputChange={handleInputChange}
                    errors={errors}
                  />
              )}
              {currentStep === 2 && <HealthDetailsStep formData={formData} onInputChange={handleInputChange} errors={errors} />}
              {currentStep === 3 && (
                <PaymentStep
                  formData={formData}
                  onInputChange={handleInputChange}
                  errors={errors}
                  onFileUpload={handleFileUpload}
                  uploadedDocuments={uploadedDocuments}
                />
              )}
            </div>
          </div>

          {/* Right Column - Plan Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Plan Summary</h3>
              </div>

              {/* Plan Details Card */}
              {quoteData && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-lg font-bold text-blue-600">{quoteData.companyLogo || "INS"}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{quoteData.companyName}</h4>
                      <p className="text-xs text-gray-600">{quoteData.planName}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Cover:</span>
                      <p className="font-semibold text-gray-900">{formatCurrency(quoteData.coverageAmount)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Pay Frequency:</span>
                      <p className="font-semibold text-gray-900">Yearly</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Cover upto:</span>
                      <p className="font-semibold text-gray-900">65 Yrs</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Pay Term:</span>
                      <p className="font-semibold text-gray-900">10 Yrs</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Premium Breakup */}
              {quoteData && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Premium Breakup</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Basic Premium:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(quoteData.premium)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payable Amount:</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(quoteData.premium)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between">
            {/* Previous Button */}
            <div>
              {(currentStep > 1 || (currentStep === 1 && currentSubStep > 1)) && (
                <button
                  onClick={prevStep}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>
                    {currentStep === 1 && currentSubStep === 2 && "Back to Personal Details"}
                    {currentStep === 1 && currentSubStep === 3 && "Back to Occupation Details"}
                    {currentStep === 2 && "Back to Nominee Details"}
                    {currentStep === 3 && "Back to Health Details"}
                  </span>
                </button>
              )}
            </div>

            {/* Next/Submit Button */}
            <div className="flex space-x-3">
              {currentStep === 3 ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center space-x-2"
                >
                  <span>
                    {currentStep === 1 && currentSubStep < 3
                      ? `Proceed to ${subSteps[currentSubStep].name}`
                      : currentStep < 3
                        ? `Proceed to ${steps[currentStep].name}`
                        : "Next"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Personal Details Step Component
function PersonalDetailsStep({
  formData,
  onInputChange,
  errors,
}: {
  formData: ProposalFormData
  onInputChange: (field: keyof ProposalFormData, value: any) => void
  errors: Record<string, string>
}) {
  const identityProofOptions = ["Masked Aadhaar", "Driving License", "Passport", "Voter ID"]
  const ageProofOptions = [
    "Masked Aadhaar",
    "PAN card",
    "Passport",
    "Driving License",
    "School/College Record",
    "Government Employee ID",
    "Government Registered document or ID Proof GSR",
    "Employers Certificate",
    "Defence ID Card",
    "Municipal Record",
  ]
  const addressProofOptions = ["Masked Aadhaar", "Driving License", "Passport", "Voter ID"]
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"]
  const educationOptions = ["Below 10th", "10th Pass", "12th Pass", "Graduation", "Post Graduation", "Professional Degree"]

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center space-x-3 mb-6">
        <ArrowLeft className="h-5 w-5 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900">Personal Details</h3>
      </div>

      {/* Orange Banner */}
      <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-6">
        <p className="text-orange-800 text-sm font-medium">Please enter your personal details as per ID proof</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name as per your ID Proof *</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => onInputChange("fullName", e.target.value)}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.fullName ? "border-red-500" : ""
          }`}
          placeholder="Enter your full name"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Id *</label>
        <input
          type="email"
          value={formData.emailId}
          onChange={(e) => onInputChange("emailId", e.target.value)}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.emailId ? "border-red-500" : ""
          }`}
          placeholder="Enter your email"
        />
        {errors.emailId && <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>}
      </div>

      {/* Mobile Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
        <input
          type="tel"
          value={formData.mobileNumber}
          onChange={(e) => onInputChange("mobileNumber", e.target.value)}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.mobileNumber ? "border-red-500" : ""
          }`}
          placeholder="Enter your mobile number"
          maxLength="10"
        />
        {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
      </div>

      {/* Education */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Education *</label>
        <select
          value={formData.highestEducation}
          onChange={(e) => onInputChange("highestEducation", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Education</option>
          {educationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.highestEducation && <p className="text-red-500 text-sm mt-1">{errors.highestEducation}</p>}
      </div>

      {/* Existing Policy Question */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Do you already have this company policy?</p>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="existingPolicy"
              value="yes"
              checked={formData.existingPolicy === "yes"}
              onChange={(e) => onInputChange("existingPolicy", e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="existingPolicy"
              value="no"
              checked={formData.existingPolicy === "no"}
              onChange={(e) => onInputChange("existingPolicy", e.target.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
        {errors.existingPolicy && <p className="text-red-500 text-sm mt-1">{errors.existingPolicy}</p>}
      </div>
    </div>
  )
}

// Occupation Details Step Component
function OccupationDetailsStep({
  formData,
  onInputChange,
  errors,
}: {
  formData: ProposalFormData
  onInputChange: (field: keyof ProposalFormData, value: any) => void
  errors: Record<string, string>
}) {
  const occupationOptions = [
    "Salaried",
    "Self-Employed",
    "Business",
    "Professional",
    "Retired",
    "Student",
    "Housewife",
    "Other",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Occupation Details</h3>
      </div>

      {/* Occupation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Occupation *</label>
        <select
          value={formData.occupation}
          onChange={(e) => onInputChange("occupation", e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Occupation</option>
          {occupationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
      </div>

      {/* Organization Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name of the Organisation *</label>
        <input
          type="text"
          value={formData.organizationName}
          onChange={(e) => onInputChange("organizationName", e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.organizationName ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Enter organization name"
        />
        {errors.organizationName && <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>}
      </div>

      {/* Type of Organization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type of Organization *</label>
        <select
          value={formData.organizationType || ""}
          onChange={(e) => onInputChange("organizationType", e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Organization Type</option>
          <option value="Private Limited">Private Limited</option>
          <option value="Public Limited">Public Limited</option>
          <option value="Partnership">Partnership</option>
          <option value="Sole Proprietorship">Sole Proprietorship</option>
          <option value="LLP">Limited Liability Partnership (LLP)</option>
          <option value="Government">Government</option>
          <option value="PSU">Public Sector Undertaking (PSU)</option>
          <option value="NGO">Non-Governmental Organization</option>
          <option value="Other">Other</option>
        </select>
        {errors.organizationType && <p className="text-red-500 text-sm mt-1">{errors.organizationType}</p>}
      </div>

      {/* Annual Income */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income *</label>
        <select
          value={formData.annualIncome || ""}
          onChange={(e) => onInputChange("annualIncome", Number(e.target.value))}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.annualIncome ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Select Annual Income</option>
          <option value="300000">₹3,00,000 - ₹5,00,000</option>
          <option value="750000">₹5,00,000 - ₹10,00,000</option>
          <option value="1500000">₹10,00,000 - ₹20,00,000</option>
          <option value="2500000">₹20,00,000 - ₹50,00,000</option>
          <option value="5000000">Above ₹50,00,000</option>
        </select>
        {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>}
      </div>

      {/* High-Risk Industries Question */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Are you employed in any high-risk industries such as:</p>
        <div className="text-xs text-gray-600 mb-3 pl-4">
          • Mining, Oil & Gas, Chemical, Aviation, Defense, or similar hazardous industries
        </div>
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="engagedInSpecifiedIndustries"
              value="true"
              checked={formData.engagedInSpecifiedIndustries === true}
              onChange={() => onInputChange("engagedInSpecifiedIndustries", true)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="engagedInSpecifiedIndustries"
              value="false"
              checked={formData.engagedInSpecifiedIndustries === false}
              onChange={() => onInputChange("engagedInSpecifiedIndustries", false)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
        {errors.engagedInSpecifiedIndustries && <p className="text-red-500 text-sm mt-1">{errors.engagedInSpecifiedIndustries}</p>}
      </div>
    </div>
  )
}

// Nominee Details Step Component
function NomineeDetailsStep({
  formData,
  onInputChange,
  errors,
}: {
  formData: ProposalFormData
  onInputChange: (field: keyof ProposalFormData, value: any) => void
  errors: Record<string, string>
}) {
  const relationshipOptions = [
    "Father",
    "Mother",
    "Spouse",
    "Son",
    "Daughter",
    "Brother",
    "Sister",
    "Grandfather",
    "Grandmother",
    "Other",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Nominee Details</h3>
      </div>

      {/* Relationship with Nominee */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Relationship with Nominee</label>
        <select
          value={formData.relationshipWithNominee}
          onChange={(e) => onInputChange("relationshipWithNominee", e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.relationshipWithNominee ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Select relationship</option>
          {relationshipOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.relationshipWithNominee && <p className="text-red-500 text-sm mt-1">{errors.relationshipWithNominee}</p>}
      </div>

      {/* Nominee Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nominee First Name</label>
          <input
            type="text"
            value={formData.nomineeFirstName}
            onChange={(e) => onInputChange("nomineeFirstName", e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.nomineeFirstName ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter first name"
          />
          {errors.nomineeFirstName && <p className="text-red-500 text-sm mt-1">{errors.nomineeFirstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nominee Last Name</label>
          <input
            type="text"
            value={formData.nomineeLastName}
            onChange={(e) => onInputChange("nomineeLastName", e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.nomineeLastName ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter last name"
          />
          {errors.nomineeLastName && <p className="text-red-500 text-sm mt-1">{errors.nomineeLastName}</p>}
        </div>
      </div>

      {/* Nominee Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nominee Date of Birth</label>
        <input
          type="date"
          value={formData.nomineeDateOfBirth}
          onChange={(e) => onInputChange("nomineeDateOfBirth", e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.nomineeDateOfBirth ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.nomineeDateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.nomineeDateOfBirth}</p>}
      </div>

    </div>
  )
}

// Health Details Step Component
function HealthDetailsStep({
  formData,
  onInputChange,
  errors,
}: {
  formData: ProposalFormData
  onInputChange: (field: keyof ProposalFormData, value: any) => void
  errors: Record<string, string>
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-gray-900">Health Details</h3>
      </div>

      {/* Physical Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (in kgs)</label>
          <input
            type="number"
            value={formData.weightKg || ""}
            onChange={(e) => onInputChange("weightKg", Number(e.target.value))}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.weightKg ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter weight"
          />
          {errors.weightKg && <p className="text-red-500 text-sm mt-1">{errors.weightKg}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (in feet)</label>
          <input
            type="number"
            value={formData.heightFeet || ""}
            onChange={(e) => onInputChange("heightFeet", Number(e.target.value))}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.heightFeet ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter height in feet"
          />
          {errors.heightFeet && <p className="text-red-500 text-sm mt-1">{errors.heightFeet}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (in inches)</label>
          <input
            type="number"
            value={formData.heightInches || ""}
            onChange={(e) => onInputChange("heightInches", Number(e.target.value))}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.heightInches ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Enter height in inches"
          />
          {errors.heightInches && <p className="text-red-500 text-sm mt-1">{errors.heightInches}</p>}
        </div>
      </div>

      {/* Health Questions */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Health Questions</h4>
        
        {Object.entries({
          diabetes: "Do you have diabetes?",
          hypertension: "Do you have hypertension?",
          heartDisease: "Do you have any heart disease?",
          cancerHistory: "Do you have any history of cancer?",
          kidneyDisease: "Do you have any kidney disease?",
          liverDisorders: "Do you have any liver disease?",
          tuberculosis: "Do you have tuberculosis?",
          asthma: "Do you have asthma?",
          tobaccoConsumption: "Do you consume tobacco?",
          alcoholConsumptionLastYear: "Do you consume alcohol?",
        }).map(([key, question]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">{question}</span>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={key}
                  value="true"
                  checked={formData[key as keyof ProposalFormData] === true}
                  onChange={() => onInputChange(key as keyof ProposalFormData, true)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={key}
                  value="false"
                  checked={formData[key as keyof ProposalFormData] === false}
                  onChange={() => onInputChange(key as keyof ProposalFormData, false)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Payment Step Component
function PaymentStep({
  formData,
  onInputChange,
  errors,
  onFileUpload,
  uploadedDocuments,
}: {
  formData: ProposalFormData
  onInputChange: (field: keyof ProposalFormData, value: any) => void
  errors: Record<string, string>
  onFileUpload: (documentType: string, file: File) => void
  uploadedDocuments: Record<string, File | null>
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Document Upload & Review</h3>
      </div>

      {/* Document Upload Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Upload className="h-6 w-6 text-blue-600" />
          <h4 className="text-lg font-semibold text-blue-900">Upload Required Documents</h4>
        </div>
        <p className="text-sm text-blue-800 mb-4">
          Upload your Identity and Address proofs here for quicker verification process
        </p>
        <p className="text-xs text-blue-700 mb-6">
          You can upload jpg, png or pdf file formats. Maximum file size limit is 15 MB
        </p>

        <div className="space-y-4">
          {/* Photograph Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photograph</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload photograph</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onFileUpload("photograph", file)
                }}
                className="hidden"
                id="photograph-upload"
              />
              <label htmlFor="photograph-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Choose File</span>
              </label>
            </div>
          </div>

          {/* PAN Card Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PAN Card Document *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload PAN card</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onFileUpload("pan_card", file)
                }}
                className="hidden"
                id="pan-card-upload"
              />
              <label htmlFor="pan-card-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Choose File</span>
              </label>
            </div>
            {errors.pan_card && <p className="text-red-500 text-sm mt-1">{errors.pan_card}</p>}
          </div>

          {/* Address Proof Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Proof Document *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload address proof</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onFileUpload("address_proof", file)
                }}
                className="hidden"
                id="address-proof-upload"
              />
              <label htmlFor="address-proof-upload" className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Choose File</span>
              </label>
            </div>
            {errors.address_proof && <p className="text-red-500 text-sm mt-1">{errors.address_proof}</p>}
          </div>
        </div>
      </div>

      {/* Uploaded Documents Summary */}
      {Object.keys(uploadedDocuments).length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-green-800 mb-2">Uploaded Documents</h4>
          <div className="space-y-2">
            {Object.entries(uploadedDocuments).map(([type, file]) => (
              file && (
                <div key={type} className="flex items-center justify-between text-sm">
                  <span className="text-green-700">{type.replace("_", " ").toUpperCase()}</span>
                  <span className="text-green-600">{file.name}</span>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Declaration Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Declaration</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="declaration"
              checked={formData.declarationAccepted}
              onChange={(e) => onInputChange("declarationAccepted", e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="declaration" className="text-sm text-gray-700">
              I declare that all the information provided by me is true and correct to the best of my knowledge and belief. I understand that any false information may result in the rejection of my application or cancellation of the policy.
            </label>
          </div>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I have read and understood the terms and conditions of the policy and agree to be bound by them.
            </label>
          </div>
        </div>
        {errors.declarationAccepted && (
          <p className="text-red-500 text-sm mt-2">{errors.declarationAccepted}</p>
        )}
      </div>
    </div>
  )
}

// Main Component Export
export default function ProposalFormPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading proposal form...</p>
        </div>
      </div>
    }>
      <ProposalFormContent />
    </Suspense>
  )
}
