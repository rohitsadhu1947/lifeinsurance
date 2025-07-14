"use client"

import { useState } from "react"
import { Calendar, Shield, Users, Star, CheckCircle } from "lucide-react"

export default function InsuranceQuoteForm() {
  const [formData, setFormData] = useState({
    cover: "",
    dob: "",
    pincode: "",
    name: "",
    email: "",
    phone: "",
    saveQuotes: false,
  })

  const [loading, setLoading] = useState(false)
  const [age, setAge] = useState(null)

  const coverOptions = [
    { value: "5000000", label: "₹50 Lakhs" },
    { value: "7500000", label: "₹75 Lakhs" },
    { value: "10000000", label: "₹1 Crore" },
    { value: "15000000", label: "₹1.5 Crore" },
    { value: "20000000", label: "₹2 Crore" },
    { value: "30000000", label: "₹3 Crore" },
    { value: "50000000", label: "₹5 Crore" },
    { value: "100000000", label: "₹10 Crore" },
  ]

  const calculateAge = (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "dob" && value) {
      const calculatedAge = calculateAge(value)
      setAge(calculatedAge)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log("📤 Submitting form data:", formData)

      const response = await fetch("/api/quotes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      console.log("📥 API Response received:", result)

      if (result.success) {
        // Store the real quote data for the results page
        localStorage.setItem(
          "latestQuoteResults",
          JSON.stringify({
            summary: result.summary,
            quotes: result.quotes,
            tracking: result.tracking,
            timestamp: result.timestamp,
          }),
        )

        console.log("✅ Quote data stored, redirecting to results...")

        // Redirect to results page
        window.location.href = `/results?session=${result.sessionId}`
      } else {
        console.error("❌ API Error:", result.message)
        alert("Error: " + result.message)
      }
    } catch (error) {
      console.error("💥 Network Error:", error)
      alert("Failed to generate quotes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.cover && formData.dob && formData.pincode.length === 6

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">InsureCompare</h1>
            </div>
            <div className="text-sm text-gray-600">Step 1 of 2</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Compare quotes from 5+ top insurers instantly
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Get the best life insurance quotes in 30 seconds • No hidden charges
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Instant Quotes</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Secure & Confidential</span>
            </div>
          </div>

          {/* Insurer Logos */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <p className="text-sm text-gray-600 mb-4">Trusted by customers, partnered with top insurers</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-red-600 font-bold text-xs">HDFC</span>
                </div>
                <span className="text-xs text-gray-600">HDFC Life</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-orange-600 font-bold text-xs">ICICI</span>
                </div>
                <span className="text-xs text-gray-600">ICICI Prudential</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-blue-600 font-bold text-xs">SBI</span>
                </div>
                <span className="text-xs text-gray-600">SBI Life</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-green-600 font-bold text-xs">LIC</span>
                </div>
                <span className="text-xs text-gray-600">LIC India</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-purple-600 font-bold text-xs">MAX</span>
                </div>
                <span className="text-xs text-gray-600">Max Life</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Life Cover Amount *</label>
              <select
                value={formData.cover}
                onChange={(e) => handleInputChange("cover", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                required
              >
                <option value="">Select cover amount</option>
                {coverOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange("dob", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  required
                />
                <Calendar className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
              </div>
              {age && <p className="mt-2 text-sm text-blue-600">Age: {age} years</p>}
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                  handleInputChange("pincode", value)
                }}
                placeholder="Enter 6-digit pincode"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                maxLength="6"
                required
              />
            </div>

            {/* Save Quotes Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="saveQuotes"
                checked={formData.saveQuotes}
                onChange={(e) => handleInputChange("saveQuotes", e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="saveQuotes" className="text-sm text-gray-700">
                Save my quotes and get personalized recommendations
              </label>
            </div>

            {/* Optional Fields */}
            {formData.saveQuotes && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                      handleInputChange("phone", value)
                    }}
                    placeholder="Enter 10-digit number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength="10"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Generating quotes from 5+ insurers...</span>
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5" />
                    <span>Compare Quotes from Top Insurers</span>
                  </>
                )}
              </button>
              <p className="text-center text-sm text-gray-600 mt-3">
                Get quotes in 30 seconds • No hidden charges • 100% Free
              </p>
            </div>
          </form>
        </div>

        {/* Footer Trust Elements */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
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
    </div>
  )
}
