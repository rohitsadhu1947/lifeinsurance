import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { formData, quoteData } = body

    // Prepare the API request payload
    const paymentPayload = {
      fields: [
        {
          id: "proposerFullName",
          parentProperty: "proposerDetails",
          value: formData.fullName || ""
        },
        {
          id: "proposerEmail",
          parentProperty: "proposerDetails",
          value: formData.emailId || ""
        },
        {
          id: "dob",
          parentProperty: "proposerDetails",
          value: quoteData?.dob || "15/04/1992"
        },
        {
          id: "gender",
          parentProperty: "proposerDetails",
          value: "Male"
        },
        {
          id: "proposerPhoneNumber",
          parentProperty: "proposerDetails",
          value: formData.mobileNumber || ""
        },
        {
          id: "proposerMaritalStatus",
          parentProperty: "proposerDetails",
          value: "married"
        },
        {
          id: "proposerSpouseFullName",
          parentProperty: "proposerDetails",
          value: "anukshka sharma"
        },
        {
          id: "location",
          parentProperty: "proposerDetails",
          value: "mumbai"
        },
        {
          id: "proposerNri",
          parentProperty: "insuredMember",
          value: "NO"
        },
        {
          id: "sameAsProposerDetail",
          parentProperty: "proposerDetails",
          value: true
        },
        {
          id: "fullNameMember",
          parentProperty: "insuredMember",
          value: formData.fullName || ""
        },
        {
          id: "emailMember",
          parentProperty: "insuredMember",
          value: formData.emailId || ""
        },
        {
          id: "insurerDob",
          parentProperty: "insuredMember",
          value: quoteData?.dob || "15/04/1992"
        },
        {
          id: "insurerGender",
          parentProperty: "insuredMember",
          value: "Male"
        },
        {
          id: "phoneMember",
          parentProperty: "insuredMember",
          value: formData.mobileNumber || ""
        },
        {
          id: "maritalStatusMember",
          parentProperty: "insuredMember",
          value: "married"
        },
        {
          id: "spouseFullNameMember",
          parentProperty: "insuredMember",
          value: "anukshka sharma"
        },
        {
          id: "insurerNri",
          parentProperty: "insuredMember",
          value: "NO"
        }
      ],
      pageStep: "2",
      ignoreMicroserviceCalls: true,
      quotePlanId: quoteData?.quotePlanId || "6153659"
    }

    // Call the external API
    const response = await fetch("https://api-prod.ensuredit.com/v3/proposal/TERM/create", {
      method: "POST",
      headers: {
        "Origin": "https://erp.tecdata.in",
        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjZ3RuZzhQdk5DT1B4NTlsbkVSclhWa24tbEhON2JJNXFDMm5fS3RkYUpRIn0.eyJleHAiOjE3NjA0NjcwNTYsImlhdCI6MTc2MDQzODI1NiwianRpIjoiZTEzMzU0MDYtNTgzMi00ZDMwLTg3NTgtZjI3OGZmNTEyM2RkIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLXByb2QuaWNlaW5zdXJhbmNlLmluL2F1dGgvcmVhbG1zL2Vuc3VyZWRpdCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhODU2YWViNS0zMjIwLTRhMTgtYjNlMS04ZmQ3MmY2ZDg2Y2MiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJpY2UtaW4iLCJzZXNzaW9uX3N0YXRlIjoiM2EyZmMwYTEtYzM4Ny00OWFiLTlkZjUtZGE4YmJhNmQ1M2YxIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJtaXNfY29tbWlzc2lvbnNfY29tbW9uX3JvbGUiLCJvZmZsaW5lX2FjY2VzcyIsImljZS1taXMtUkVBRF9BTExfUE9MSUNJRVNfTElTVCIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1lbnN1cmVkaXQiLCJpY2UtbWlzLVBPTElDSUVTX1ZJU0lCTEUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJpY2UtaW4iOnsicm9sZXMiOlsiUE91bmRlZmluZWRfMzQxIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBHcm91cHMgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjNhMmZjMGExLWMzODctNDlhYi05ZGY1LWRhOGJiYTZkNTNmMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IlRydXB0aSBQYW5kaXQiLCJncm91cHMiOlsiL2ljZS1pbi9wYXJ0bmVycy9QTF9XZWFsdGgvUE8iLCJtaXNfY29tbWlzc2lvbnNfY29tbW9uX3JvbGUiLCJvZmZsaW5lX2FjY2VzcyIsImljZS1taXMtUkVBRF9BTExfUE9MSUNJRVNfTElTVCIsInVtYV9hdXRob3JpemF0aW9uIiwiZGVmYXVsdC1yb2xlcy1lbnN1cmVkaXQiLCJpY2UtbWlzLVBPTElDSUVTX1ZJU0lCTEUiXSwicHJlZmVycmVkX3VzZXJuYW1lIjoicGxpbnN1cmFuY2VwbyIsImdpdmVuX25hbWUiOiJUcnVwdGkgUGFuZGl0IiwiZmFtaWx5X25hbWUiOiIifQ.he89mqpBB-RDySm2pPRFuq3-MwsaJc7VVC3nYhdvDMBKaDfo7YjQlYl3je0gVeKxfGm--QcPkqutsxbzJKgqxu2aW57thyM2tzeOrqz_Go9P6eqFps4QFtVGr92fzixX-xdO5sBAhSy1LcrjDo8SHflfBYcub4BS6_gpaZjvaQkSZAxA9tGG_1a8XTKmBQYvcjiRPSYEwu8kjAa6ydsTLAfyH1F1veD3TMXZ4XK-8WQhyMSZ27wqjGGxc4XLTCuwLWOu27HzrzVwTkdWR-gVyiLtB3yAlbeKLoE9cXJCjWwe9mOSU1JoSpe1l94OLbXor40INIQ2YWPgooseyFRIQQ",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentPayload)
    })

    if (!response.ok) {
      throw new Error(`Payment API failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    // Extract the payment URL from the response
    const paymentUrl = data?.insurerSpecificData?.proposalUrl

    if (!paymentUrl) {
      throw new Error("Payment URL not found in API response")
    }

    return NextResponse.json({
      success: true,
      paymentUrl: paymentUrl,
      data: data
    })

  } catch (error) {
    console.error("Payment API error:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Payment API failed" 
      },
      { status: 500 }
    )
  }
}
