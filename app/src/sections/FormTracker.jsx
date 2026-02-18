import { useState, useEffect } from 'react'

function FormTracker() {
  const [forms, setForms] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newForm, setNewForm] = useState({
    website: '',
    email: '',
    dataShared: '',
    date: '',
    riskLevel: 'medium'
  })

  useEffect(() => {
    const savedForms = localStorage.getItem('dataguard_forms')
    if (savedForms) {
      setForms(JSON.parse(savedForms))
    }
  }, [])

  const saveForms = (updatedForms) => {
    localStorage.setItem('dataguard_forms', JSON.stringify(updatedForms))
    setForms(updatedForms)
  }

  const addForm = (e) => {
    e.preventDefault()
    const form = {
      id: Date.now(),
      ...newForm,
      date: newForm.date || new Date().toISOString().split('T')[0]
    }
    const updatedForms = [form, ...forms]
    saveForms(updatedForms)
    setNewForm({ website: '', email: '', dataShared: '', date: '', riskLevel: 'medium' })
    setShowAddForm(false)
  }

  const deleteForm = (id) => {
    const updatedForms = forms.filter(f => f.id !== id)
    saveForms(updatedForms)
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/30'
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'high':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      case 'medium':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const sampleForms = [
    {
      id: 'sample-1',
      website: 'amazon.com',
      email: 'user@example.com',
      dataShared: 'Name, Address, Phone, Payment Info',
      date: '2026-01-15',
      riskLevel: 'medium'
    },
    {
      id: 'sample-2',
      website: 'facebook.com',
      email: 'user@example.com',
      dataShared: 'Name, Email, Photos, Location',
      date: '2026-02-01',
      riskLevel: 'high'
    }
  ]

  const displayForms = forms.length > 0 ? forms : sampleForms

  return (
    <section id="forms" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-purple-400 text-sm font-medium">Form Data Tracker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Track Your <span className="text-purple-400">Shared Data</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Keep track of which websites have your personal information. 
            Monitor where your data is stored and assess the risk level of each service.
          </p>
        </div>

        {/* Add Form Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showAddForm ? 'Cancel' : 'Add New Form Entry'}
          </button>
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add Form Entry</h3>
              <form onSubmit={addForm} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Website</label>
                    <input
                      type="text"
                      placeholder="e.g., amazon.com"
                      value={newForm.website}
                      onChange={(e) => setNewForm({ ...newForm, website: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email Used</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={newForm.email}
                      onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Data Shared</label>
                  <input
                    type="text"
                    placeholder="e.g., Name, Address, Phone, Payment Info"
                    value={newForm.dataShared}
                    onChange={(e) => setNewForm({ ...newForm, dataShared: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Date</label>
                    <input
                      type="date"
                      value={newForm.date}
                      onChange={(e) => setNewForm({ ...newForm, date: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Risk Level</label>
                    <select
                      value={newForm.riskLevel}
                      onChange={(e) => setNewForm({ ...newForm, riskLevel: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="low" className="bg-[#1E293B]">Low Risk</option>
                      <option value="medium" className="bg-[#1E293B]">Medium Risk</option>
                      <option value="high" className="bg-[#1E293B]">High Risk</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Save Entry
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Forms List */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              Tracked Forms ({forms.length > 0 ? forms.length : '2'})
            </h3>
            {forms.length === 0 && (
              <span className="text-gray-500 text-sm">Showing sample data</span>
            )}
          </div>

          <div className="space-y-4">
            {displayForms.map((form) => (
              <div
                key={form.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white text-lg">{form.website}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getRiskColor(form.riskLevel)}`}>
                        {getRiskIcon(form.riskLevel)}
                        {form.riskLevel.charAt(0).toUpperCase() + form.riskLevel.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {form.email}
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {form.date}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-gray-300 text-sm">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Data shared: {form.dataShared}
                    </div>
                  </div>
                  {forms.length > 0 && (
                    <button
                      onClick={() => deleteForm(form.id)}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {forms.length === 0 && (
            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Start tracking your forms by clicking "Add New Form Entry" above.
                <br />
                Your data is stored locally in your browser.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FormTracker
