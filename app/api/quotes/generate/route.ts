import { NextResponse } from "next/server"

// Enhanced EnsuredIT Service with Input Tracking
class EnsuredITService {
  constructor() {
    this.baseURL = process.env.ENSUREDIT_BASE_URL || "https://api-prod.ensuredit.com"
    this.credentials = {
      userId: process.env.ENSUREDIT_USER_ID || "PLInsurancePO",
      password: process.env.ENSUREDIT_PASSWORD || "nQdt8YFE",
      salesChannelUserId: process.env.ENSUREDIT_SALES_CHANNEL_ID || "2757",
      isOtp: false,
    }
    this.origin = process.env.ENSUREDIT_ORIGIN || "https://erp.tecdata.in"
    this.accessToken = null
  }

  convertDateFormat(dateString) {
    try {
      if (dateString.includes("-")) {
        const [year, month, day] = dateString.split("-")
        const convertedDate = `${day}/${month}/${year}`
        console.log(`📅 Date converted: ${dateString} → ${convertedDate}`)
        return convertedDate
      } else {
        console.log(`📅 Date already in correct format: ${dateString}`)
        return dateString
      }
    } catch (error) {
      console.error("❌ Date conversion error:", error)
      return dateString
    }
  }

  calculateAge(dobString) {
    try {
      let birthDate
      if (dobString.includes("-")) {
        birthDate = new Date(dobString)
      } else {
        const [day, month, year] = dobString.split("/")
        birthDate = new Date(year, month - 1, day)
      }

      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      return age
    } catch (error) {
      return "Unknown"
    }
  }

  getRiskProfile(dobString, coverAmount) {
    const age = this.calculateAge(dobString)
    const coverInCrores = coverAmount / 10000000

    if (age < 30 && coverInCrores <= 1) return "LOW_RISK"
    if (age < 40 && coverInCrores <= 2) return "MEDIUM_RISK"
    if (age < 50 && coverInCrores <= 5) return "HIGH_RISK"
    return "VERY_HIGH_RISK"
  }

