"use client"

import { useState, useEffect } from "react"
import {
  Shield,
  Star,
  Download,
  Share2,
  CheckCircle,
  ArrowLeft,
  TrendingDown,
  Filter,
  Phone,
  MessageCircle,
  Mail,
  Info,
  Award,
  Users,
} from "lucide-react"

export default function ProfessionalQuoteResults() {
  const [quotes, setQuotes] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedQuotes, setSelectedQuotes] = useState([])
  const [sessionId, setSessionId] = useState(null)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [showPlanDetails, setShowPlanDetails] = useState(null)
  const [premiumMode, setPremiumMode] = useState("yearly")
  const [sortBy, setSortBy] = useState("bestValue")
  const [filters, setFilters] = useState({
    premiumRange: "all",
    companies: [],
    policyTerm: "all",
    paymentFrequency: "all",
  })

  useEffect(() => {
    // Get real data from URL params or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const session = urlParams.get("session")
    setSessionId(session)

    // Try to get data from localStorage (set by form submission)
    const storedQuoteData = localStorage.getItem("latestQuoteResults")

    if (storedQuoteData) {
      try {
        const quoteData = JSON.parse(storedQuoteData)
        console.log("📊 Loading real quote data:", quoteData)

        setQuotes(quoteData.quotes || [])
        setSummary(quoteData.summary || null)
        setLoading(false)

        // Clear stored data after use
        localStorage.removeItem("latestQuoteResults")
      } catch (error) {
        console.error("Error parsing stored quote data:", error)
        setError("Failed to load quote results")
        setLoading(false)
      }
    } else {
      // Fallback: Try to fetch from session if available
      if (session) {
        console.log("No stored data, session:", session)
      }

      setError("No quote data found. Please generate quotes again.")
      setLoading(false)
    }
  }, [])

  const handleQuoteSelection = (quoteId) => {
    setSelectedQuotes(
      (prev) => (prev.includes(quoteId) ? prev.filter((id) => id !== quoteId) : [...prev, quoteId].slice(0, 3)), // Max 3 quotes
    )
  }

  const handleCompare = () => {
    if (selectedQuotes.length >= 2) {
      window.location.href = `/compare?quotes=${selectedQuotes.join(",")}&session=${sessionId}`
    }
  }

  const handleShare = (type, quote = null) => {
    const baseUrl = window.location.origin
    const shareUrl = `${baseUrl}/results?session=${sessionId}`

    switch (type) {
      case "whatsapp":
        const whatsappText = quote
          ? `Check out this insurance plan: ${quote.planName} from ${quote.companyName} - Premium: ₹${quote.premium}/year. Compare more plans: ${shareUrl}`
          : `Compare insurance quotes - Save up to ₹${summary?.maxSavings}/year! ${shareUrl}`
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`)
        break
      case "email":
        const emailSubject = "Insurance Quote Comparison"
        const emailBody = `I found some great insurance quotes. Check them out: ${shareUrl}`
        window.open(`mailto:?subject=${emailSubject}&body=${encodeURIComponent(emailBody)}`)
        break
      case "sms":
        const smsText = `Insurance quotes comparison: ${shareUrl}`
        window.open(`sms:?body=${encodeURIComponent(smsText)}`)
        break
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatCoverAmount = (amount) => {
    if (amount >= 10000000) {
      return `₹${amount / 10000000} Crore`
    } else if (amount >= 100000) {
      return `₹${amount / 100000} Lakh`
    }
    return formatCurrency(amount)
  }

  const getFilteredAndSortedQuotes = () => {
    let filtered = [...quotes]

    // Apply filters
    if (filters.premiumRange !== "all") {
      const [min, max] = filters.premiumRange.split("-").map(Number)
      filtered = filtered.filter((q) => q.premium >= min && q.premium <= max)
    }

    if (filters.companies.length > 0) {
      filtered = filtered.filter((q) => filters.companies.includes(q.companyName))
    }

    // Apply sorting
    switch (sortBy) {
      case "lowestPremium":
        filtered.sort((a, b) => a.premium - b.premium)
        break
      case "companyRating":
        filtered.sort((a, b) => (b.customerRating || 4) - (a.customerRating || 4))
        break
      case "claimRatio":
        filtered.sort((a, b) => (b.claimSettlementRatio || 95) - (a.claimSettlementRatio || 95))
        break
      default: // bestValue
        filtered.sort((a, b) => a.premium - b.premium)
    }

    return filtered
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your personalized quotes...</p>
          <p className="text-sm text-gray-500 mt-2">Analyzing premiums from top insurers</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-4">
            <Shield className="h-16 w-16 mx-auto mb-4" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-600 mb-6">Don't worry, let's get you the best quotes in just 30 seconds!</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
          >
            Get Fresh Quotes
          </button>
        </div>
      </div>
    )
  }

  if (!quotes || quotes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Quotes Available</h2>
          <p className="text-gray-600 mb-4">We couldn't find any quotes for your criteria.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Try Different Criteria
          </button>
        </div>
      </div>
    )
  }

  const filteredQuotes = getFilteredAndSortedQuotes()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">InsureCompare</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live quotes from {summary?.insurersCount || 1} insurers</span>
              </div>
              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>New Search</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Results Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span>Home</span>
            <span>›</span>
            <span>Life Insurance</span>
            <span>›</span>
            <span className="text-blue-600">Quote Results</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {filteredQuotes.length} Best Plans for {formatCoverAmount(summary?.coverAmount)} Cover
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Save up to {formatCurrency(summary?.maxSavings || 0)} annually • Starting from{" "}
            {formatCurrency(summary?.bestPremium || 0)}
          </p>
        </div>

        {/* Professional Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200 bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-700 font-medium">Best Premium</p>
                  <p className="text-2xl font-bold text-green-800">{formatCurrency(summary.bestPremium)}</p>
                  <p className="text-xs text-green-600">per year</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Quotes</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.totalQuotes}</p>
                  <p className="text-xs text-gray-500">live quotes</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Max Savings</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(summary.maxSavings)}</p>
                  <p className="text-xs text-gray-500">vs highest premium</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Insurers</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.insurersCount}</p>
                  <p className="text-xs text-gray-500">top rated</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Professional Filters & Sorting */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="bestValue">Best Value</option>
                  <option value="lowestPremium">Lowest Premium</option>
                  <option value="companyRating">Company Rating</option>
                  <option value="claimRatio">Claim Settlement Ratio</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Premium:</label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setPremiumMode("yearly")}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      premiumMode === "yearly" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Yearly
                  </button>
                  <button
                    onClick={() => setPremiumMode("monthly")}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      premiumMode === "monthly" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>

            {selectedQuotes.length >= 2 && (
              <button
                onClick={handleCompare}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Compare Selected ({selectedQuotes.length})
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Premium Range</label>
                  <select
                    value={filters.premiumRange}
                    onChange={(e) => setFilters({ ...filters, premiumRange: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Premiums</option>
                    <option value="0-15000">Under ₹15,000</option>
                    <option value="15000-25000">₹15,000 - ₹25,000</option>
                    <option value="25000-50000">₹25,000 - ₹50,000</option>
                    <option value="50000-999999">Above ₹50,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Policy Term</label>
                  <select
                    value={filters.policyTerm}
                    onChange={(e) => setFilters({ ...filters, policyTerm: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Terms</option>
                    <option value="20">20 Years</option>
                    <option value="30">30 Years</option>
                    <option value="35">35 Years</option>
                    <option value="40">40 Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
                  <select
                    value={filters.paymentFrequency}
                    onChange={(e) => setFilters({ ...filters, paymentFrequency: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Modes</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Half-yearly">Half-yearly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Quote Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredQuotes.map((quote, index) => (
            <div
              key={quote.id || index}
              className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 relative overflow-hidden"
            >
              {/* Recommended Badge */}
              {quote.isRecommended && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 text-xs font-semibold">
                  RECOMMENDED
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <span className="text-blue-700 font-bold text-sm">{quote.companyLogo || "INS"}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{quote.companyName}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{quote.customerRating || 4.2}/5</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-green-600">{quote.claimSettlementRatio || 98}% Claims</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <input
                      type="checkbox"
                      checked={selectedQuotes.includes(quote.id)}
                      onChange={() => handleQuoteSelection(quote.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-xs text-gray-500 mt-1">Compare</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">{quote.planName}</h4>

                {/* Premium Display */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-3xl font-bold text-blue-600">
                        {premiumMode === "yearly"
                          ? formatCurrency(quote.premium)
                          : formatCurrency(Math.round(quote.premium / 12))}
                      </span>
                      <span className="text-sm text-blue-600 ml-1">/{premiumMode === "yearly" ? "year" : "month"}</span>
                    </div>
                    <div className="text-right">
                      {premiumMode === "monthly" && (
                        <p className="text-xs text-gray-600">{formatCurrency(quote.premium)}/year</p>
                      )}
                    </div>
                  </div>
                  {quote.savings > 0 && (
                    <div className="flex items-center space-x-2 mt-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700 font-medium">
                        You save {formatCurrency(quote.savings)} annually
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">Death Benefit</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">Terminal Illness</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">Tax Benefits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">Policy Term: {quote.policyTerm}Y</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Payment Term:</span>
                      <p className="font-medium text-gray-900">{quote.paymentTerm} years</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Frequency:</span>
                      <p className="font-medium text-gray-900">{quote.paymentFrequency}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6">
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                    Buy This Plan
                  </button>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setShowPlanDetails(quote)}
                      className="flex items-center justify-center space-x-1 border border-gray-300 hover:border-blue-400 hover:text-blue-600 text-gray-700 font-medium py-2 px-2 rounded-lg text-sm transition-colors"
                    >
                      <Info className="h-4 w-4" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => window.open(quote.brochure || "#", "_blank")}
                      className="flex items-center justify-center space-x-1 border border-gray-300 hover:border-green-400 hover:text-green-600 text-gray-700 font-medium py-2 px-2 rounded-lg text-sm transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>Brochure</span>
                    </button>

                    <button
                      onClick={() => handleShare("whatsapp", quote)}
                      className="flex items-center justify-center space-x-1 border border-gray-300 hover:border-green-400 hover:text-green-600 text-gray-700 font-medium py-2 px-2 rounded-lg text-sm transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Bottom Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Need expert guidance choosing the right plan?
              </h3>
              <p className="text-gray-600">
                Our certified insurance advisors are here to help you make the best decision
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span>✓ 100% Free Consultation</span>
                <span>✓ Unbiased Advice</span>
                <span>✓ Quick Response</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Expert</span>
              </button>

              <button
                onClick={() => handleShare("sms")}
                className="flex items-center justify-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Request Callback</span>
              </button>

              <button
                onClick={() => handleShare("email")}
                className="flex items-center justify-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email Quotes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>4.8/5 Customer Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>10L+ Happy Customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Details Modal */}
      {showPlanDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{showPlanDetails.planName}</h3>
                  <p className="text-gray-600">{showPlanDetails.companyName}</p>
                </div>
                <button onClick={() => setShowPlanDetails(null)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Plan Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium:</span>
                      <span className="font-medium">{formatCurrency(showPlanDetails.premium)}/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Policy Term:</span>
                      <span className="font-medium">{showPlanDetails.policyTerm} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Term:</span>
                      <span className="font-medium">{showPlanDetails.paymentTerm} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Claim Settlement:</span>
                      <span className="font-medium text-green-600">{showPlanDetails.claimSettlementRatio || 98}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">Death Benefit Coverage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">Terminal Illness Benefit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">Tax Benefits u/s 80C & 10(10D)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">Flexible Premium Payment</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Buy This Plan
                  </button>
                  <button
                    onClick={() => window.open(showPlanDetails.brochure || "#", "_blank")}
                    className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-3 rounded-lg transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
