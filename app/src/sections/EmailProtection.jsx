import { useState } from 'react'

const protectionFeatures = [
  {
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your email account. Even if your password is compromised, 2FA prevents unauthorized access.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600',
    steps: [
      'Go to your email account settings',
      'Find "Security" or "Two-Factor Authentication"',
      'Enable 2FA and choose your method (app, SMS, or security key)',
      'Save backup codes in a secure location'
    ]
  },
  {
    title: 'Strong Unique Passwords',
    description: 'Use a different, complex password for each account. A password manager helps generate and store secure passwords.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    color: 'from-green-500 to-green-600',
    steps: [
      'Use at least 12 characters with mixed case, numbers, and symbols',
      'Avoid common words, names, or dates',
      'Use a password manager like Bitwarden or 1Password',
      'Never reuse passwords across different sites'
    ]
  },
  {
    title: 'Email Aliases',
    description: 'Create unique email addresses for different services. If one is breached, your main email stays protected.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-purple-500 to-purple-600',
    steps: [
      'Use services like SimpleLogin or Firefox Relay',
      'Create a unique alias for each website',
      'If a service is breached, simply delete the alias',
      'Track which sites leak your data'
    ]
  },
  {
    title: 'Breach Monitoring',
    description: 'Get notified immediately when your email appears in a new data breach so you can take quick action.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    color: 'from-amber-500 to-amber-600',
    steps: [
      'Sign up for breach notification services',
      'Check your email regularly on DataGuard',
      'Enable notifications for new breaches',
      'Act quickly when you receive a breach alert'
    ]
  }
]

const securityChecklist = [
  { id: 1, text: 'Enable 2FA on your email account', critical: true },
  { id: 2, text: 'Change your password every 3-6 months', critical: false },
  { id: 3, text: 'Review connected apps and revoke unused access', critical: true },
  { id: 4, text: 'Check login activity for suspicious access', critical: true },
  { id: 5, text: 'Set up recovery email and phone number', critical: true },
  { id: 6, text: 'Be cautious of phishing emails', critical: true },
  { id: 7, text: 'Use email encryption for sensitive messages', critical: false },
  { id: 8, text: 'Regularly backup important emails', critical: false },
]

function EmailProtection() {
  const [expandedFeature, setExpandedFeature] = useState(null)
  const [checkedItems, setCheckedItems] = useState([])

  const toggleCheck = (id) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const progress = Math.round((checkedItems.length / securityChecklist.length) * 100)

  return (
    <section id="protection" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-blue-400 text-sm font-medium">Email Protection Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Secure Your <span className="text-blue-400">Email Identity</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your email is the key to your digital life. Follow these best practices 
            to protect it from hackers, breaches, and unauthorized access.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Security Checklist Progress</span>
            <span className={`font-bold ${progress === 100 ? 'text-green-400' : 'text-blue-400'}`}>
              {progress}%
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                progress === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Protection Features */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Protection Methods</h3>
            {protectionFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all"
              >
                <button
                  onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-lg">{feature.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{feature.description}</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedFeature === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFeature === index && (
                  <div className="px-5 pb-5 border-t border-white/10">
                    <h5 className="text-sm font-medium text-gray-400 mb-3 mt-4">How to implement:</h5>
                    <ol className="space-y-2">
                      {feature.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3 text-gray-300 text-sm">
                          <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Security Checklist */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Security Checklist
              </h3>
              <div className="space-y-3">
                {securityChecklist.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      checkedItems.includes(item.id) ? 'bg-green-500/10' : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(item.id)}
                      onChange={() => toggleCheck(item.id)}
                      className="w-5 h-5 mt-0.5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/20"
                    />
                    <div className="flex-1">
                      <span className={`text-sm ${checkedItems.includes(item.id) ? 'text-green-400 line-through' : 'text-gray-300'}`}>
                        {item.text}
                      </span>
                      {item.critical && (
                        <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                          Critical
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {progress === 100 && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
                  <svg className="w-8 h-8 text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-green-400 font-semibold">Excellent!</p>
                  <p className="text-green-300 text-sm">Your email is well protected.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmailProtection
