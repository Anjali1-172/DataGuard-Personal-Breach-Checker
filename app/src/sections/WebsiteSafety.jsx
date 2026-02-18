import { useState } from 'react'

const mockWebsiteData = {
  'google.com': {
    domain: 'google.com',
    trustScore: 98,
    safety: 'safe',
    category: 'Search Engine',
    ssl: true,
    lastChecked: '2026-02-17',
    risks: [],
    details: {
      malware: false,
      phishing: false,
      spam: false,
      adult: false
    }
  },
  'facebook.com': {
    domain: 'facebook.com',
    trustScore: 85,
    safety: 'safe',
    category: 'Social Media',
    ssl: true,
    lastChecked: '2026-02-17',
    risks: ['Data collection practices'],
    details: {
      malware: false,
      phishing: false,
      spam: false,
      adult: false
    }
  },
  'example-malicious.com': {
    domain: 'example-malicious.com',
    trustScore: 12,
    safety: 'dangerous',
    category: 'Unknown',
    ssl: false,
    lastChecked: '2026-02-17',
    risks: ['Known phishing site', 'Malware distribution', 'SSL certificate missing'],
    details: {
      malware: true,
      phishing: true,
      spam: true,
      adult: false
    }
  }
}

const popularWebsites = [
  { domain: 'google.com', category: 'Search', score: 98 },
  { domain: 'youtube.com', category: 'Video', score: 95 },
  { domain: 'facebook.com', category: 'Social', score: 85 },
  { domain: 'amazon.com', category: 'Shopping', score: 92 },
  { domain: 'twitter.com', category: 'Social', score: 82 },
  { domain: 'linkedin.com', category: 'Professional', score: 90 },
]

function WebsiteSafety() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkWebsite = (e) => {
    e.preventDefault()
    if (!url.trim()) return

    setIsChecking(true)
    
    // Simulate API call
    setTimeout(() => {
      const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase()
      const data = mockWebsiteData[domain] || {
        domain: domain,
        trustScore: Math.floor(Math.random() * 40) + 50,
        safety: 'unknown',
        category: 'Unknown',
        ssl: Math.random() > 0.3,
        lastChecked: '2026-02-17',
        risks: ['Limited information available'],
        details: {
          malware: false,
          phishing: false,
          spam: false,
          adult: false
        }
      }
      setResult(data)
      setIsChecking(false)
    }, 1500)
  }

  const getSafetyColor = (safety) => {
    switch (safety) {
      case 'safe': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'dangerous': return 'text-red-400 bg-red-500/20 border-red-500/30'
      default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-cyan-400 text-sm font-medium">Website Safety Analyzer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Check Website <span className="text-cyan-400">Trust Score</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Verify if a website is safe to visit before entering your personal information. 
            We analyze SSL certificates, malware databases, and phishing reports.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={checkWebsite} className="relative">
            <input
              type="text"
              placeholder="Enter website URL (e.g., google.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all pr-36"
            />
            <button
              type="submit"
              disabled={isChecking || !url.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? 'Checking...' : 'Analyze'}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${getSafetyColor(result.safety)}`}>
                    {result.trustScore}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{result.domain}</h3>
                    <p className="text-gray-400">{result.category}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getSafetyColor(result.safety)}`}>
                  {result.safety}
                </span>
              </div>

              {/* Security Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className={`text-2xl mb-1 ${result.ssl ? 'text-green-400' : 'text-red-400'}`}>
                    {result.ssl ? '✓' : '✗'}
                  </div>
                  <div className="text-gray-400 text-sm">SSL Certificate</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className={`text-2xl mb-1 ${result.details.malware ? 'text-red-400' : 'text-green-400'}`}>
                    {result.details.malware ? '✗' : '✓'}
                  </div>
                  <div className="text-gray-400 text-sm">Malware Free</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className={`text-2xl mb-1 ${result.details.phishing ? 'text-red-400' : 'text-green-400'}`}>
                    {result.details.phishing ? '✗' : '✓'}
                  </div>
                  <div className="text-gray-400 text-sm">No Phishing</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className={`text-2xl mb-1 ${result.details.spam ? 'text-red-400' : 'text-green-400'}`}>
                    {result.details.spam ? '✗' : '✓'}
                  </div>
                  <div className="text-gray-400 text-sm">Spam Safe</div>
                </div>
              </div>

              {/* Risks */}
              {result.risks.length > 0 && (
                <div className="border-t border-white/10 pt-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Potential Risks</h4>
                  <ul className="space-y-2">
                    {result.risks.map((risk, index) => (
                      <li key={index} className="flex items-center gap-2 text-amber-400 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Popular Websites */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Websites Safety Scores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularWebsites.map((site, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => {
                  setUrl(site.domain)
                  setResult(mockWebsiteData[site.domain] || {
                    domain: site.domain,
                    trustScore: site.score,
                    safety: site.score >= 80 ? 'safe' : 'caution',
                    category: site.category,
                    ssl: true,
                    lastChecked: '2026-02-17',
                    risks: [],
                    details: { malware: false, phishing: false, spam: false, adult: false }
                  })
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{site.domain}</h4>
                    <p className="text-gray-400 text-sm">{site.category}</p>
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(site.score)}`}>
                    {site.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebsiteSafety
