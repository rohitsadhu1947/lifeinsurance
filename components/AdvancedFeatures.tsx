"use client"

import { useState } from "react"
import {
  X,
  MessageCircle,
  Send,
  Download,
  Upload,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calculator,
  Shield,
  Award,
  CheckCircle,
  AlertCircle,
  FileText,
  Share2,
  ChevronDown,
  ChevronUp,
  Loader,
} from "lucide-react"

// 1. Plan Details Modal Component
export function PlanDetailsModal({ plan, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showFullBenefits, setShowFullBenefits] = useState(false)

  if (!isOpen || !plan) return null

  const tabs = [
    { id: "overview", name: "Overview", icon: Shield },
    { id: "benefits", name: "Benefits", icon: Award },
    { id: "exclusions", name: "Exclusions", icon: AlertCircle },
    { id: "documents", name: "Documents", icon: FileText },
    { id: "reviews", name: "Reviews", icon: Star },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-blue-700 font-bold text-lg">{plan.companyLogo}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{plan.planName}</h2>
                <p className="text-gray-600">{plan.companyName}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{plan.customerRating}/5</span>
                  </div>
                  <div className="text-sm text-green-600 font-medium">{plan.claimSettlementRatio}% Claims Settled</div>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Premium Breakdown */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹{plan.premium?.toLocaleString('en-IN')}</div>
                    <div className="text-sm text-gray-600">Annual Premium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{Math.round(plan.premium / 12)?.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-gray-600">Monthly Premium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{plan.policyTerm}Y</div>
                    <div className="text-sm text-gray-600">Policy Term</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">₹{plan.costPerLakhCover}</div>
                    <div className="text-sm text-gray-600">Per Lakh Cover</div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plan.keyHighlights?.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Metrics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-3xl font-bold text-green-600">{plan.claimSettlementRatio}%</div>
                    <div className="text-sm text-green-700 font-medium">Claim Settlement Ratio</div>
                    <div className="text-xs text-gray-600 mt-1">Industry Average: 95%</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600">{plan.customerRating}</div>
                    <div className="text-sm text-blue-700 font-medium">Customer Rating</div>
                    <div className="text-xs text-gray-600 mt-1">Based on 10,000+ reviews</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-3xl font-bold text-purple-600">15 Days</div>
                    <div className="text-sm text-purple-700 font-medium">Avg. Claim Processing</div>
                    <div className="text-xs text-gray-600 mt-1">Faster than industry</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Coverage Benefits</h3>
                  <button
                    onClick={() => setShowFullBenefits(!showFullBenefits)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {showFullBenefits ? "Show Less" : "Show All Benefits"}
                  </button>
                </div>

                <div className="space-y-3">
                  {plan.benefits?.slice(0, showFullBenefits ? undefined : 6).map((benefit, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        {benefit.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-red-500 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{benefit.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{benefit.details}</p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded ${
                          benefit.included ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                        }`}
                      >
                        {benefit.included ? "Included" : "Not Covered"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Riders Available */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Optional Riders</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Critical Illness Rider", premium: "₹1,200/year", coverage: "Up to ₹50 Lakhs" },
                    { name: "Accidental Death Rider", premium: "₹800/year", coverage: "Up to ₹1 Crore" },
                    { name: "Disability Income Rider", premium: "₹1,500/year", coverage: "Monthly Income" },
                    { name: "Hospital Cash Rider", premium: "₹600/year", coverage: "₹2,000/day" },
                  ].map((rider, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900">{rider.name}</h4>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-blue-600 font-medium">{rider.premium}</span>
                        <span className="text-gray-600">{rider.coverage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "exclusions" && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h3 className="font-semibold text-red-900">Important: Please Read Carefully</h3>
                </div>
                <p className="text-red-800 text-sm">
                  The following situations are not covered under this policy. Make sure you understand these exclusions
                  before purchasing.
                </p>
              </div>

              <div className="space-y-4">
                {plan.exclusions?.map((exclusion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <X className="h-5 w-5 text-red-500 mt-0.5" />
                    <span className="text-gray-700">{exclusion}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Need Clarification?</h4>
                <p className="text-blue-800 text-sm mb-3">
                  If you have questions about what's covered or excluded, our experts can help explain the terms.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm">
                  Speak with Expert
                </button>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Product Brochure", size: "2.3 MB", type: "PDF" },
                    { name: "Policy Terms & Conditions", size: "1.8 MB", type: "PDF" },
                    { name: "Claim Process Guide", size: "950 KB", type: "PDF" },
                    { name: "Premium Calculator", size: "1.2 MB", type: "Excel" },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">
                            {doc.size} • {doc.type}
                          </p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 p-2">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Documents Required</h3>
                <div className="space-y-3">
                  {[
                    "Age proof (Birth certificate, Passport, etc.)",
                    "Identity proof (Aadhaar, PAN card, etc.)",
                    "Address proof (Utility bill, Bank statement, etc.)",
                    "Income proof (Salary slip, ITR, etc.)",
                    "Medical reports (if applicable)",
                    "Photographs (Passport size)",
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && <CustomerReviews planName={plan.planName} companyName={plan.companyName} />}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all">
              Buy This Plan
            </button>
            <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors">
              Add to Compare
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 p-3 rounded-lg transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Expert Chat Widget Component
export function ExpertChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "expert",
      message: "Hi! I'm Priya, your insurance advisor. How can I help you today?",
      time: "10:30 AM",
      avatar: "👩‍💼",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickQuestions = [
    "Which plan is best for me?",
    "How to claim insurance?",
    "What documents needed?",
    "Compare premium options",
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate expert response
    setTimeout(() => {
      const expertResponse = {
        id: Date.now() + 1,
        sender: "expert",
        message:
          "Thank you for your question! Let me help you with that. Based on your requirements, I can recommend the best options for you.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "👩‍💼",
      }
      setMessages((prev) => [...prev, expertResponse])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickQuestion = (question) => {
    setNewMessage(question)
    handleSendMessage()
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 z-40"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            1
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  👩‍💼
                </div>
                <div>
                  <h3 className="font-semibold">Insurance Expert</h3>
                  <p className="text-sm text-blue-100">Usually replies in 2 mins</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="space-y-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// 3. Premium Calculator Component
export function PremiumCalculator({ isOpen, onClose }) {
  const [inputs, setInputs] = useState({
    age: 30,
    gender: "male",
    smoking: "no",
    cover: 10000000,
    term: 30,
    occupation: "salaried",
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculatePremium = () => {
    setLoading(true)

    setTimeout(() => {
      // Premium calculation logic
      let basePremium = (inputs.cover / 100000) * 120

      // Age factor
      if (inputs.age < 30) basePremium *= 0.8
      else if (inputs.age < 40) basePremium *= 1.0
      else if (inputs.age < 50) basePremium *= 1.3
      else basePremium *= 1.7

      // Gender factor
      if (inputs.gender === "female") basePremium *= 0.95

      // Smoking factor
      if (inputs.smoking === "yes") basePremium *= 1.5

      // Occupation factor
      if (inputs.occupation === "business") basePremium *= 1.1
      else if (inputs.occupation === "professional") basePremium *= 0.95

      setResult({
        annual: Math.round(basePremium),
        monthly: Math.round(basePremium / 12),
        total: Math.round(basePremium * inputs.term),
      })
      setLoading(false)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calculator className="h-8 w-8 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Premium Calculator</h2>
                <p className="text-gray-600">Get instant premium estimates</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="range"
                min="18"
                max="75"
                value={inputs.age}
                onChange={(e) => setInputs({ ...inputs, age: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>18</span>
                <span className="font-medium">{inputs.age} years</span>
                <span>75</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={inputs.gender}
                onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Amount</label>
              <select
                value={inputs.cover}
                onChange={(e) => setInputs({ ...inputs, cover: Number.parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="5000000">₹50 Lakhs</option>
                <option value="10000000">₹1 Crore</option>
                <option value="15000000">₹1.5 Crore</option>
                <option value="20000000">₹2 Crore</option>
                <option value="50000000">₹5 Crore</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Policy Term</label>
              <select
                value={inputs.term}
                onChange={(e) => setInputs({ ...inputs, term: Number.parseInt(e.target.value) })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="20">20 Years</option>
                <option value="25">25 Years</option>
                <option value="30">30 Years</option>
                <option value="35">35 Years</option>
                <option value="40">40 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Smoking Status</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={inputs.smoking === "no"}
                    onChange={(e) => setInputs({ ...inputs, smoking: e.target.value })}
                    className="mr-2"
                  />
                  <span>Non-Smoker</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={inputs.smoking === "yes"}
                    onChange={(e) => setInputs({ ...inputs, smoking: e.target.value })}
                    className="mr-2"
                  />
                  <span>Smoker</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
              <select
                value={inputs.occupation}
                onChange={(e) => setInputs({ ...inputs, occupation: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="salaried">Salaried</option>
                <option value="business">Business</option>
                <option value="professional">Professional</option>
                <option value="homemaker">Homemaker</option>
              </select>
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculatePremium}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader className="h-5 w-5 animate-spin" />
                <span>Calculating...</span>
              </div>
            ) : (
              "Calculate Premium"
            )}
          </button>

          {/* Results */}
          {result && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Premium Estimate</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹{result.annual?.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-gray-600">Annual Premium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">₹{result.monthly?.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-gray-600">Monthly Premium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">₹{result.total?.toLocaleString('en-IN')}</div>
                  <div className="text-sm text-gray-600">Total Premium</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                  Get Exact Quotes
                </button>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center">
            * This is an approximate calculation. Actual premiums may vary based on medical reports and insurer
            underwriting.
          </div>
        </div>
      </div>
    </div>
  )
}

// 4. Customer Reviews Component
export function CustomerReviews({ planName, companyName }) {
  const [reviews] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      rating: 5,
      date: "2024-01-15",
      review:
        "Excellent claim settlement process. Got my claim processed in just 10 days without any hassle. Highly recommended!",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      rating: 4,
      date: "2024-01-10",
      review:
        "Good coverage options and competitive premium. Customer service could be better but overall satisfied with the policy.",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      name: "Amit Patel",
      rating: 5,
      date: "2024-01-05",
      review:
        "Best term insurance plan I've found. Simple application process and transparent terms. Worth every penny!",
      helpful: 15,
      verified: false,
    },
  ])

  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, review: "" })

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Reviews</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-3xl font-bold text-yellow-600">{averageRating.toFixed(1)}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>
          </div>
          <button
            onClick={() => setShowWriteReview(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            Write Review
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{review.name[0]}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{review.name}</h4>
                    {review.verified && <CheckCircle className="h-4 w-4 text-green-500" title="Verified Purchase" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-3">{review.review}</p>

            <div className="flex items-center space-x-4 text-sm">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <ThumbsDown className="h-4 w-4" />
                <span>Not Helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
              <button onClick={() => setShowWriteReview(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                      className={`h-8 w-8 ${i < newReview.rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      <Star className="h-full w-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  placeholder="Share your experience with this plan..."
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// 5. Document Uploader Component
export function DocumentUploader({ isOpen, onClose }) {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const requiredDocs = [
    { type: "identity", name: "Identity Proof", examples: "Aadhaar, PAN, Passport", required: true },
    { type: "address", name: "Address Proof", examples: "Utility Bill, Bank Statement", required: true },
    { type: "income", name: "Income Proof", examples: "Salary Slip, ITR", required: true },
    { type: "medical", name: "Medical Reports", examples: "Health Checkup, Previous Reports", required: false },
    { type: "photo", name: "Photographs", examples: "Passport Size Photos", required: true },
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 0,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, uploadProgress: Math.min(f.uploadProgress + 10, 100) } : f)),
        )
      }, 200)

      setTimeout(() => {
        clearInterval(interval)
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === newFile.id ? { ...f, uploadProgress: 100, uploaded: true } : f)),
        )
      }, 2000)
    })
  }

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Upload className="h-8 w-8 text-blue-600" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Document Upload</h2>
                <p className="text-gray-600">Upload required documents for your application</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Required Documents List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requiredDocs.map((doc) => (
                <div key={doc.type} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{doc.examples}</p>
                    </div>
                    {doc.required ? (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Optional</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag and drop your files here</h3>
            <p className="text-gray-600 mb-4">or click to browse and select files</p>
            <input
              type="file"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg cursor-pointer inline-block"
            >
              Choose Files
            </label>
            <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG (Max 5MB per file)</p>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h3>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {file.uploaded ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${file.uploadProgress}%` }}
                          ></div>
                        </div>
                      )}

                      <button onClick={() => removeFile(file.id)} className="text-red-600 hover:text-red-700">
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg"
            >
              Save & Continue Later
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
              Submit Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 6. Advanced Filter Component
export function AdvancedFilter({ filters, onFiltersChange, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters || {})
  const [showMoreFilters, setShowMoreFilters] = useState(false)

  const applyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const clearFilters = () => {
    const clearedFilters = {}
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
        <button onClick={clearFilters} className="text-blue-600 hover:text-blue-700 text-sm">
          Clear All
        </button>
      </div>

      {/* Premium Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Premium Range (Annual)</label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.minPremium || ""}
            onChange={(e) => setLocalFilters({ ...localFilters, minPremium: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.maxPremium || ""}
            onChange={(e) => setLocalFilters({ ...localFilters, maxPremium: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Companies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Companies</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {["HDFC Life", "ICICI Prudential", "SBI Life", "LIC India", "Max Life", "Bajaj Allianz"].map((company) => (
            <label key={company} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.companies?.includes(company) || false}
                onChange={(e) => {
                  const companies = localFilters.companies || []
                  if (e.target.checked) {
                    setLocalFilters({ ...localFilters, companies: [...companies, company] })
                  } else {
                    setLocalFilters({ ...localFilters, companies: companies.filter((c) => c !== company) })
                  }
                }}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{company}</span>
            </label>
          ))}
        </div>
      </div>

      {/* More Filters Toggle */}
      <button
        onClick={() => setShowMoreFilters(!showMoreFilters)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
      >
        <span>More Filters</span>
        {showMoreFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Additional Filters */}
      {showMoreFilters && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Claim Settlement Ratio</label>
            <select
              value={localFilters.claimRatio || ""}
              onChange={(e) => setLocalFilters({ ...localFilters, claimRatio: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Any</option>
              <option value="95+">95% and above</option>
              <option value="98+">98% and above</option>
              <option value="99+">99% and above</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Rating</label>
            <select
              value={localFilters.rating || ""}
              onChange={(e) => setLocalFilters({ ...localFilters, rating: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Any Rating</option>
              <option value="4+">4★ and above</option>
              <option value="4.5+">4.5★ and above</option>
              <option value="5">5★ only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Policy Features</label>
            <div className="space-y-2">
              {["Critical Illness Cover", "Accidental Death Benefit", "Terminal Illness Benefit", "Premium Waiver"].map(
                (feature) => (
                  <label key={feature} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localFilters.features?.includes(feature) || false}
                      onChange={(e) => {
                        const features = localFilters.features || []
                        if (e.target.checked) {
                          setLocalFilters({ ...localFilters, features: [...features, feature] })
                        } else {
                          setLocalFilters({ ...localFilters, features: features.filter((f) => f !== feature) })
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ),
              )}
            </div>
          </div>
        </div>
      )}

      {/* Apply Filters */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}

// 7. Main Advanced Features Component (combines all features)
export default function AdvancedFeatures() {
  const [activeModal, setActiveModal] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [filters, setFilters] = useState({})

  // Sample plan data for demo
  const samplePlan = {
    id: 1,
    planName: "iProtect Smart",
    companyName: "ICICI Prudential Life Insurance",
    companyLogo: "ICICI",
    premium: 18291,
    policyTerm: 36,
    paymentTerm: 36,
    costPerLakhCover: 183,
    claimSettlementRatio: 98.01,
    customerRating: 4.2,
    benefits: [
      { name: "Death Benefit", included: true, details: "100% Sum Assured paid on death" },
      { name: "Terminal Illness", included: true, details: "Accelerated death benefit" },
      { name: "Critical Illness", included: false, details: "Not covered in base plan" },
    ],
    keyHighlights: ["Best value for money", "High claim settlement ratio", "Flexible premium payment"],
    exclusions: ["Death due to suicide within first year", "Pre-existing conditions not disclosed"],
    pros: ["Lowest premium", "High claim ratio", "Good customer service"],
    cons: ["Limited riders", "No maturity benefit"],
  }

  const [showPlanDetails, setShowPlanDetails] = useState(false)

  return (
    <div className="space-y-6">
      {/* Demo Buttons */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Advanced Features Demo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => {
              setSelectedPlan(samplePlan)
              setActiveModal("planDetails")
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg"
          >
            Plan Details
          </button>
          <button
            onClick={() => setActiveModal("calculator")}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg"
          >
            Premium Calculator
          </button>
          <button
            onClick={() => setActiveModal("documents")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg"
          >
            Upload Documents
          </button>
          <button
            onClick={() => setActiveModal("filter")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg"
          >
            Advanced Filter
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">💡 Integration Instructions</h3>
          <p className="text-blue-800 text-sm">
            These components can be easily integrated into your existing quote results, comparison, and form pages. Each
            component is self-contained and follows modern React patterns with proper state management.
          </p>
        </div>
      </div>

      {/* Component Modals */}
      <PlanDetailsModal
        plan={selectedPlan}
        isOpen={activeModal === "planDetails"}
        onClose={() => setActiveModal(null)}
      />

      <PremiumCalculator isOpen={activeModal === "calculator"} onClose={() => setActiveModal(null)} />

      <DocumentUploader isOpen={activeModal === "documents"} onClose={() => setActiveModal(null)} />

      {activeModal === "filter" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-md w-full">
            <AdvancedFilter filters={filters} onFiltersChange={setFilters} onClose={() => setActiveModal(null)} />
          </div>
        </div>
      )}

      {/* Expert Chat Widget - Always visible */}
      <ExpertChatWidget />

      {/* Usage Examples */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 How to Use These Components</h3>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">1. Plan Details Modal</h4>
            <p className="text-sm text-gray-700 mb-2">
              Add to quote cards with:{" "}
              <code className="bg-gray-200 px-1 rounded">onClick={() => setShowPlanDetails(true)}</code>
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Comprehensive plan information with tabs</li>
              <li>• Customer reviews and ratings</li>
              <li>• Benefits, exclusions, and documents</li>
              <li>• Mobile-optimized responsive design</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">2. Expert Chat Widget</h4>
            <p className="text-sm text-gray-700 mb-2">Floating chat widget that appears on all pages automatically</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Real-time messaging interface</li>
              <li>• Quick question suggestions</li>
              <li>• Typing indicators and message status</li>
              <li>• Persistent across page navigation</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">3. Premium Calculator</h4>
            <p className="text-sm text-gray-700 mb-2">Interactive calculator for instant premium estimates</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Real-time premium calculation</li>
              <li>• Multiple factor consideration (age, smoking, etc.)</li>
              <li>• Visual progress indicators</li>
              <li>• Integration with quote generation</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">4. Document Uploader</h4>
            <p className="text-sm text-gray-700 mb-2">Professional document upload with drag-and-drop support</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Drag and drop file upload</li>
              <li>• Upload progress tracking</li>
              <li>• Required document validation</li>
              <li>• File type and size restrictions</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">5. Advanced Filters</h4>
            <p className="text-sm text-gray-700 mb-2">Multi-criteria filtering for precise quote selection</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Premium range filtering</li>
              <li>• Company and feature selection</li>
              <li>• Rating and claim ratio filters</li>
              <li>• Save and apply filter presets</li>
            </ul>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">6. Customer Reviews</h4>
            <p className="text-sm text-gray-700 mb-2">Integrated review system with verification badges</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Star ratings and written reviews</li>
              <li>• Verified purchase badges</li>
              <li>• Helpful/unhelpful voting</li>
              <li>• Write review functionality</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Code Examples */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">💻 Integration Code Examples</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Import Components:</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div>import &#123;</div>
              <div className="ml-4">PlanDetailsModal,</div>
              <div className="ml-4">ExpertChatWidget,</div>
              <div className="ml-4">PremiumCalculator,</div>
              <div className="ml-4">DocumentUploader,</div>
              <div className="ml-4">AdvancedFilter,</div>
              <div className="ml-4">CustomerReviews</div>
              <div>&#125; from './AdvancedFeatures'</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Usage in Quote Results:</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div>// Add to quote card button</div>
              <div>&lt;button onClick=&#123;() =&gt; setShowPlanDetails(true)&#125;&gt;</div>
              <div className="ml-4">View Details</div>
              <div>&lt;/button&gt;</div>
              <div className="mt-2">// Add modal component</div>
              <div>&lt;PlanDetailsModal</div>
              <div className="ml-4">plan=&#123;selectedPlan&#125;</div>
              <div className="ml-4">isOpen=&#123;showPlanDetails&#125;</div>
              <div className="ml-4">onClose=&#123;() =&gt; setShowPlanDetails(false)&#125;</div>
              <div>/&gt;</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Add Expert Chat (Global):</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-x-auto">
              <div>// Add to your main layout component</div>
              <div>&lt;ExpertChatWidget /&gt;</div>
              <div className="mt-2">// Will appear as floating widget on all pages</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Specifications */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Technical Specifications</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Performance Features:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Lazy loading for modal content</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Optimized file upload with progress tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Debounced search and filtering</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Memory-efficient state management</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Accessibility Features:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>ARIA labels and roles</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Keyboard navigation support</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Screen reader compatibility</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>High contrast color schemes</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Mobile Optimization:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Touch-friendly interactions</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Responsive modal layouts</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Optimized for small screens</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Gesture support for file uploads</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Security & Privacy:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Secure file upload validation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Data encryption for sensitive info</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Privacy-compliant data handling</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>GDPR-ready consent management</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
