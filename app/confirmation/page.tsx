"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, ArrowLeft, CreditCard, Shield, FileText, ArrowRight } from "lucide-react"
import PaymentGateway from "@/components/PaymentGateway"

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const proposalId = searchParams.get("proposalId")
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  // Get quote data from localStorage for dynamic insurer name
  const quoteData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("quote-data") || "{}") : {}
  const insurerName = quoteData.companyName || "Insurance Company"
  const companyLogo = quoteData.companyLogo || "INS"

  const handleMakePayment = () => {
    setIsPaymentOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">ICE by Ensuredit</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Success Message */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Proposal Form Submitted
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your proposal form has been submitted successfully, please make the payment
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = "/"}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Back to Home</span>
                </button>
                <button
                  onClick={handleMakePayment}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Make Payment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Plan Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Plan Summary</h3>
              </div>

              {/* Plan Details */}
              <div className="mb-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{companyLogo}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{insurerName}</h4>
                      <p className="text-sm text-gray-600">{quoteData.planName || "iProtect Smart"}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cover:</span>
                      <span className="font-medium">₹10,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pay Frequency:</span>
                      <span className="font-medium">Yearly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cover upto:</span>
                      <span className="font-medium">65 Yrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pay Term:</span>
                      <span className="font-medium">10 Yrs</span>
                    </div>
                  </div>
                </div>

                {/* Premium Breakup */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Premium Breakup</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Basic Premium:</span>
                      <span className="font-medium">₹18,291</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="text-gray-900 font-semibold">Payable Amount:</span>
                      <span className="font-semibold text-green-600">₹18,291</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Popup */}
      <PaymentGateway
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={18291}
        insurerName={insurerName}
      />
    </div>
  )
}

export default function ProposalConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}