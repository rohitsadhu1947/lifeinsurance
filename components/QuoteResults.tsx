"use client"

import { useState, useEffect } from "react"
import { Shield, Star, Download, Share2, CheckCircle, ArrowLeft, TrendingDown } from "lucide-react"

export default function QuoteResults() {
  const [quotes, setQuotes] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedQuotes, setSelectedQuotes] = useState([])
  const [sessionId, setSessionId] = useState(null)
  const [error, setError] = useState(null)

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
        // You could implement a fetch by session ID here
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your real quotes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{error}</h2>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Generate New Quotes
          </button>
        </div>
      </div>
    )
  }

  if (!quotes || quotes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
              onClick={() => (window.location.href = "/")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>New Search</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Found {summary?.totalQuotes || quotes.length} real quotes for {formatCoverAmount(summary?.coverAmount)}{" "}
            cover
          </h2>
          <p className="text-lg text-gray-600">
            Save up to {formatCurrency(summary?.maxSavings || 0)} annually with the best plan
          </p>

          {/* Real-time indicator */}
          <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live quotes from {summary?.insurersCount || 1} insurers</span>
          </div>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Best Premium</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.bestPremium)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Quotes</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.totalQuotes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Savings</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(summary.maxSavings)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Insurers</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.insurersCount}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sort and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Best Value</option>
              <option>Lowest Premium</option>
              <option>Company Rating</option>
            </select>
          </div>

          {selectedQuotes.length >= 2 && (
            <button
              onClick={handleCompare}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Compare Selected ({selectedQuotes.length})
            </button>
          )}
        </div>

        {/* Real Quote Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {quotes.map((quote, index) => (
            <div
              key={quote.id || index}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{quote.companyLogo || "INS"}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{quote.companyName}</h3>
                      <p className="text-xs text-gray-600">Live Quote</p>
                    </div>
                  </div>

                  {quote.isRecommended && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      BEST VALUE
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-2">{quote.planName}</h4>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-blue-600">{formatCurrency(quote.premium)}</span>
                  <span className="text-sm text-gray-600">/year</span>
                </div>

                {quote.savings > 0 && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    You save {formatCurrency(quote.savings)} annually
                  </p>
                )}
              </div>

              {/* Card Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Policy Term</span>
                    <span className="font-medium">{quote.policyTerm} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Term</span>
                    <span className="font-medium">{quote.paymentTerm} years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Mode</span>
                    <span className="font-medium">{quote.paymentFrequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Premium</span>
                    <span className="font-medium">{formatCurrency(Math.round(quote.premium / 12))}</span>
                  </div>

                  {/* Show tracking info if available */}
                  {quote._tracking && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quote ID</span>
                      <span className="font-medium text-xs">{quote._tracking.ensuredItPlanId}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Select This Plan
                  </button>

                  <div className="flex space-x-2">
                    <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-3 rounded-lg text-sm transition-colors">
                      View Details
                    </button>
                    <button
                      onClick={() => handleQuoteSelection(quote.id)}
                      className={`flex-1 border font-medium py-2 px-3 rounded-lg text-sm transition-colors ${
                        selectedQuotes.includes(quote.id)
                          ? "border-blue-600 text-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      {selectedQuotes.includes(quote.id) ? "Selected" : "Compare"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-100 rounded-lg p-4 mt-8">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify({ summary, quotesCount: quotes.length, sessionId }, null, 2)}
            </pre>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">These are live quotes from real insurers</h3>
              <p className="text-gray-600">
                Premiums are calculated based on your exact age, cover amount, and location
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg">
                <Share2 className="h-4 w-4" />
                <span>Share Quotes</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium">
                Talk to Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
