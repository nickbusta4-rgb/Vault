import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Zap, Lock } from 'lucide-react';

const VAULT_INTELLIGENCE = {
  'Personal Finance': {
    followers: { '50k-100k': { median: 12000, p90: 28000, p10: 4200 }, '100k-250k': { median: 28000, p90: 72000, p10: 8500 }, '250k+': { median: 85000, p90: 250000, p10: 35000 } },
    revenueBreakdown: { sponsorships: 35, courses: 28, memberships: 22, other: 15 },
    growthRate: 2.8,
    topCreators: [
      { name: 'Creator A', revenue: 180000, followers: 450000, sponsorshipRate: 0.45 },
      { name: 'Creator B', revenue: 156000, followers: 380000, sponsorshipRate: 0.42 },
      { name: 'Creator C', revenue: 142000, followers: 320000, sponsorshipRate: 0.38 },
    ]
  },
  'Technology': {
    followers: { '50k-100k': { median: 15000, p90: 35000, p10: 5500 }, '100k-250k': { median: 32000, p90: 85000, p10: 10000 }, '250k+': { median: 95000, p90: 280000, p10: 42000 } },
    revenueBreakdown: { sponsorships: 42, courses: 25, products: 20, other: 13 },
    growthRate: 3.2,
    topCreators: [
      { name: 'Creator D', revenue: 220000, followers: 520000, sponsorshipRate: 0.52 },
      { name: 'Creator E', revenue: 195000, followers: 450000, sponsorshipRate: 0.48 },
      { name: 'Creator F', revenue: 168000, followers: 380000, sponsorshipRate: 0.44 },
    ]
  },
  'Fitness': {
    followers: { '50k-100k': { median: 10000, p90: 22000, p10: 3500 }, '100k-250k': { median: 24000, p90: 58000, p10: 7000 }, '250k+': { median: 72000, p90: 185000, p10: 28000 } },
    revenueBreakdown: { memberships: 45, sponsorships: 28, products: 18, other: 9 },
    growthRate: 4.1,
    topCreators: [
      { name: 'Creator G', revenue: 145000, followers: 380000, sponsorshipRate: 0.35 },
      { name: 'Creator H', revenue: 128000, followers: 320000, sponsorshipRate: 0.32 },
      { name: 'Creator I', revenue: 112000, followers: 280000, sponsorshipRate: 0.29 },
    ]
  }
};

const SAMPLE_CREATOR = {
  id: 'creator_001',
  name: 'Alex Chen',
  email: 'alex@example.com',
  niche: 'Personal Finance',
  monthlyRevenue: 52700,
  followers: 145000,
  verified: true,
  dataShared: true,
  monetization: { sponsorships: 18, courses: 15, memberships: 12, other: 7 }
};

const SAMPLE_REVENUE_DATA = [
  { month: 'Jan', youtube: 12000, patreon: 8500, tiktok: 5200, twitch: 6500, kick: 4100 },
  { month: 'Feb', youtube: 13200, patreon: 8800, tiktok: 5500, twitch: 7000, kick: 4300 },
  { month: 'Mar', youtube: 14100, patreon: 9200, tiktok: 6100, twitch: 7800, kick: 4500 },
  { month: 'Apr', youtube: 15800, patreon: 9600, tiktok: 6600, twitch: 8200, kick: 4800 },
  { month: 'May', youtube: 16500, patreon: 10200, tiktok: 7100, twitch: 8500, kick: 5100 },
  { month: 'Jun', youtube: 17200, patreon: 10800, tiktok: 7600, twitch: 9200, kick: 5300 },
];

