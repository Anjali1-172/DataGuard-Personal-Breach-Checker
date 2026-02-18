import { useState, useEffect } from 'react'

// Real breach news data (simulated - in production this would come from an API)
const breachNewsData = [
  {
    id: 1,
    title: 'Figure Technology Solutions Suffers Major Data Breach',
    summary: 'Blockchain lending platform Figure confirms data breach affecting 1 million customers, exposing personal and financial information.',
    source: 'The Record',
    date: '2026-02-16',
    affected: '1M',
    severity: 'high',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Substack Notifies Users of Data Breach',
    summary: 'Newsletter platform Substack confirms breach affecting nearly 700,000 accounts, including email addresses and usernames.',
    source: 'TechCrunch',
    date: '2026-02-09',
    affected: '664K',
    severity: 'medium',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Harvard University Reports 1.2M Record Breach',
    summary: 'Harvard University discloses data breach affecting donor information, including high-profile individuals.',
    source: 'The Verge',
    date: '2026-02-05',
    affected: '1.2M',
    severity: 'high',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Qantas Airline Data Breach Exposes 6M Records',
    summary: 'Australian airline Qantas confirms major data breach affecting 6 million customers, including passport and travel details.',
    source: 'BBC News',
    date: '2026-02-05',
    affected: '6M',
    severity: 'critical',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Canada Goose Customer Data Exposed',
    summary: 'Luxury clothing retailer Canada Goose reports breach affecting 839,000 customers with personal information compromised.',
    source: 'CyberScoop',
    date: '2026-02-16',
    affected: '839K',
    severity: 'medium',
    category: 'Retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'University of Pennsylvania Donor Data Breached',
    summary: 'UPenn confirms breach of 1.2M donor records, including prominent figures like Trump and Musk.',
    source: 'Wired',
    date: '2026-02-05',
    affected: '1.2M',
    severity: 'high',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop'
  }
]

const recentBreachSites = [
  { name: 'Resource Corporation of America', records: '809K', date: 'Feb 17, 2026' },
  { name: 'Neurological Associates of WA', records: '85K', date: 'Feb 17, 2026' },
  { name: 'Mid South Pulmonary Specialists', records: '43K', date: 'Feb 17, 2026' },
  { name: 'Sedgwick Government Solutions', records: '34K', date: 'Feb 17, 2026' },
  { name: 'Figure Technology Solutions', records: '1M', date: 'Feb 16, 2026' },
  { name: 'Canada Goose', records: '839K', date: 'Feb 16, 2026' },
]

function BreachNews() {
  const [activeTab, setActiveTab] = useState('news')
  const [selectedArticle, setSelectedArticle] = useState(null)

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      case 'medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/30'
      default: return 'text-green-400 bg-green-500/20 border-green-500/30'
    }
  }

  return (
    <section id="news" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-red-400 text-sm font-medium">Breach News & Updates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Latest <span className="text-red-400">Data Breaches</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay informed about the latest data breaches and security incidents. 
            Knowledge is your first line of defense.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'news'
                ? 'bg-red-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Breach News
          </button>
          <button
            onClick={() => setActiveTab('sites')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'sites'
                ? 'bg-red-600 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Recently Breached
          </button>
        </div>

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breachNewsData.map((article) => (
              <article
                key={article.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(article.severity)}`}>
                      {article.severity.charAt(0).toUpperCase() + article.severity.slice(1)}
                    </span>
                    <span className="text-gray-500 text-xs">{article.category}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{article.source}</span>
                    <span>{article.date}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-red-400 text-sm font-medium">
                      {article.affected} affected
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1 group-hover:text-white transition-colors">
                      Read more
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Sites Tab */}
        {activeTab === 'sites' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Recently Breached Websites</h3>
                <p className="text-gray-400 text-sm mt-1">Latest additions to our breach database</p>
              </div>
              <div className="divide-y divide-white/10">
                {recentBreachSites.map((site, index) => (
                  <div
                    key={index}
                    className="p-4 flex items-center justify-between hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{site.name}</h4>
                        <p className="text-gray-500 text-sm">{site.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-red-400 font-semibold">{site.records}</span>
                      <p className="text-gray-500 text-xs">records</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Article Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="bg-[#1E293B] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getSeverityColor(selectedArticle.severity)}`}>
                    {selectedArticle.severity.charAt(0).toUpperCase() + selectedArticle.severity.slice(1)} Severity
                  </span>
                  <span className="text-gray-500 text-sm">{selectedArticle.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{selectedArticle.title}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{selectedArticle.summary}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>Source: {selectedArticle.source}</span>
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {selectedArticle.affected} people affected
                  </div>
                  <p className="text-gray-400 text-sm">
                    If you have an account with this service, change your password immediately and enable two-factor authentication.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-full py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default BreachNews