  async authenticate() {
    try {
      console.log("🔐 Authenticating with EnsuredIT...")

      const response = await fetch(`${this.baseURL}/v3/login/verifyPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: this.origin,
        },
        body: JSON.stringify(this.credentials),
      })
      const data = await response.json()

      if (data.isVerified && data.accessToken) {
        this.accessToken = data.accessToken
        console.log("🎉 Authentication successful!")
        return true
      }

      throw new Error("Authentication failed")
    } catch (error) {
      console.error("💥 Auth error:", error)
      throw error
    }
  }

  async getQuotes(customerData) {
    try {
      if (!this.accessToken) {
        await this.authenticate()
      }

      // Calculate customer profile for logging
      const age = this.calculateAge(customerData.dob)
      const coverInCrores = Number.parseInt(customerData.cover) / 10000000

      console.log("🎯 === INPUT VARIATION TRACKING ===")
      console.log("📊 Customer Profile Analysis:")
      console.log(`👤 Age: ${age} years`)
      console.log(`💰 Cover: ₹${coverInCrores} Crore`)
      console.log(`📍 Location: ${customerData.pincode}`)
      console.log(`📅 DOB Original: ${customerData.dob}`)

      // Convert date format
      const correctedDob = this.convertDateFormat(customerData.dob)
      console.log(`📅 DOB Converted: ${correctedDob}`)

      // Create unique request ID for tracking
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      console.log(`🆔 Request ID: ${requestId}`)

      // Build field data with detailed logging
      const fieldData = [
        {
          id: "fullName",
          parentProperty: "proposerDetails",
          value: customerData.name || `TestUser_${age}y_${coverInCrores}Cr`,
        },
        {
          id: "phoneNumber",
          parentProperty: "proposerDetails",
          value: customerData.phone || "9527119003",
        },
        {
          id: "cover",
          parentProperty: "proposerDetails",
          value: customerData.cover.toString(),
        },
        {
          id: "annualIncome",
          parentProperty: "proposerDetails",
          value: "1000000",
        },
        {
          id: "doYouSmoke",
          parentProperty: "proposerDetails",
          value: "No",
        },
        {
          id: "gender",
          parentProperty: "proposerDetails",
          value: "Male",
        },
        {
          id: "dob",
          parentProperty: "proposerDetails",
          value: correctedDob,
        },
        {
          id: "pincode",
          parentProperty: "proposerDetails",
          value: customerData.pincode,
        },
        {
          id: "educationQualification",
          parentProperty: "proposerDetails",
          value: "Graduate",
        },
        {
          id: "occupation",
          parentProperty: "proposerDetails",
          value: "salaried",
        },
        {
          id: "sameAsProposerDetail",
          parentProperty: "proposerDetails",
          value: "Yes",
        },
        {
          id: "proposerFullName",
          parentProperty: "proposerDetails",
          value: "",
        },
        {
          id: "proposerGender",
          parentProperty: "proposerDetails",
          value: "",
        },
        {
          id: "proposerDob",
          parentProperty: "proposerDetails",
          value: "",
        },
      ]

      console.log("📝 === EXACT PAYLOAD TO ENSUREDIT ===")
      console.log("🔍 Key Fields Being Sent:")
      console.log(`   💰 Cover: ${fieldData.find((f) => f.id === "cover").value}`)
      console.log(`   📅 DOB: ${fieldData.find((f) => f.id === "dob").value}`)
      console.log(`   📍 Pincode: ${fieldData.find((f) => f.id === "pincode").value}`)
      console.log(`   👤 Name: ${fieldData.find((f) => f.id === "fullName").value}`)

      // Add timestamp to detect caching
      const requestTimestamp = new Date().toISOString()
      console.log(`⏰ Request Timestamp: ${requestTimestamp}`)

      const requestPayload = {
        fieldData,
        // Add metadata to detect caching
        _metadata: {
          requestId,
          timestamp: requestTimestamp,
          profileHash: `${age}_${coverInCrores}_${customerData.pincode}`,
        },
      }

      console.log("🚀 Calling EnsuredIT API...")
      const response = await fetch(`${this.baseURL}/v3/getQuote/TERM`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
          Origin: this.origin,
          // Add cache-busting headers
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
        body: JSON.stringify({ fieldData }), // Don't send metadata to EnsuredIT
      })

      console.log("📊 Quote response status:", response.status)
      console.log("📋 Response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Quote API error:", errorText)
        throw new Error(`Quote API failed: ${response.status}`)
      }

      const data = await response.json()

      console.log("✅ === RESPONSE ANALYSIS ===")
      console.log(`🆔 EnsuredIT Quote ID: ${data.id}`)
      console.log(`📊 Quote Plans Count: ${data.quotePlans?.length || 0}`)
      console.log(`⏰ Response Timestamp: ${new Date().toISOString()}`)

      if (data.quotePlans && data.quotePlans.length > 0) {
        console.log("💰 Premium Breakdown:")
        data.quotePlans.forEach((plan, index) => {
          console.log(`   ${index + 1}. ${plan.planData?.companyDisplayName}: ₹${plan.payingAmount}`)
        })
      }

      // Store request tracking info
      const trackingInfo = {
        requestId,
        customerProfile: { age, coverInCrores, pincode: customerData.pincode },
        ensuredItQuoteId: data.id,
        timestamp: requestTimestamp,
        quotesCount: data.quotePlans?.length || 0,
      }

      return this.processQuoteResponse(data, customerData, trackingInfo)
    } catch (error) {
      console.error("💥 Quote generation error:", error)
      throw error
    }
  }

  processQuoteResponse(apiResponse, customerData, trackingInfo) {
    try {
      console.log("🔄 Processing quote response...")
      console.log("📊 Tracking Info:", trackingInfo)

      if (!apiResponse.quotePlans || apiResponse.quotePlans.length === 0) {
        throw new Error("No quotes available from any insurer")
      }

      const processedQuotes = apiResponse.quotePlans.map((quotePlan, index) => {
        const planData = quotePlan.planData || {}
        const amountDetail = quotePlan.amountDetail || {}

        return {
          id: quotePlan.id || index + 1,
          planName: planData.displayName || "Unknown Plan",
          premium: quotePlan.payingAmount || 0,
          policyTerm: planData.policyTerm || "36",
          paymentTerm: planData.paymentTerm || "36",
          paymentFrequency: planData.paymentFrequency || "Yearly",
          companyName: planData.companyDisplayName || "Unknown Insurer",
          companyLogo: this.getCompanyLogo(planData.companyInternalName),
          brochure: planData.brochure || "",
          basePremium: amountDetail.basePremium || quotePlan.payingAmount,
          gst: amountDetail.gst || 0,
          isRecommended: false,
          savings: 0,
          // Add tracking info to each quote
          _tracking: {
            ensuredItPlanId: quotePlan.id,
            requestId: trackingInfo.requestId,
            customerAge: trackingInfo.customerProfile.age,
            coverAmount: trackingInfo.customerProfile.coverInCrores,
          },
        }
      })

      const premiums = processedQuotes.map((q) => q.premium)
      const minPremium = Math.min(...premiums)
      const maxPremium = Math.max(...premiums)

      processedQuotes.forEach((quote) => {
        quote.savings = quote.premium - minPremium
        quote.isRecommended = quote.premium === minPremium
      })

      processedQuotes.sort((a, b) => a.premium - b.premium)

      const result = {
        sessionId: `track_${trackingInfo.requestId}`,
        summary: {
          totalQuotes: processedQuotes.length,
          coverAmount: Number.parseInt(customerData.cover),
          bestPremium: minPremium,
          maxSavings: maxPremium - minPremium,
          insurersCount: new Set(processedQuotes.map((q) => q.companyName)).size,
        },
        quotes: processedQuotes,
        tracking: trackingInfo,
      }

      console.log("🎉 === FINAL QUOTE SUMMARY ===")
      console.log(
        `👤 Age: ${trackingInfo.customerProfile.age}, Cover: ₹${trackingInfo.customerProfile.coverInCrores}Cr`,
      )
      console.log(`💰 Best Premium: ₹${result.summary.bestPremium}`)
      console.log(`📊 Total Quotes: ${result.summary.totalQuotes}`)
      console.log(`🆔 Tracking ID: ${trackingInfo.requestId}`)

      return result
    } catch (error) {
      console.error("💥 Error processing quotes:", error)
      throw error
    }
  }

  getCompanyLogo(companyInternalName) {
    const logoMap = {
      HDFC_LIFE: "HDFC",
      ICICI_PRU: "ICICI",
      SBI_LIFE: "SBI",
      LIC: "LIC",
      MAX_LIFE: "MAX",
    }
    return logoMap[companyInternalName] || companyInternalName?.substring(0, 5) || "INS"
  }
}

// Main API Handler with Enhanced Tracking
export async function POST(request) {
  try {
    console.log("🚀 === ENHANCED INPUT TRACKING STARTED ===")

    const formData = await request.json()

    // Log every single input field
    console.log("📝 === RAW FORM DATA ===")
    Object.keys(formData).forEach((key) => {
      console.log(`   ${key}: "${formData[key]}"`)
    })

    // Basic validation
    if (!formData.cover || !formData.dob || !formData.pincode) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    console.log("✅ Starting quote generation with input tracking...")
    const ensuredITService = new EnsuredITService()
    const result = await ensuredITService.getQuotes(formData)

    console.log("🎉 === QUOTE GENERATION SUCCESS ===")

    // Store quotes in database for session-based retrieval (only if DATABASE_URL is available)
    if (process.env.DATABASE_URL) {
      try {
        const { sql } = await import("@/lib/db")
        await sql`
          INSERT INTO quotes_storage (session_id, quote_data)
          VALUES (${result.sessionId}, ${JSON.stringify(result)})
          ON CONFLICT (session_id) 
          DO UPDATE SET 
            quote_data = ${JSON.stringify(result)},
            expires_at = CURRENT_TIMESTAMP + INTERVAL '24 hours'
        `
        console.log("💾 Quotes stored in database for session:", result.sessionId)
      } catch (dbError) {
        console.error("⚠️ Failed to store quotes in database:", dbError)
        // Don't fail the request if database storage fails
      }
    } else {
      console.log("⚠️ No DATABASE_URL, skipping database storage")
    }

    return NextResponse.json({
      success: true,
      sessionId: result.sessionId,
      summary: result.summary,
      quotes: result.quotes,
      tracking: result.tracking, // Include tracking info in response
      message: `Generated quotes for ${result.tracking.customerProfile.age}y old, ₹${result.tracking.customerProfile.coverInCrores}Cr cover`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("💥 === ENHANCED TRACKING: FAILED ===")
    console.error("Error:", error.message)

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch quotes",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
