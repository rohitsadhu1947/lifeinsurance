import { NextResponse } from "next/server"

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

    console.log("🔍 Fetching quotes for session:", sessionId)

    // Try to fetch from database first (only if DATABASE_URL is available)
    if (process.env.DATABASE_URL) {
      try {
        const { sql } = await import("@/lib/db")
        const result = await sql`
          SELECT quote_data, expires_at 
          FROM quotes_storage 
          WHERE session_id = ${sessionId} 
          AND expires_at > CURRENT_TIMESTAMP
        `

        if (result.length > 0) {
          const quoteData = result[0].quote_data
          console.log("✅ Found quotes in database for session:", sessionId)
          
          return NextResponse.json({
            success: true,
            ...quoteData
          })
        }
      } catch (dbError) {
        console.error("⚠️ Database error, falling back to mock data:", dbError)
      }
    } else {
      console.log("⚠️ No DATABASE_URL, skipping database lookup")
    }

    // Fallback to mock data if database fetch fails or no data found
    console.log("📝 Using mock data for session:", sessionId)
    const mockSessionData = {
      sessionId: sessionId,
      summary: {
        totalQuotes: 2,
        coverAmount: 1000000, // 10 lakhs
        bestPremium: 18291,
        maxSavings: 3399,
        insurersCount: 2,
      },
      quotes: [
        {
          id: 1,
          planName: "iProtect Smart",
          premium: 18291,
          policyTerm: 36,
          paymentTerm: 36,
          paymentFrequency: "Yearly",
          companyName: "ICICI Prudential Life Insurance",
          companyLogo: "ICICI",
          brochure: "",
          basePremium: 18291,
          gst: 0,
          isRecommended: true,
          savings: 3399,
          savingsPercentage: "15.7",
          customerRating: 4.2,
          claimSettlementRatio: 98.01,
          costPerLakhCover: 183,
          totalSavingsOverTerm: 122364,
          benefits: [
            "Death Benefit",
            "Terminal Illness",
            "Tax Benefits",
            "Policy Term: 52Y"
          ],
          pros: [
            "Lowest premium in the market",
            "High claim settlement ratio",
            "Comprehensive coverage"
          ],
          cons: [
            "Limited riders available",
            "Higher premium for older ages"
          ],
          keyHighlights: [
            "Best value for money",
            "Quick claim processing",
            "Digital policy management"
          ],
          exclusions: [
            "Suicide within first year",
            "Pre-existing conditions",
            "War and terrorism"
          ]
        },
        {
          id: 2,
          planName: "HDFC Life Click to Protect Life",
          premium: 21690,
          policyTerm: 36,
          paymentTerm: 36,
          paymentFrequency: "Yearly",
          companyName: "HDFC Life Insurance",
          companyLogo: "HDFC",
          brochure: "",
          basePremium: 21690,
          gst: 0,
          isRecommended: false,
          savings: 0,
          savingsPercentage: "0",
          customerRating: 4.3,
          claimSettlementRatio: 98.66,
          costPerLakhCover: 217,
          totalSavingsOverTerm: 0,
          benefits: [
            "Death Benefit",
            "Terminal Illness",
            "Tax Benefits",
            "Policy Term: 52Y"
          ],
          pros: [
            "Strong brand reputation",
            "Excellent customer service",
            "Wide network of branches"
          ],
          cons: [
            "Higher premium",
            "Limited online features"
          ],
          keyHighlights: [
            "Trusted brand",
            "Comprehensive support",
            "Flexible payment options"
          ],
          exclusions: [
            "Suicide within first year",
            "Pre-existing conditions",
            "War and terrorism"
          ]
        }
      ],
      tracking: {
        requestId: sessionId.replace("track_", ""),
        customerProfile: {
          age: 30,
          coverInCrores: 1,
          pincode: "400001"
        },
        ensuredItQuoteId: "mock_quote_id",
        timestamp: new Date().toISOString(),
        quotesCount: 2
      }
    }

    console.log("✅ Returning session data for:", sessionId)
    
    return NextResponse.json({
      success: true,
      ...mockSessionData
    })

  } catch (error) {
    console.error("❌ Error fetching session quotes:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch quotes for session",
        error: error.message,
      },
      { status: 500 }
    )
  }
}
