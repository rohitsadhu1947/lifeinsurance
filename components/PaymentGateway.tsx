"use client"

import { useState } from "react"
import { X, ArrowLeft, CreditCard, Building2, Wallet, Calendar, Clock, Smartphone } from "lucide-react"

interface PaymentGatewayProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  insurerName: string
}

export default function PaymentGateway({ isOpen, onClose, amount, insurerName }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  })
  const [upiId, setUpiId] = useState("")
  const [selectedBank, setSelectedBank] = useState("")
  const [walletType, setWalletType] = useState("")

  const paymentMethods = [
    {
      id: "card",
      name: "Card",
      subtitle: "Visa, MasterCard, RuPay & More",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />
    },
    {
      id: "upi",
      name: "UPI / QR",
      subtitle: "Google Pay, PhonePe, Paytm & More",
      icon: <Smartphone className="h-6 w-6 text-blue-600" />
    },
    {
      id: "netbanking",
      name: "Netbanking",
      subtitle: "All Indian banks",
      icon: <Building2 className="h-6 w-6 text-blue-600" />
    },
    {
      id: "wallet",
      name: "Wallet",
      subtitle: "PhonePe & More",
      icon: <Wallet className="h-6 w-6 text-blue-600" />
    },
    {
      id: "emi",
      name: "EMI",
      subtitle: "EMI via Debit/Credit cards, axio & More",
      icon: <Calendar className="h-6 w-6 text-blue-600" />
    },
    {
      id: "paylater",
      name: "Pay Later",
      subtitle: "LazyPay, ICICI, and FlexiPay",
      icon: <Clock className="h-6 w-6 text-blue-600" />
    }
  ]

  const banks = [
    "State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank",
    "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Union Bank of India", "Indian Bank"
  ]

  const wallets = ["PhonePe", "Paytm", "Google Pay", "Amazon Pay", "Mobikwik"]

  const handlePayment = () => {
    // Handle payment logic here
    alert("Payment processing...")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <div className="font-semibold">{insurerName}</div>
              <div className="text-xs text-blue-100 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-1"></span>
                Razorpay Trusted Business
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Cards, UPI & More</h2>

          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {method.icon}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.subtitle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Form */}
          {selectedMethod && (
            <div className="border-t pt-4">
              {selectedMethod === "card" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Card Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardDetails.cardNumber}
                      onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardDetails.expiryDate}
                        onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardDetails.cardholderName}
                      onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === "upi" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">UPI Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@paytm"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    You'll be redirected to your UPI app to complete the payment
                  </div>
                </div>
              )}

              {selectedMethod === "netbanking" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Select Bank</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Choose your bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Bank</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {selectedMethod === "wallet" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Select Wallet</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Choose your wallet</label>
                    <select
                      value={walletType}
                      onChange={(e) => setWalletType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Wallet</option>
                      {wallets.map((wallet) => (
                        <option key={wallet} value={wallet}>{wallet}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {selectedMethod === "emi" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">EMI Options</h3>
                  <div className="text-sm text-gray-600">
                    EMI options will be available after card selection
                  </div>
                </div>
              )}

              {selectedMethod === "paylater" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Pay Later Options</h3>
                  <div className="text-sm text-gray-600">
                    Pay Later options will be available after verification
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4 flex items-center justify-between">
          <div>
            <div className="font-bold text-lg">₹ {amount.toLocaleString('en-IN')}</div>
            <div className="text-sm text-gray-600">View Details</div>
          </div>
          <button
            onClick={handlePayment}
            disabled={!selectedMethod}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  )
}
