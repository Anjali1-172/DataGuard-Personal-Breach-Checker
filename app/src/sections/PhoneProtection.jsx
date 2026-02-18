import { useState } from 'react'

const phoneThreats = [
  {
    title: 'SIM Swapping',
    description: 'Attackers transfer your phone number to their SIM card to intercept calls and SMS codes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-red-400 bg-red-500/20'
  },
  {
    title: 'Smishing Attacks',
    description: 'Phishing via SMS messages that trick you into revealing personal information.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: 'text-amber-400 bg-amber-500/20'
  },
  {
    title: 'Caller ID Spoofing',
    description: 'Scammers fake their caller ID to appear as legitimate businesses or contacts.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    color: 'text-orange-400 bg-orange-500/20'
  },
  {
    title: 'Data Broker Exposure',
    description: 'Your phone number is sold by data brokers to marketers and scammers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'text-purple-400 bg-purple-500/20'
  }
]

const protectionTips = [
  {
    title: 'Enable SIM PIN',
    description: 'Set a PIN code required to use your SIM card in another device.',
    steps: ['Go to Settings > Security > SIM card lock', 'Enable "Lock SIM card"', 'Set a strong 4-8 digit PIN', 'Remember: 3 wrong attempts locks the SIM permanently']
  },
  {
    title: 'Use Authenticator Apps',
    description: 'Replace SMS 2FA with authenticator apps like Google Authenticator or Authy.',
    steps: ['Download an authenticator app', 'Go to account security settings', 'Select "Authenticator App" for 2FA', 'Scan the QR code and save backup codes']
  },
  {
    title: 'Add Account PIN/Password',
    description: 'Set a PIN or password required for account changes with your carrier.',
    steps: ['Call your carrier or visit a store', 'Request a "port freeze" or account PIN', 'Choose a unique PIN not used elsewhere', 'Required for SIM swaps or account changes']
  },
  {
    title: 'Use Secondary Phone Numbers',
    description: 'Use services like Google Voice for online accounts and shopping.',
    steps: ['Sign up for Google Voice or similar service', 'Use this number for online accounts', 'Keep your real number private', 'Easily change if it gets spammed']
  }
]

function PhoneProtection() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [checkResult, setCheckResult] = useState(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkPhone = (e) => {
    e.preventDefault()
    if (!phoneNumber.trim()) return

    setIsChecking(true)
    
    // Simulate phone check
    setTimeout(() => {
      const riskScore = Math.floor(Math.random() * 100)
      setCheckResult({
        number: phoneNumber,
        riskScore,
        exposures: riskScore > 50 ? Math.floor(Math.random() * 5) + 1 : 0,
        breaches: riskScore > 30 ? ['Data Broker Database', 'Marketing List'] : []
      })
      setIsChecking(false)
    }, 1500)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-pink-400 text-sm font-medium">Phone Number Protection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Protect Your <span className="text-pink-400">Mobile Identity</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your phone number is a gateway to your identity. Learn how to protect it 
            from SIM swapping, spam, and data broker exposure.
          </p>
        </div>

        {/* Phone Check */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Check Phone Number Exposure</h3>
            <form onSubmit={checkPhone} className="flex flex-col sm:flex-row gap-3">
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
              />
              <button
                type="submit"
                disabled={isChecking || !phoneNumber.trim()}
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all disabled:opacity-50"
              >
                {isChecking ? 'Checking...' : 'Check'}
              </button>
            </form>

            {checkResult && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className={`p-4 rounded-xl border ${
                  checkResult.riskScore > 50 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : checkResult.riskScore > 25 
                      ? 'bg-amber-500/10 border-amber-500/30' 
                      : 'bg-green-500/10 border-green-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Phone Number</p>
                      <p className="text-white font-mono">{checkResult.number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Risk Score</p>
                      <p className={`text-2xl font-bold ${
                        checkResult.riskScore > 50 
                          ? 'text-red-400' 
                          : checkResult.riskScore > 25 
                            ? 'text-amber-400' 
                            : 'text-green-400'
                      }`}>
                        {checkResult.riskScore}/100
                      </p>
                    </div>
                  </div>
                  
                  {checkResult.exposures > 0 && (
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm mb-2">Found in:</p>
                      <div className="flex flex-wrap gap-2">
                        {checkResult.breaches.map((breach, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full">
                            {breach}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    {checkResult.riskScore > 50 ? (
                      <>
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span className="text-red-400">High risk - Take action immediately</span>
                      </>
                    ) : checkResult.riskScore > 25 ? (
                      <>
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-amber-400">Medium risk - Consider protective measures</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-400">Low risk - Keep monitoring</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Threats Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Common Phone Number Threats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {phoneThreats.map((threat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${threat.color}`}>
                  {threat.icon}
                </div>
                <h4 className="font-semibold text-white mb-2">{threat.title}</h4>
                <p className="text-gray-400 text-sm">{threat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Tips */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 text-center">How to Protect Your Phone Number</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protectionTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
              >
                <h4 className="font-semibold text-white text-lg mb-2">{tip.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{tip.description}</p>
                <ol className="space-y-2">
                  {tip.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="w-5 h-5 bg-pink-500/20 text-pink-400 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhoneProtection
