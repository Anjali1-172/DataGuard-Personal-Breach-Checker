import { useState } from 'react'

function BreachChecker({ onCheck, isChecking, breachData }) {
  const [email, setEmail] = useState('')
  const [activeTab, setActiveTab] = useState('email')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      onCheck(email.trim())
    }
  }

  const getSeverityColor = (breachCount) => {
    if (breachCount >= 5) return 'text-red-400'
    if (breachCount >= 2) return 'text-amber-400'
    return 'text-yellow-400'
  }

  const getSeverityBg = (breachCount) => {
    if (breachCount >= 5) return 'bg-red-500/20 border-red-500/30'
    if (breachCount >= 2) return 'bg-amber-500/20 border-amber-500/30'
    return 'bg-yellow-500/20 border-yellow-500/30'
  }

  const getRiskLevel = (breachCount) => {
    if (breachCount >= 5) return { level: 'Critical', color: 'text-red-400', bg: 'bg-red-500' }
    if (breachCount >= 2) return { level: 'High', color: 'text-amber-400', bg: 'bg-amber-500' }
    return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500' }
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('email')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'email'
              ? 'bg-blue-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Email Check
        </button>
        <button
          onClick={() => setActiveTab('phone')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'phone'
              ? 'bg-blue-600 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Phone Check
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type={activeTab === 'email' ? 'email' : 'tel'}
              placeholder={activeTab === 'email' ? 'Enter your email address' : 'Enter your phone number'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {activeTab === 'email' ? (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isChecking || !email.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
          >
            {isChecking ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Checking...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </>
            )}
          </button>
        </div>
      </form>

      {/* Privacy Note */}
      <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Anonymous search. We don't store your data.
      </div>

      {/* Results */}
      {breachData && !breachData.error && (
        <div className="border-t border-white/10 pt-6">
          {breachData.breaches && breachData.breaches.length > 0 ? (
            <div className="space-y-4">
              {/* Risk Summary */}
              <div className={`p-4 rounded-xl border ${getSeverityBg(breachData.breaches.length)}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getRiskLevel(breachData.breaches.length).bg}`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getRiskLevel(breachData.breaches.length).color}`}>
                        {getRiskLevel(breachData.breaches.length).level} Risk
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-white font-semibold">{breachData.breaches.length} Breaches Found</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">Your data has been exposed. Take action now.</p>
                  </div>
                </div>
              </div>

              {/* Breach List */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Exposed In</h4>
                {breachData.breaches.map((breach, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="font-semibold text-white">{breach}</h5>
                          <p className="text-gray-400 text-sm">Data breach incident</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full font-medium">Exposed</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recommended Actions
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">1.</span>
                    Change your password immediately on all affected services
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">2.</span>
                    Enable two-factor authentication (2FA) wherever possible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">3.</span>
                    Use a unique password for each account (consider a password manager)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">4.</span>
                    Monitor your accounts for suspicious activity
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-green-400 mb-2">Good News!</h4>
              <p className="text-gray-300">No breaches found for this email address.</p>
              <p className="text-gray-400 text-sm mt-2">Your data appears to be safe... for now.</p>
            </div>
          )}
        </div>
      )}

      {breachData?.error && (
        <div className="border-t border-white/10 pt-6">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
            <p className="text-red-400">{breachData.error}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default BreachChecker
