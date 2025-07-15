"use client"

import { useState } from "react"
import {
  Calendar,
  Shield,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Info,
  Award,
  TrendingUp,
  Lock,
  Clock,
  Phone,
  Calculator,
} from "lucide-react"
import { PremiumCalculator } from "./AdvancedFeatures"

export default function ProfessionalInsuranceQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
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
  const [estimatedPremium, setEstimatedPremium] = useState(null)
  const [riskProfile, setRiskProfile] = useState("")
  const [showCoverHelp, setShowCoverHelp] = useState(false)
  const [showPremiumCalculator, setShowPremiumCalculator] = useState(false)

  const coverOptions = [
    { value: "5000000", label: "₹50 Lakhs", popular: false, saving: "₹8,500" },
    { value: "7500000", label: "₹75 Lakhs", popular: false, saving: "₹12,200" },
    { value: "10000000", label: "₹1 Crore", popular: true, saving: "₹15,800" },
    { value: "15000000", label: "₹1.5 Crore", popular: true, saving: "₹22,500" },
    { value: "20000000", label: "₹2 Crore", popular: false, saving: "₹28,900" },
    { value: "30000000", label: "₹3 Crore", popular: false, saving: "₹41,200" },
    { value: "50000000", label: "₹5 Crore", popular: false, saving: "₹65,000" },
    { value: "100000000", label: "₹10 Crore", popular: false, saving: "₹125,000" },
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

  const calculateEstimatedPremium = (coverAmount, age) => {
    if (!coverAmount || !age) return null

    const baseRate = age < 30 ? 1.2 : age < 40 ? 1.8 : age < 50 ? 2.5 : 3.2
    const coverInLakhs = Number.parseInt(coverAmount) / 100000
    return Math.round(coverInLakhs * baseRate * 100)
  }

  const getRiskProfile = (age, coverAmount) => {
    if (!age || !coverAmount) return ""

    const coverInCrores = Number.parseInt(coverAmount) / 10000000

    if (age < 30 && coverInCrores <= 1) return "Low Risk"
    if (age < 40 && coverInCrores <= 2) return "Medium Risk"
    if (age < 50 && coverInCrores <= 5) return "Standard Risk"
    return "Higher Risk"
  }

  const getRecommendedCover = (age) => {
    if (age < 30) return "₹1-1.5 Crore"
    if (age < 40) return "₹1.5-2 Crore"
    if (age < 50) return "₹2-3 Crore"
    return "₹1-2 Crore"
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "dob" && value) {
      const calculatedAge = calculateAge(value)
      setAge(calculatedAge)

      if (formData.cover) {
        const premium = calculateEstimatedPremium(formData.cover, calculatedAge)
        setEstimatedPremium(premium)
        setRiskProfile(getRiskProfile(calculatedAge, formData.cover))
      }
    }

    if (field === "cover" && value) {
      if (age) {
        const premium = calculateEstimatedPremium(value, age)
        setEstimatedPremium(premium)
        setRiskProfile(getRiskProfile(age, value))
      }
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

  const isStep1Valid = formData.cover && formData.dob && formData.pincode.length === 6
  const isStep2Valid = !formData.saveQuotes || (formData.name && formData.email && formData.phone.length === 10)

  const nextStep = () => {
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2)
    }
  }

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">InsureCompare</h1>
                <p className="text-sm text-gray-600">India's Trusted Insurance Platform</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="h-4 w-4 text-orange-500" />
                <span>4.8★ Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4 text-green-500" />
                <span>10L+ Customers</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>1800-123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                currentStep >= 1 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              1
            </div>
            <div className={`h-1 w-20 transition-colors ${currentStep >= 2 ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                currentStep >= 2 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"
              }`}
            >
              2
            </div>
          </div>
          <div className="flex justify-center space-x-16 text-sm">
            <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>Basic Details</span>
            <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>Contact Info</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Compare Life Insurance
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}
              Instantly
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Get personalized quotes from India's top 15+ insurers in 30 seconds
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">100% Free & No Spam</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Instant Quotes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">Secure & Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">IRDA Certified</span>
            </div>
          </div>

          {/* Enhanced Insurer Showcase */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Compare Plans from India's Most Trusted Insurers
              </h3>
              <p className="text-gray-600">Partnered with top-rated insurance companies</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: "HDFC Life", logo: "HDFC", rating: "4.2★", claims: "98.66%" },
                { name: "ICICI Prudential", logo: "ICICI", rating: "4.1★", claims: "98.01%" },
                { name: "SBI Life", logo: "SBI", rating: "4.0★", claims: "97.79%" },
                { name: "LIC India", logo: "LIC", rating: "3.9★", claims: "98.82%" },
                { name: "Max Life", logo: "MAX", rating: "4.3★", claims: "99.34%" },
                { name: "Bajaj Allianz", logo: "BAJAJ", rating: "4.1★", claims: "97.45%" },
              ].map((insurer, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-105 transition-transform">
                    <span className="text-gray-700 font-bold text-sm">{insurer.logo}</span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{insurer.name}</h4>
                  <div className="text-xs text-gray-600">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{insurer.rating}</span>
                    </div>
                    <div className="text-green-600 font-medium">{insurer.claims} Claims</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {currentStep === 1 && (
                  <>
                    {/* Step 1: Basic Details */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Let's find your perfect plan</h3>
                      <p className="text-gray-600">Tell us about your insurance needs</p>
                    </div>

                    {/* Cover Amount with Recommendations */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-semibold text-gray-900">Life Cover Amount *</label>
                        <button
                          type="button"
                          onClick={() => setShowCoverHelp(!showCoverHelp)}
                          className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
                        >
                          <Info className="h-4 w-4" />
                          <span>Need help?</span>
                        </button>
                      </div>

                      {showCoverHelp && (
                        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2">How much cover do you need?</h4>
                          <p className="text-sm text-blue-800 mb-2">
                            {age
                              ? `For ${age} years old: ${getRecommendedCover(age)} recommended`
                              : "Typically 10-15x of your annual income"}
                          </p>
                          <div className="text-xs text-blue-700">
                            ✓ Consider your annual income, loans, and family's future needs
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {coverOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleInputChange("cover", option.value)}
                            className={`relative p-4 border-2 rounded-xl text-center transition-all hover:scale-105 ${
                              formData.cover === option.value
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {option.popular && (
                              <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                            <div className="font-semibold text-gray-900">{option.label}</div>
                            <div className="text-xs text-green-600 mt-1">Save {option.saving}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={() => setShowPremiumCalculator(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-2 mx-auto"
                      >
                        <Calculator className="h-4 w-4" />
                        <span>Use Premium Calculator</span>
                      </button>
                    </div>

                    {/* Date of Birth with Smart Features */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Date of Birth *</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange("dob", e.target.value)}
                          max={
                            new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]
                          }
                          min={
                            new Date(new Date().setFullYear(new Date().getFullYear() - 75)).toISOString().split("T")[0]
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                          required
                        />
                        <Calendar className="absolute right-3 top-3 h-6 w-6 text-gray-400 pointer-events-none" />
                      </div>

                      {age && (
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <p className="text-sm text-blue-600 font-medium">Age: {age} years</p>
                            {riskProfile && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  riskProfile === "Low Risk"
                                    ? "bg-green-100 text-green-800"
                                    : riskProfile === "Medium Risk"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-orange-100 text-orange-800"
                                }`}
                              >
                                {riskProfile}
                              </span>
                            )}
                          </div>
                          {estimatedPremium && (
                            <div className="text-right">
                              <p className="text-xs text-gray-500">Estimated Premium</p>
                              <p className="text-sm font-semibold text-green-600">
                                ₹{estimatedPremium.toLocaleString()}/year
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Pincode with Location Detection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Pincode *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.pincode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                            handleInputChange("pincode", value)
                          }}
                          placeholder="Enter 6-digit pincode"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                          maxLength="6"
                          required
                        />
                        {formData.pincode.length === 6 && (
                          <CheckCircle className="absolute right-3 top-3 h-6 w-6 text-green-500" />
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">We use this to find insurers available in your area</p>
                    </div>

                    {/* Continue Button */}
                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStep1Valid}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:transform-none"
                      >
                        <span>Continue to Get Quotes</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                      {estimatedPremium && (
                        <p className="text-center text-sm text-gray-600 mt-3">
                          Expected premium: ₹{estimatedPremium.toLocaleString()}/year • Get exact quotes now
                        </p>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    {/* Step 2: Contact Information */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost there!</h3>
                      <p className="text-gray-600">Get your personalized quotes in 30 seconds</p>
                    </div>

                    {/* Save Quotes Option */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="saveQuotes"
                          checked={formData.saveQuotes}
                          onChange={(e) => handleInputChange("saveQuotes", e.target.checked)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <label htmlFor="saveQuotes" className="font-medium text-gray-900">
                            Save my quotes & get expert recommendations
                          </label>
                          <div className="mt-2 space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Get personalized plan recommendations</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Free expert consultation</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Price drop alerts & renewal reminders</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Fields */}
                    {formData.saveQuotes && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required={formData.saveQuotes}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@domain.com"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required={formData.saveQuotes}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 border-2 border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm rounded-l-xl">
                              +91
                            </span>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                                handleInputChange("phone", value)
                              }}
                              placeholder="Enter 10-digit mobile number"
                              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              maxLength="10"
                              required={formData.saveQuotes}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={!isStep1Valid || !isStep2Valid || loading}
                        className="flex-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:transform-none"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Getting quotes from {estimatedPremium ? "5+" : "15+"} insurers...</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-5 w-5" />
                            <span>Get My Quotes Now</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-center text-sm text-gray-600 mt-4">
                      🔒 Your information is 100% secure and will not be shared with third parties
                    </p>
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar with Benefits */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Benefits Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose InsureCompare?</h3>
                <div className="space-y-4">
                  {[
                    { icon: Shield, title: "100% Free Service", desc: "No hidden charges or commission" },
                    { icon: Award, title: "IRDA Certified", desc: "Regulated insurance broker" },
                    { icon: Users, title: "Expert Guidance", desc: "Free consultation with certified advisors" },
                    { icon: Lock, title: "Secure & Private", desc: "Your data is encrypted and protected" },
                    { icon: Clock, title: "Instant Quotes", desc: "Real-time premiums in 30 seconds" },
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <benefit.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Testimonials */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What Our Customers Say</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      "Saved ₹15,000 annually! Found the perfect plan in minutes."
                    </p>
                    <p className="text-xs text-gray-500">- Priya S., Mumbai</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      "Expert advisor helped me choose the right coverage. Excellent service!"
                    </p>
                    <p className="text-xs text-gray-500">- Rajesh K., Delhi</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Our Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">10L+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹500Cr+</div>
                    <div className="text-sm text-gray-600">Coverage Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">15+</div>
                    <div className="text-sm text-gray-600">Insurance Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">98%</div>
                    <div className="text-sm text-gray-600">Customer Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-blue-600 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Our insurance experts are available to help you choose the right plan.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>Call: 1800-123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>Mon-Sat: 9 AM - 9 PM</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  Request Callback
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Trust Elements */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Trusted by India's Leading Financial Institutions
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-6">
              {[
                { name: "RBI", desc: "Regulated Entity" },
                { name: "IRDA", desc: "Licensed Broker" },
                { name: "ISO 27001", desc: "Security Certified" },
                { name: "SSL", desc: "Encrypted Platform" },
              ].map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <span className="text-gray-700 font-bold text-xs">{cert.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{cert.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>4.8★ Trustpilot Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>10L+ Satisfied Customers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md text-center">
              <div className="mb-6">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Getting Your Personalized Quotes</h3>
                <p className="text-gray-600">Analyzing premiums from 15+ top insurers...</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Connecting to insurers...</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Calculating premiums...</span>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Preparing comparison...</span>
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">This usually takes 10-30 seconds</p>
              </div>
            </div>
          </div>
        )}
        {/* Premium Calculator Modal */}
        <PremiumCalculator isOpen={showPremiumCalculator} onClose={() => setShowPremiumCalculator(false)} />
      </div>
    </div>
  )
}
