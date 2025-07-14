"use client"

import { useState, useEffect } from "react"
import { Shield, ArrowLeft, Download, Share2, CheckCircle, Star } from "lucide-react"

export default function QuoteComparison() {
  const [quotes, setQuotes] = useState([])
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const quoteIds = urlParams.get("quotes")?.split(",") || []

    // Mock comparison data
    setTimeout(() => {
      const mockComparison = {
        summary: {
          totalQuotes: 2,
          coverAmount: 10000000,
          bestPremium: 18291,
          maxSavings: 3399,
          savingsPercentage: "15.7",
        },
        quotes: [
          {
            id: 1,
            rank: 1,
            planName: "iProtect Smart",
            premium: 18291,
            policyTerm: 36,
            paymentTerm: 36,
            paymentFrequency: "Yearly",
            insurerName: "ICICI Prudential Life Insurance",
            insurerLogo: "ICICI",
            savings: 3399,
            savingsPercentage: "15.7",
            isCheapest: true,
            isRecommended: true,
            annualSavings: 3399,
            totalSavingsOverTerm: 122364,
            costPerLakhCover: 183,
            benefits: ["Death Benefit", "Terminal Illness", "Accidental Death"],
            claimSettlementRatio: 98.01,
            customerRating: 4.2,
          },
          {
            id: 2,
            rank: 2,
            planName: "HDFC Life Click to Protect Life",
            premium: 21690,
            policyTerm: 36,
            paymentTerm: 36,
            paymentFrequency: "Yearly",
            insurerName: "HDFC Life Insurance",
            insurerLogo: "HDFC",
            savings: 0,
            savingsPercentage: "0",
            isCheapest: false,
            isRecommended: false,
            annualSavings: 0,
            totalSavingsOverTerm: 0,
            costPerLakhCover: 217,
            benefits: ["Death Benefit", "Terminal Illness", "Critical Illness"],
            claimSettlementRatio: 98.66,
            customerRating: 4.3,
          },
        ],
      }

      setComparison(mockComparison)
      setQuotes(mockComparison.quotes)
      setLoading(false)
    }, 1000)
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Preparing detailed comparison...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">InsureCompare</h1>
            </div>
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Results</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Comparing {comparison?.summary.totalQuotes} Insurance Plans
          </h2>
          <p className="text-lg text-gray-600">
            Save up to {formatCurrency(comparison?.summary.maxSavings)} ({comparison?.summary.savingsPercentage}%) with
            the best plan
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 w-64">Features</th>
                  {quotes.map((quote) => (
                    <th key={quote.id} className="text-center py-4 px-6 min-w-64">
                      <div className="space-y-3">
                        {/* Company Logo */}
                        <div className="flex justify-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">{quote.insurerLogo}</span>
                          </div>
                        </div>

                        {/* Company Name */}
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{quote.insurerName}</h3>
                          <p className="text-xs text-gray-600">Rank #{quote.rank}</p>
                        </div>

                        {/* Badges */}
                        <div className="space-y-1">
                          {quote.isRecommended && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                              RECOMMENDED
                            </span>
                          )}
                          {quote.isCheapest && (
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                              LOWEST PRICE
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {/* Plan Name */}
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Plan Name</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="font-semibold text-gray-900">{quote.planName}</span>
                    </td>
                  ))}
                </tr>

                {/* Premium */}
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Annual Premium</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <div className="space-y-1">
                        <span className="text-2xl font-bold text-blue-600">{formatCurrency(quote.premium)}</span>
                        {quote.savings > 0 && (
                          <p className="text-sm text-green-600 font-medium">Save {formatCurrency(quote.savings)}</p>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Policy Details */}
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Policy Term</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-gray-900">{quote.policyTerm} years</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Payment Term</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-gray-900">{quote.paymentTerm} years</span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Cost per Lakh Cover</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-gray-900">₹{quote.costPerLakhCover}</span>
                    </td>
                  ))}
                </tr>

                {/* Benefits */}
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Key Benefits</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6">
                      <div className="space-y-2">
                        {quote.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center justify-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Claim Settlement */}
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Claim Settlement Ratio</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-green-600 font-semibold">{quote.claimSettlementRatio}%</span>
                    </td>
                  ))}
                </tr>

                {/* Customer Rating */}
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Customer Rating</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{quote.customerRating}/5</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Total Savings */}
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50">Total Savings Over Term</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      {quote.totalSavingsOverTerm > 0 ? (
                        <span className="text-green-600 font-semibold">
                          {formatCurrency(quote.totalSavingsOverTerm)}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="border-t bg-gray-50 px-6 py-4">
            <div className="flex justify-center space-x-4">
              {quotes.map((quote) => (
                <button
                  key={quote.id}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Select {quote.insurerLogo} Plan
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Need expert guidance?</h3>
              <p className="text-gray-600">Our insurance advisors can help you make the right choice</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                <Download className="h-4 w-4" />
                <span>Download Comparison</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
                Get Expert Advice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