export default function Vault() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [creator, setCreator] = useState(null);
  const [revenueData] = useState(SAMPLE_REVENUE_DATA);

  const handleLogin = () => {
    if (email && password) {
      setUser({ email, name: SAMPLE_CREATOR.name });
      setCreator(SAMPLE_CREATOR);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCreator(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <AuthPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} showSignup={showSignup} setShowSignup={setShowSignup} />;
  }

  const intelligence = VAULT_INTELLIGENCE[creator?.niche];
  const followerBracket = creator?.followers > 250000 ? '250k+' : creator?.followers > 100000 ? '100k-250k' : '50k-100k';
  const benchmarks = intelligence?.followers[followerBracket];

  const currentMonth = revenueData[revenueData.length - 1];
  const totalMonthly = Object.values(currentMonth).filter((v, i) => i > 0).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="border-b border-gray-700 bg-black/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded flex items-center justify-center text-white font-bold">V</div>
            <div>
              <h1 className="text-xl font-bold text-white">vault</h1>
              <p className="text-xs text-gray-400">Creator Intelligence</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-sm text-gray-300 hover:text-white transition">Logout</button>
        </div>
      </header>

      <div className="border-b border-gray-700 bg-black/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          <button onClick={() => setActiveTab('dashboard')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'dashboard' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
            Your Data
          </button>
          <button onClick={() => setActiveTab('intelligence')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'intelligence' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
            Intelligence
          </button>
          <button onClick={() => setActiveTab('benchmarks')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'benchmarks' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
            Benchmarks
          </button>
          <button onClick={() => setActiveTab('peers')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'peers' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>
            Top Creators
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard label="Monthly Revenue" value={`$${totalMonthly.toLocaleString()}`} subtext="Your current month" icon={<DollarSign />} />
              <MetricCard label="Followers" value={creator?.followers.toLocaleString()} subtext={creator?.niche} icon={<Users />} />
              <MetricCard label="Data Status" value="Complete" subtext="Connected: 5 sources" icon={<Lock />} accent />
              <MetricCard label="Rank" value={`Top 12%`} subtext="In your niche" icon={<TrendingUp />} />
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-8 backdrop-blur">
              <h2 className="text-xl font-bold text-white mb-6">6-Month Revenue Trend</h2>
              <div className="space-y-4">
                {revenueData.map((data, idx) => {
                  const total = Object.values(data).filter((v, i) => i > 0).reduce((a, b) => a + b, 0);
                  const maxTotal = Math.max(...revenueData.map(d => Object.values(d).filter((v, i) => i > 0).reduce((a, b) => a + b, 0)));
                  const percentage = (total / maxTotal) * 100;
                  return (
                    <div key={idx}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-300">{data.month}</span>
                        <span className="text-sm font-bold text-blue-400">${total.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intelligence' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-lg p-8 backdrop-blur">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Your Aha Moment</h3>
                  <p className="text-gray-300 mb-4">
                    You're earning <span className="text-cyan-400 font-bold">$0.36 per follower</span>, which puts you in the <span className="text-cyan-400 font-bold">top 15%</span> of creators in Personal Finance. 
                    But your revenue mix shows <span className="text-yellow-400 font-bold">only 18% from sponsorships</span> while top creators generate <span className="text-yellow-400 font-bold">35%</span>. 
                    <span className="block text-green-400 mt-2">💡 Opportunity: Increase sponsorship rates by 50% to match top creators = +$7,500/month</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightCard
                title="Revenue Mix Analysis"
                metric="18% Sponsorships"
                benchmark="35% (Industry Median)"
                insight="You're undermonetizing sponsorships. Top 10% creators in your niche generate $35k+ from sponsorships alone."
              />
              <InsightCard
                title="Growth Trajectory"
                metric="+2.8% MoM"
                benchmark="+3.2% (Industry Average)"
                insight="Your growth is solid but slightly below peers. Diversifying sponsorships could accelerate growth to 4.5%."
              />
              <InsightCard
                title="Follower Monetization"
                metric="$0.36 per follower"
                benchmark="$0.28 (Niche Average)"
                insight="You're ahead! But there's room to grow to $0.45 by optimizing offer diversity."
              />
              <InsightCard
                title="Sponsorship Pricing"
                metric="$15k-20k per deal"
                benchmark="$22k-28k (Top 10%)"
                insight="Based on 145k followers, you should be asking $25k+ per sponsorship."
              />
            </div>
          </div>
        )}

        {activeTab === 'benchmarks' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Benchmarks: {creator?.niche}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BenchmarkCard
                followers="50k-100k"
                median={benchmarks ? benchmarks['50k-100k'].median : 0}
                p90={benchmarks ? benchmarks['50k-100k'].p90 : 0}
                p10={benchmarks ? benchmarks['50k-100k'].p10 : 0}
              />
              <BenchmarkCard
                followers="100k-250k"
                median={benchmarks ? benchmarks['100k-250k'].median : 0}
                p90={benchmarks ? benchmarks['100k-250k'].p90 : 0}
                p10={benchmarks ? benchmarks['100k-250k'].p10 : 0}
                highlight={true}
              />
              <BenchmarkCard
                followers="250k+"
                median={benchmarks ? benchmarks['250k+'].median : 0}
                p90={benchmarks ? benchmarks['250k+'].p90 : 0}
                p10={benchmarks ? benchmarks['250k+'].p10 : 0}
              />
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-8 backdrop-blur">
              <h3 className="text-lg font-bold text-white mb-6">Revenue Mix Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(intelligence?.revenueBreakdown || {}).map(([source, percentage]) => (
                  <div key={source} className="bg-gray-700/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm capitalize mb-2">{source}</p>
                    <p className="text-2xl font-bold text-blue-400">{percentage}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'peers' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">Top Creators in {creator?.niche}</h2>
            
            <div className="space-y-4">
              {intelligence?.topCreators?.map((topCreator, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur hover:border-blue-500/50 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">{idx + 1}</div>
                        <h3 className="text-lg font-bold text-white">{topCreator.name}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">{topCreator.followers.toLocaleString()} followers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">${topCreator.revenue.toLocaleString()}</p>
                      <p className="text-gray-400 text-sm">monthly revenue</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs uppercase mb-1">Revenue per Follower</p>
                      <p className="text-lg font-bold text-blue-400">${(topCreator.revenue / topCreator.followers).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase mb-1">Sponsorship Rate</p>
                      <p className="text-lg font-bold text-cyan-400">{(topCreator.sponsorshipRate * 100).toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase mb-1">Monthly Sponsor Revenue</p>
                      <p className="text-lg font-bold text-yellow-400">${(topCreator.revenue * topCreator.sponsorshipRate).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value, subtext, icon, accent }) {
  return (
    <div className={`border rounded-lg p-6 backdrop-blur transition ${accent ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-700/50 hover:border-blue-500' : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-gray-600'}`}>
      <div className="flex justify-between items-start mb-4">
        <p className="text-sm font-semibold text-gray-400 uppercase">{label}</p>
        <div className={accent ? 'text-cyan-400' : 'text-gray-500'}>{icon}</div>
      </div>
      <p className={`text-3xl font-bold mb-2 ${accent ? 'text-cyan-400' : 'text-white'}`}>{value}</p>
      <p className="text-sm text-gray-400">{subtext}</p>
    </div>
  );
}

function InsightCard({ title, metric, benchmark, insight }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur hover:border-blue-500/50 transition">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Your Metric</p>
          <p className="text-2xl font-bold text-cyan-400">{metric}</p>
        </div>
        <div className="border-t border-gray-700 pt-3">
          <p className="text-xs text-gray-500 uppercase mb-1">Benchmark</p>
          <p className="text-lg font-semibold text-gray-300">{benchmark}</p>
        </div>
        <p className="text-sm text-gray-400 pt-2">{insight}</p>
      </div>
    </div>
  );
}

function BenchmarkCard({ followers, median, p90, p10, highlight }) {
  return (
    <div className={`border rounded-lg p-6 backdrop-blur transition ${highlight ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/50 ring-2 ring-blue-500/20' : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700'}`}>
      <p className="text-sm font-semibold text-gray-400 uppercase mb-4">{followers} Followers</p>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 mb-1">Median</p>
          <p className="text-2xl font-bold text-cyan-400">${median.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Top 10% (P90)</p>
          <p className="text-xl font-bold text-green-400">${p90.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Bottom 10% (P10)</p>
          <p className="text-lg font-semibold text-gray-400">${p10.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function AuthPage({ email, setEmail, password, setPassword, handleLogin, showSignup, setShowSignup }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6">V</div>
          <h1 className="text-4xl font-bold text-white mb-2">vault</h1>
          <p className="text-gray-400">Intelligence for Creator Businesses</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-gray-500 transition"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition"
          >
            {showSignup ? 'Create Account' : 'Login'}
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Demo Access</p>
          <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 space-y-2 text-sm text-gray-400">
            <p>Email: <span className="font-semibold text-gray-300">demo@example.com</span></p>
            <p>Password: <span className="font-semibold text-gray-300">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
