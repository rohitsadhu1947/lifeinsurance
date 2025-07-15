"use client"

import { useState, useEffect } from "react"
import {
  Shield,
  ArrowLeft,
  Download,
  CheckCircle,
  Star,
  X,
  Info,
  Award,
  TrendingDown,
  Users,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { PlanDetailsModal } from "./AdvancedFeatures"

export default function ProfessionalQuoteComparison() {
  const [quotes, setQuotes] = useState([])
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [showAllFeatures, setShowAllFeatures] = useState(false)
  const [highlightDifferences, setHighlightDifferences] = useState(true)
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const quoteIds = urlParams.get("quotes")?.split(",") || []

    // Enhanced mock comparison data with more details
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
            claimSettlementRatio: 98.01,
            customerRating: 4.2,
            benefits: [
              { name: "Death Benefit", included: true, details: "100% Sum Assured paid on death" },
              { name: "Terminal Illness", included: true, details: "Accelerated death benefit" },
              { name: "Accidental Death", included: true, details: "Additional 100% Sum Assured" },
              { name: "Disability Waiver", included: true, details: "Premium waiver on permanent disability" },
              { name: "Critical Illness", included: false, details: "Not covered" },
              { name: "Maturity Benefit", included: false, details: "Pure term plan - no maturity benefit" },
            ],
            pros: [
              "Lowest premium in comparison",
              "High claim settlement ratio (98.01%)",
              "Flexible premium payment options",
              "Online policy management",
            ],
            cons: ["No critical illness coverage", "No maturity benefit", "Limited rider options"],
            keyHighlights: [
              "Best value for money",
              "Trusted brand with 25+ years experience",
              "Quick claim settlement process",
            ],
            exclusions: [
              "Death due to suicide within first year",
              "Death due to pre-existing conditions not disclosed",
              "Death while under influence of alcohol/drugs",
            ],
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
            claimSettlementRatio: 98.66,
            customerRating: 4.3,
            benefits: [
              { name: "Death Benefit", included: true, details: "100% Sum Assured paid on death" },
              { name: "Terminal Illness", included: true, details: "Accelerated death benefit" },
              { name: "Critical Illness", included: true, details: "Additional coverage for 37 critical illnesses" },
              { name: "Disability Waiver", included: true, details: "Premium waiver on permanent disability" },
              { name: "Accidental Death", included: false, details: "Available as rider" },
              { name: "Maturity Benefit", included: false, details: "Pure term plan - no maturity benefit" },
            ],
            pros: [
              "Critical illness coverage included",
              "Highest claim settlement ratio (98.66%)",
              "Comprehensive health benefits",
              "Strong brand reputation",
            ],
            cons: [
              "Higher premium compared to competition",
              "Accidental death benefit only as rider",
              "Limited online features",
            ],
            keyHighlights: [
              "Best claim settlement ratio",
              "Comprehensive critical illness coverage",
              "Established insurer with strong financials",
            ],
            exclusions: [
              "Death due to suicide within first year",
              "Pre-existing conditions not disclosed",
              "Death during participation in hazardous activities",
            ],
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

  const handleShare = (type) => {
    const shareUrl = window.location.href
    const shareText = `Compare insurance plans - Save up to ${formatCurrency(comparison?.summary.maxSavings)}/year!`

    switch (type) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`)
        break
      case "email":
        window.open(`mailto:?subject=Insurance Plan Comparison&body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`)
        break
      case "copy":
        navigator.clipboard.writeText(shareUrl)
        alert("Link copied to clipboard!")
        break
    }
  }

  const getComparisonValue = (feature, quotes) => {
    const values = quotes.map((q) => q[feature])
    const isNumeric = typeof values[0] === "number"

    if (isNumeric) {
      const min = Math.min(...values)
      const max = Math.max(...values)
      return { min, max, hasVariation: min !== max }
    }

    const unique = [...new Set(values)]
    return { unique, hasVariation: unique.length > 1 }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Preparing detailed comparison...</p>
          <p className="text-sm text-gray-500 mt-2">Analyzing plan features and benefits</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">InsureCompare</h1>
                <p className="text-sm text-gray-600">Professional Plan Comparison</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <Award className="h-4 w-4" />
                <span>Expert Analysis</span>
              </div>
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Results</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Insights */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Detailed Plan Comparison</h2>
                <p className="text-lg text-gray-600 mb-4">
                  Side-by-side analysis of {comparison?.summary.totalQuotes} selected plans
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span className="text-green-700 font-medium">
                      Save up to {formatCurrency(comparison?.summary.maxSavings)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">
                      {formatCurrency(comparison?.summary.coverAmount / 10000000)} Crore Coverage
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="highlightDifferences"
                    checked={highlightDifferences}
                    onChange={(e) => setHighlightDifferences(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="highlightDifferences" className="text-sm text-gray-700">
                    Highlight differences
                  </label>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleShare("copy")}
                    className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-6 px-6 font-bold text-gray-900 w-64 sticky left-0 bg-gray-50">
                    Plan Features
                  </th>
                  {quotes.map((quote) => (
                    <th key={quote.id} className="text-center py-6 px-6 min-w-80">
                      <div className="space-y-4">
                        {/* Company Logo & Name */}
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-3 shadow-md">
                            <span className="text-blue-700 font-bold text-lg">{quote.insurerLogo}</span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{quote.insurerName}</h3>
                          <p className="text-sm text-gray-600 mb-2">{quote.planName}</p>
                        </div>

                        {/* Premium & Badges */}
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-blue-600">
                            {formatCurrency(quote.premium)}
                            <span className="text-sm text-gray-600 font-normal">/year</span>
                          </div>

                          {quote.savings > 0 && (
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Save {formatCurrency(quote.savings)}
                            </div>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="space-y-2">
                          {quote.isRecommended && (
                            <span className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                              ⭐ EXPERT RECOMMENDED
                            </span>
                          )}
                          {quote.isCheapest && (
                            <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                              💰 BEST PRICE
                            </span>
                          )}
                          <div className="text-sm text-gray-600">Rank #{quote.rank}</div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {/* Key Metrics Section */}
                <tr className="bg-blue-50">
                  <td colSpan={quotes.length + 1} className="py-4 px-6">
                    <h4 className="font-bold text-blue-900 text-lg">💰 Premium & Cost Analysis</h4>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">Annual Premium</td>
                  {quotes.map((quote) => {
                    const comparison = getComparisonValue("premium", quotes)
                    const isLowest = quote.premium === comparison.min
                    return (
                      <td key={quote.id} className="py-4 px-6 text-center">
                        <div className={`text-2xl font-bold ${isLowest ? "text-green-600" : "text-gray-900"}`}>
                          {formatCurrency(quote.premium)}
                        </div>
                        {isLowest && <div className="text-xs text-green-600 font-medium mt-1">LOWEST</div>}
                      </td>
                    )
                  })}
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">Monthly Premium</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-lg font-semibold text-gray-900">
                        {formatCurrency(Math.round(quote.premium / 12))}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">
                    Cost per Lakh Cover
                  </td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-lg font-semibold text-gray-900">₹{quote.costPerLakhCover}</span>
                      <div className="text-xs text-gray-600">per lakh per year</div>
                    </td>
                  ))}
                </tr>

                {/* Policy Terms Section */}
                <tr className="bg-purple-50">
                  <td colSpan={quotes.length + 1} className="py-4 px-6">
                    <h4 className="font-bold text-purple-900 text-lg">📋 Policy Terms & Conditions</h4>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">Policy Term</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-lg font-semibold text-gray-900">{quote.policyTerm} years</span>
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">Payment Term</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-lg font-semibold text-gray-900">{quote.paymentTerm} years</span>
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">Payment Frequency</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <span className="text-lg font-semibold text-gray-900">{quote.paymentFrequency}</span>
                    </td>
                  ))}
                </tr>

                {/* Benefits Coverage Section */}
                <tr className="bg-green-50">
                  <td colSpan={quotes.length + 1} className="py-4 px-6">
                    <h4 className="font-bold text-green-900 text-lg">🛡️ Coverage & Benefits</h4>
                  </td>
                </tr>

                {quotes[0]?.benefits?.map((benefit, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">
                      <div className="flex items-center space-x-2">
                        <span>{benefit.name}</span>
                        <button
                          onClick={() => setSelectedFeature(benefit)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    {quotes.map((quote) => {
                      const quoteBenefit = quote.benefits.find((b) => b.name === benefit.name)
                      return (
                        <td key={quote.id} className="py-4 px-6 text-center">
                          {quoteBenefit?.included ? (
                            <div className="flex flex-col items-center space-y-1">
                              <CheckCircle className="h-6 w-6 text-green-500" />
                              <span className="text-sm font-medium text-green-700">Included</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center space-y-1">
                              <X className="h-6 w-6 text-red-500" />
                              <span className="text-sm font-medium text-red-700">Not Covered</span>
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}

                {/* Company Metrics Section */}
                <tr className="bg-orange-50">
                  <td colSpan={quotes.length + 1} className="py-4 px-6">
                    <h4 className="font-bold text-orange-900 text-lg">📊 Company Performance</h4>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">
                    Claim Settlement Ratio
                  </td>
                  {quotes.map((quote) => {
                    const comparison = getComparisonValue("claimSettlementRatio", quotes)
                    const isHighest = quote.claimSettlementRatio === comparison.max
                    return (
                      <td key={quote.id} className="py-4 px-6 text-center">
                        <div className={`text-xl font-bold ${isHighest ? "text-green-600" : "text-gray-900"}`}>
                          {quote.claimSettlementRatio}%
                        </div>
                        {isHighest && <div className="text-xs text-green-600 font-medium mt-1">HIGHEST</div>}
                      </td>
                    )
                  })}
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">Customer Rating</td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-xl font-bold text-gray-900">{quote.customerRating}/5</span>
                      </div>
                      <div className="text-xs text-gray-600">Based on customer reviews</div>
                    </td>
                  ))}
                </tr>

                {/* Total Savings Section */}
                <tr className="bg-red-50">
                  <td colSpan={quotes.length + 1} className="py-4 px-6">
                    <h4 className="font-bold text-red-900 text-lg">💸 Long-term Savings</h4>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-900 bg-gray-50 sticky left-0">
                    Total Savings Over Term
                  </td>
                  {quotes.map((quote) => (
                    <td key={quote.id} className="py-4 px-6 text-center">
                      {quote.totalSavingsOverTerm > 0 ? (
                        <div>
                          <div className="text-xl font-bold text-green-600">
                            {formatCurrency(quote.totalSavingsOverTerm)}
                          </div>
                          <div className="text-xs text-green-600 font-medium">vs highest premium plan</div>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-lg">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Section */}
          <div className="border-t-2 bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {quotes.map((quote) => (
                <div key={quote.id} className="text-center">
                  <div className="mt-4 space-y-2">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                      Buy {quote.insurerLogo} Plan
                    </button>
                    <button
                      onClick={() => setShowPlanDetailsModal(quote)}
                      className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      View Full Details
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{formatCurrency(quote.premium)}/year</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pros & Cons Analysis */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {quotes.map((quote) => (
            <div key={quote.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 font-bold">{quote.insurerLogo}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{quote.planName}</h3>
                  <p className="text-gray-600">{quote.insurerName}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                    <span>Pros</span>
                  </h4>
                  <ul className="space-y-2">
                    {quote.pros?.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
                    <ThumbsDown className="h-5 w-5 text-red-600" />
                    <span>Cons</span>
                  </h4>
                  <ul className="space-y-2">
                    {quote.cons?.map((con, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {quote.keyHighlights && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span>Key Highlights</span>
                  </h4>
                  <ul className="space-y-2">
                    {quote.keyHighlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expert Recommendation Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">💡 Expert Recommendation</h3>
              <p className="text-blue-100 mb-4">Based on our analysis, here's what our insurance experts recommend:</p>

              <div className="space-y-3">
                {quotes.find((q) => q.isRecommended) && (
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Award className="h-6 w-6 text-yellow-300" />
                      <div>
                        <h4 className="font-semibold">Best Overall: {quotes.find((q) => q.isRecommended)?.planName}</h4>
                        <p className="text-sm text-blue-100">
                          Offers the best balance of premium, coverage, and insurer reliability
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {quotes.find((q) => q.isCheapest) && (
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <TrendingDown className="h-6 w-6 text-green-300" />
                      <div>
                        <h4 className="font-semibold">Most Affordable: {quotes.find((q) => q.isCheapest)?.planName}</h4>
                        <p className="text-sm text-blue-100">Lowest premium option with essential coverage features</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleShare("whatsapp")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Get Expert Advice</span>
              </button>

              <button
                onClick={() => handleShare("email")}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Mail className="h-5 w-5" />
                <span>Email This Comparison</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Important Exclusions */}
          <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
            <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center space-x-2">
              <AlertCircle className="h-6 w-6" />
              <span>Important Exclusions</span>
            </h3>
            <p className="text-red-800 mb-4 text-sm">Please note these common exclusions across all plans:</p>
            <ul className="space-y-2 text-sm">
              {quotes[0]?.exclusions?.map((exclusion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-red-800">{exclusion}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-red-700 mt-4">
              * This is not an exhaustive list. Please read the complete policy terms and conditions.
            </p>
          </div>

          {/* Need Help Section */}
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span>Need Personalized Help?</span>
            </h3>
            <p className="text-blue-800 mb-6 text-sm">
              Our certified insurance advisors can help you make the right choice based on your specific needs.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-blue-800">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Free expert consultation</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-blue-800">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Unbiased plan recommendations</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-blue-800">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Help with application process</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Request Callback</span>
              </button>

              <div className="text-center text-sm text-blue-700">
                <span>Or call us at </span>
                <a href="tel:1800-123-4567" className="font-semibold hover:underline">
                  1800-123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Ready to purchase?</h3>
              <p className="text-gray-600 text-sm">
                Complete your application in just 5 minutes with our simplified process
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => handleShare("whatsapp")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Share via WhatsApp</span>
              </button>

              <button
                onClick={() => window.print()}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Details Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedFeature.name}</h3>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What is {selectedFeature.name}?</h4>
                  <p className="text-gray-700">{selectedFeature.details}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Coverage in Selected Plans:</h4>
                  <div className="space-y-3">
                    {quotes.map((quote) => {
                      const benefit = quote.benefits.find((b) => b.name === selectedFeature.name)
                      return (
                        <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-700 font-bold text-xs">{quote.insurerLogo}</span>
                            </div>
                            <span className="font-medium text-gray-900">{quote.planName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {benefit?.included ? (
                              <>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-green-700 font-medium">Included</span>
                              </>
                            ) : (
                              <>
                                <X className="h-5 w-5 text-red-500" />
                                <span className="text-red-700 font-medium">Not Covered</span>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Plan Details Modal */}
      <PlanDetailsModal
        plan={showPlanDetailsModal}
        isOpen={!!showPlanDetailsModal}
        onClose={() => setShowPlanDetailsModal(null)}
      />
    </div>
  )
}
