"use client"

import { useState } from "react"
import { CheckCircle, Code, Zap, Shield, Users, Award, ArrowRight } from "lucide-react"

export default function IntegrationGuide() {
  const [activeTab, setActiveTab] = useState("overview")

  const integrationSteps = [
    {
      step: 1,
      title: "Expert Chat Widget",
      description: "Added globally to app/layout.tsx",
      status: "completed",
      details: "Now appears as floating chat button on all pages with real-time messaging interface",
    },
    {
      step: 2,
      title: "Premium Calculator",
      description: "Integrated into InsuranceQuoteForm",
      status: "completed",
      details: "Interactive calculator accessible from cover amount selection with instant estimates",
    },
    {
      step: 3,
      title: "Plan Details Modal",
      description: "Added to QuoteResults and QuoteComparison",
      status: "completed",
      details: "Comprehensive plan viewer with tabs for benefits, exclusions, documents, and reviews",
    },
    {
      step: 4,
      title: "Advanced Filters",
      description: "Enhanced filtering in QuoteResults",
      status: "completed",
      details: "Multi-criteria filtering with premium range, companies, ratings, and features",
    },
    {
      step: 5,
      title: "Document Uploader",
      description: "Added to QuoteResults page",
      status: "completed",
      details: "Professional document upload with drag-and-drop for application documents",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Secure file uploads, data encryption, and privacy compliance",
      color: "blue",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Real-time chat with insurance advisors and personalized recommendations",
      color: "green",
    },
    {
      icon: Zap,
      title: "Instant Calculations",
      description: "Real-time premium estimates and interactive comparison tools",
      color: "yellow",
    },
    {
      icon: Award,
      title: "Professional UI",
      description: "PolicyBazaar-style interface with modern animations and interactions",
      color: "purple",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🚀 ICE by Ensuredit - Advanced Features Integration Complete!
            </h1>
            <p className="text-lg text-gray-600">Your insurance platform now includes professional-grade features</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Integration Status */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✅ Integration Status</h2>

          <div className="space-y-4">
            {integrationSteps.map((step) => (
              <div
                key={step.step}
                className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-600 text-white text-sm font-bold px-2 py-1 rounded">
                      Step {step.step}
                    </span>
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-700 mt-1">{step.description}</p>
                  <p className="text-sm text-green-700 mt-2">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Navigation Guide */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🧭 How to Access New Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">📝 Quote Form Enhancements</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Premium Calculator button in cover selection</li>
                  <li>• Real-time age calculation and risk profiling</li>
                  <li>• Enhanced validation and smart suggestions</li>
                </ul>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
                >
                  Try Quote Form
                </button>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">📊 Results Page Features</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• "Full Details" button on each quote card</li>
                  <li>• Advanced Filters with multiple criteria</li>
                  <li>• Upload Documents button in actions</li>
                </ul>
                <button
                  onClick={() => (window.location.href = "/results")}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
                >
                  View Results Page
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">🔍 Comparison Enhancements</h3>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• "View Full Details" for each plan</li>
                  <li>• Enhanced pros/cons analysis</li>
                  <li>• Expert recommendations section</li>
                </ul>
                <button
                  onClick={() => (window.location.href = "/compare")}
                  className="mt-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg"
                >
                  Try Comparison
                </button>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-orange-900 mb-2">💬 Global Features</h3>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Expert Chat Widget (bottom-right)</li>
                  <li>• Available on all pages</li>
                  <li>• Real-time messaging interface</li>
                </ul>
                <div className="mt-3 text-sm text-orange-700">Look for the chat button in the bottom-right corner!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚙️ Technical Implementation</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Files Modified:</h3>
              <div className="space-y-2">
                {[
                  { file: "app/layout.tsx", change: "Added ExpertChatWidget globally" },
                  { file: "components/InsuranceQuoteForm.tsx", change: "Integrated PremiumCalculator" },
                  {
                    file: "components/QuoteResults.tsx",
                    change: "Added PlanDetailsModal, AdvancedFilter, DocumentUploader",
                  },
                  { file: "components/QuoteComparison.tsx", change: "Added PlanDetailsModal integration" },
                  { file: "components/AdvancedFeatures.tsx", change: "Created comprehensive feature set" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="h-4 w-4 text-gray-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{item.file}</div>
                      <div className="text-sm text-gray-600">{item.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features Added:</h3>
              <div className="space-y-3">
                {[
                  "Real-time premium calculation with multiple factors",
                  "Comprehensive plan details with tabbed interface",
                  "Professional document upload with progress tracking",
                  "Advanced filtering with multiple criteria",
                  "Expert chat widget with messaging interface",
                  "Customer review system with verification",
                  "Mobile-optimized responsive design",
                  "Accessibility features and keyboard navigation",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🎯 Ready to Test!</h2>
          <p className="text-blue-100 mb-6">
            All advanced features have been successfully integrated into your core platform. Start exploring the
            enhanced functionality across all pages.
          </p>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>Start with Quote Form</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => (window.location.href = "/advanced-features")}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Feature Demos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
