'use client'

import { useState, useEffect } from 'react'
import { DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, Briefcase, Cpu, Zap } from 'lucide-react'

interface Opportunity {
  id: string
  type: string
  title: string
  description: string
  potentialEarnings: string
  difficulty: string
  timeRequired: string
  platform: string
  status: 'available' | 'in-progress' | 'completed'
  link?: string
}

interface AgentActivity {
  timestamp: string
  action: string
  result?: string
}

export default function Home() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [agentStatus, setAgentStatus] = useState<'idle' | 'scanning' | 'working'>('idle')
  const [activities, setActivities] = useState<AgentActivity[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const skills = [
    'Content Writing',
    'Data Entry',
    'Graphic Design',
    'Web Scraping',
    'Survey Completion',
    'Social Media Management',
    'Translation',
    'Programming',
    'Virtual Assistant',
    'Market Research'
  ]

  const availableOpportunities: Opportunity[] = [
    {
      id: '1',
      type: 'Freelance',
      title: 'Content Writing - Blog Posts',
      description: 'Write SEO-optimized blog posts for various clients',
      potentialEarnings: '$50-150/post',
      difficulty: 'Medium',
      timeRequired: '2-4 hours',
      platform: 'Upwork/Fiverr',
      status: 'available',
      link: 'https://www.upwork.com/search/jobs/?q=blog%20writing'
    },
    {
      id: '2',
      type: 'Micro-tasks',
      title: 'Data Labeling & Annotation',
      description: 'Label images and data for AI training',
      potentialEarnings: '$10-30/hour',
      difficulty: 'Easy',
      timeRequired: 'Flexible',
      platform: 'Amazon MTurk/Scale AI',
      status: 'available',
      link: 'https://www.mturk.com/'
    },
    {
      id: '3',
      type: 'Surveys & Testing',
      title: 'User Testing & Feedback',
      description: 'Test websites and apps, provide detailed feedback',
      potentialEarnings: '$10-60/test',
      difficulty: 'Easy',
      timeRequired: '15-30 min',
      platform: 'UserTesting',
      status: 'available',
      link: 'https://www.usertesting.com/'
    },
    {
      id: '4',
      type: 'Freelance',
      title: 'Virtual Assistant Tasks',
      description: 'Email management, scheduling, data entry',
      potentialEarnings: '$15-40/hour',
      difficulty: 'Easy',
      timeRequired: 'Flexible',
      platform: 'Upwork/Remote.co',
      status: 'available',
      link: 'https://www.upwork.com/search/jobs/?q=virtual%20assistant'
    },
    {
      id: '5',
      type: 'Creative',
      title: 'Graphic Design Projects',
      description: 'Logo design, social media graphics, branding',
      potentialEarnings: '$100-500/project',
      difficulty: 'Medium-Hard',
      timeRequired: '4-8 hours',
      platform: '99designs/Fiverr',
      status: 'available',
      link: 'https://www.fiverr.com/categories/graphics-design'
    },
    {
      id: '6',
      type: 'Programming',
      title: 'Web Scraping Scripts',
      description: 'Build automated data collection scripts',
      potentialEarnings: '$100-300/script',
      difficulty: 'Medium',
      timeRequired: '3-6 hours',
      platform: 'Upwork/Freelancer',
      status: 'available',
      link: 'https://www.upwork.com/search/jobs/?q=web%20scraping'
    },
    {
      id: '7',
      type: 'Passive Income',
      title: 'Stock Photography',
      description: 'Upload photos to stock photography sites',
      potentialEarnings: '$0.25-50/photo',
      difficulty: 'Easy',
      timeRequired: 'One-time',
      platform: 'Shutterstock/Adobe Stock',
      status: 'available',
      link: 'https://www.shutterstock.com/contribute'
    },
    {
      id: '8',
      type: 'Tutoring',
      title: 'Online Tutoring',
      description: 'Teach subjects you know online',
      potentialEarnings: '$20-60/hour',
      difficulty: 'Medium',
      timeRequired: 'Flexible',
      platform: 'Tutor.com/Chegg',
      status: 'available',
      link: 'https://www.tutor.com/apply'
    },
    {
      id: '9',
      type: 'Trading',
      title: 'Cryptocurrency Arbitrage',
      description: 'Monitor price differences across exchanges',
      potentialEarnings: '$50-500/day',
      difficulty: 'Hard',
      timeRequired: 'Ongoing',
      platform: 'Various Exchanges',
      status: 'available',
      link: 'https://www.binance.com/'
    },
    {
      id: '10',
      type: 'Content',
      title: 'YouTube Automation Channel',
      description: 'Create faceless YouTube channels with AI tools',
      potentialEarnings: '$100-5000/month',
      difficulty: 'Medium',
      timeRequired: '10+ hours/week',
      platform: 'YouTube',
      status: 'available',
      link: 'https://www.youtube.com/creators/'
    }
  ]

  useEffect(() => {
    // Simulate agent scanning for opportunities
    const scanInterval = setInterval(() => {
      if (agentStatus === 'scanning') {
        const randomOpp = availableOpportunities[Math.floor(Math.random() * availableOpportunities.length)]

        setActivities(prev => [{
          timestamp: new Date().toLocaleTimeString(),
          action: `Found opportunity: ${randomOpp.title}`,
          result: randomOpp.potentialEarnings
        }, ...prev.slice(0, 9)])
      }
    }, 3000)

    return () => clearInterval(scanInterval)
  }, [agentStatus])

  const startAgent = () => {
    setAgentStatus('scanning')
    setOpportunities(availableOpportunities.filter((_, i) => i < 5))
    setActivities([{
      timestamp: new Date().toLocaleTimeString(),
      action: 'Agent activated - Scanning for opportunities...',
    }])
  }

  const stopAgent = () => {
    setAgentStatus('idle')
    setActivities(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      action: 'Agent paused',
    }, ...prev])
  }

  const applyToOpportunity = (opp: Opportunity) => {
    setActivities(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      action: `Applied to: ${opp.title}`,
      result: 'Application submitted'
    }, ...prev])

    // Open the link if available
    if (opp.link) {
      window.open(opp.link, '_blank')
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cpu className="w-12 h-12 mr-3 text-purple-400" />
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Money Earning Agent
            </h1>
          </div>
          <p className="text-xl text-gray-300">AI-Powered Digital Income Opportunities Finder</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Earnings Potential</p>
                <p className="text-3xl font-bold text-green-400">${totalEarnings.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Opportunities</p>
                <p className="text-3xl font-bold text-blue-400">{opportunities.length}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Agent Status</p>
                <p className="text-2xl font-bold text-purple-400 capitalize">{agentStatus}</p>
              </div>
              <Zap className={`w-12 h-12 ${agentStatus === 'scanning' ? 'text-yellow-400 animate-pulse' : 'text-purple-400'}`} />
            </div>
          </div>
        </div>

        {/* Agent Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold mb-4">Agent Controls</h2>
          <div className="flex gap-4 mb-6">
            <button
              onClick={startAgent}
              disabled={agentStatus === 'scanning'}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start Agent
            </button>
            <button
              onClick={stopAgent}
              disabled={agentStatus === 'idle'}
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Pause Agent
            </button>
          </div>

          {/* Recent Activities */}
          <div className="bg-black/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Agent Activity
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {activities.length === 0 ? (
                <p className="text-gray-400 text-sm">No activity yet. Start the agent to begin scanning.</p>
              ) : (
                activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm border-l-2 border-purple-500 pl-3 py-1">
                    <span className="text-gray-400 min-w-[80px]">{activity.timestamp}</span>
                    <span className="text-gray-200">{activity.action}</span>
                    {activity.result && <span className="text-green-400 ml-auto">{activity.result}</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            Available Opportunities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableOpportunities.map((opp) => (
              <div key={opp.id} className="bg-black/30 rounded-lg p-5 border border-white/10 hover:border-purple-500 transition-all hover:scale-105">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-purple-500/30 rounded-full">
                    {opp.type}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(opp.difficulty)}`}>
                    {opp.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2">{opp.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{opp.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Earnings:</span>
                    <span className="font-semibold text-green-400">{opp.potentialEarnings}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Time:</span>
                    <span className="font-semibold">{opp.timeRequired}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Platform:</span>
                    <span className="font-semibold">{opp.platform}</span>
                  </div>
                </div>

                <button
                  onClick={() => applyToOpportunity(opp)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                >
                  View Opportunity
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">1</span>
              </div>
              <p className="text-sm">Start the AI agent to scan for opportunities</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">2</span>
              </div>
              <p className="text-sm">Agent analyzes and filters opportunities based on your skills</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">3</span>
              </div>
              <p className="text-sm">Review curated opportunities matched to your profile</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold">4</span>
              </div>
              <p className="text-sm">Click to apply and start earning real money</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-500 mb-2">Important Notice</h3>
              <p className="text-sm text-gray-300">
                This agent helps you discover legitimate money-earning opportunities online. Actual earnings depend on your effort, skills, and time invested. Always verify the legitimacy of platforms before providing personal information or payment details. This tool aggregates publicly available opportunities and does not guarantee income.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
