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
};

const SAMPLE_REVENUE_DATA = [
  { month: 'Jan', youtube: 12000, twitch: 6500, tiktok: 5200, kick: 4100, patreon: 8500 },
  { month: 'Feb', youtube: 13200, twitch: 7000, tiktok: 5500, kick: 4300, patreon: 8800 },
  { month: 'Mar', youtube: 14100, twitch: 7800, tiktok: 6100, kick: 4500, patreon: 9200 },
  { month: 'Apr', youtube: 15800, twitch: 8200, tiktok: 6600, kick: 4800, patreon: 9600 },
  { month: 'May', youtube: 16500, twitch: 8500, tiktok: 7100, kick: 5100, patreon: 10200 },
  { month: 'Jun', youtube: 17200, twitch: 9200, tiktok: 7600, kick: 5300, patreon: 10800 },
];

const PLATFORM_COLORS = {
  youtube: '#FF0000',
  twitch: '#9146FF',
  tiktok: '#000000',
  kick: '#00D084',
  patreon: '#0066FF',
};

const PLATFORM_NAMES = {
  youtube: 'YouTube',
  twitch: 'Twitch',
  tiktok: 'TikTok',
  kick: 'Kick',
  patreon: 'Patreon',
};

export default function Vault() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [creator] = useState(SAMPLE_CREATOR);
  const [revenueData] = useState(SAMPLE_REVENUE_DATA);
  const [newRevenueSource, setNewRevenueSource] = useState({ source: 'YouTube', amount: '' });
  const [showAddRevenue, setShowAddRevenue] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setUser({ email, name: SAMPLE_CREATOR.name });
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <AuthPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} />;
  }

  const intelligence = VAULT_INTELLIGENCE[creator?.niche];
  const followerBracket = creator?.followers > 250000 ? '250k+' : creator?.followers > 100000 ? '100k-250k' : '50k-100k';
  const benchmarks = intelligence?.followers[followerBracket];

  const currentMonth = revenueData[revenueData.length - 1];
  const totalMonthly = Object.values(currentMonth).filter((v, i) => i > 0).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-sm">V</div>
            <div>
              <h1 className="text-xl font-semibold text-black">vault</h1>
              <p className="text-xs text-gray-500">Revenue Intelligence</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-black transition">Logout</button>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex gap-8">
          <button onClick={() => setActiveTab('dashboard')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'dashboard' ? 'border-black text-black' : 'border-transparent text-gray-600 hover:text-black'}`}>
            Your Data
          </button>
          <button onClick={() => setActiveTab('intelligence')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'intelligence' ? 'border-black text-black' : 'border-transparent text-gray-600 hover:text-black'}`}>
            Intelligence
          </button>
          <button onClick={() => setActiveTab('benchmarks')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'benchmarks' ? 'border-black text-black' : 'border-transparent text-gray-600 hover:text-black'}`}>
            Benchmarks
          </button>
          <button onClick={() => setActiveTab('peers')} className={`py-4 px-2 text-sm font-semibold border-b-2 transition ${activeTab === 'peers' ? 'border-black text-black' : 'border-transparent text-gray-600 hover:text-black'}`}>
            Top Creators
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard label="Monthly Revenue" value={`$${totalMonthly.toLocaleString()}`} subtext="Your current month" />
              <MetricCard label="Followers" value={creator?.followers.toLocaleString()} subtext={creator?.niche} />
              <MetricCard label="Data Status" value="Complete" subtext="Connected: 5 sources" accent />
              <MetricCard label="Rank" value="Top 12%" subtext="In your niche" />
            </div>

            {/* Revenue Trend */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-xl font-bold text-black mb-6">Revenue Trend</h2>
              <div className="space-y-6">
                {revenueData.map((data, idx) => {
                  const total = Object.values(data).filter((v, i) => i > 0).reduce((a, b) => a + b, 0);
                  const maxTotal = Math.max(...revenueData.map(d => Object.values(d).filter((v, i) => i > 0).reduce((a, b) => a + b, 0)));
                  const percentage = (total / maxTotal) * 100;
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-black">{data.month}</span>
                        <span className="text-sm font-semibold text-black">${total.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div className="bg-black rounded-full h-3 transition-all duration-500" style={{ width: `${percentage}%` }} />
                      </div>
                      <div className="flex gap-1 mt-2">
                        {Object.entries(PLATFORM_COLORS).map(([key, color]) => (
                          data[key] > 0 && (
                            <div
                              key={key}
                              className="h-1.5 rounded-full"
                              style={{ width: `${(data[key] / total) * 100}%`, backgroundColor: color }}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                {Object.entries(PLATFORM_COLORS).map(([key, color]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-sm text-gray-600">{PLATFORM_NAMES[key]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">This Month's Breakdown</h2>
                <button onClick={() => setShowAddRevenue(!showAddRevenue)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-900 transition">
                  + Add Source
                </button>
              </div>

              {showAddRevenue && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <select value={newRevenueSource.source} onChange={(e) => setNewRevenueSource({ ...newRevenueSource, source: e.target.value })} className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black">
                      {Object.values(PLATFORM_NAMES).map((name) => (
                        <option key={name}>{name}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={newRevenueSource.amount}
                      onChange={(e) => setNewRevenueSource({ ...newRevenueSource, amount: e.target.value })}
                      placeholder="Amount"
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <button className="w-full bg-black text-white py-2 rounded text-sm font-semibold hover:bg-gray-900 transition">Add Entry</button>
                </div>
              )}

              <div className="space-y-3">
                {Object.entries(currentMonth).filter(([k]) => k !== 'month').map(([source, amount]) => (
                  <div key={source} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PLATFORM_COLORS[source] }} />
                      <span className="text-sm font-semibold text-black capitalize">{PLATFORM_NAMES[source]}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-black">${amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{((amount / totalMonthly) * 100).toFixed(0)}% of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Intelligence Tab */}
        {activeTab === 'intelligence' && (
          <div className="space-y-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h3 className="text-lg font-bold text-black mb-4">Your Aha Moment</h3>
              <p className="text-gray-700 mb-4">
                You're earning <span className="font-bold">$0.36 per follower</span>, which puts you in the <span className="font-bold">top 15%</span> of creators in Personal Finance. 
                But your revenue mix shows <span className="font-bold">only 18% from sponsorships</span> while top creators generate <span className="font-bold">35%</span>. 
                <span className="block text-green-700 font-semibold mt-2">💡 Opportunity: Increase sponsorship rates by 50% to match top creators = +$7,500/month</span>
              </p>
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

        {/* Benchmarks Tab */}
        {activeTab === 'benchmarks' && intelligence && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-black">Benchmarks: {creator?.niche}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BenchmarkCard
                followers="50k-100k"
                median={benchmarks['50k-100k']?.median || 0}
                p90={benchmarks['50k-100k']?.p90 || 0}
                p10={benchmarks['50k-100k']?.p10 || 0}
              />
              <BenchmarkCard
                followers="100k-250k"
                median={benchmarks['100k-250k']?.median || 0}
                p90={benchmarks['100k-250k']?.p90 || 0}
                p10={benchmarks['100k-250k']?.p10 || 0}
                highlight={true}
              />
              <BenchmarkCard
                followers="250k+"
                median={benchmarks['250k+']?.median || 0}
                p90={benchmarks['250k+']?.p90 || 0}
                p10={benchmarks['250k+']?.p10 || 0}
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-lg font-bold text-black mb-6">Revenue Mix Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(intelligence.revenueBreakdown || {}).map(([source, percentage]) => (
                  <div key={source} className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                    <p className="text-gray-600 text-sm capitalize mb-2">{source}</p>
                    <p className="text-2xl font-bold text-black">{percentage}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Top Creators Tab */}
        {activeTab === 'peers' && intelligence && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-black">Top Creators in {creator?.niche}</h2>
            
            <div className="space-y-4">
              {intelligence.topCreators?.map((topCreator, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                        <h3 className="text-lg font-bold text-black">{topCreator.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{topCreator.followers.toLocaleString()} followers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-black">${topCreator.revenue.toLocaleString()}</p>
                      <p className="text-gray-600 text-sm">monthly revenue</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600 text-xs uppercase mb-1">Revenue per Follower</p>
                      <p className="text-lg font-bold text-black">${(topCreator.revenue / topCreator.followers).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs uppercase mb-1">Sponsorship Rate</p>
                      <p className="text-lg font-bold text-black">{(topCreator.sponsorshipRate * 100).toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs uppercase mb-1">Monthly Sponsor Revenue</p>
                      <p className="text-lg font-bold text-black">${(topCreator.revenue * topCreator.sponsorshipRate).toLocaleString()}</p>
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

function MetricCard({ label, value, subtext, accent }) {
  return (
    <div className={`border rounded-lg p-6 transition ${accent ? 'bg-black text-white border-black' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide mb-4 ${accent ? 'text-gray-300' : 'text-gray-500'}`}>{label}</p>
      <p className={`text-3xl font-bold mb-2 ${accent ? 'text-white' : 'text-black'}`}>{value}</p>
      <p className={`text-sm ${accent ? 'text-gray-300' : 'text-gray-600'}`}>{subtext}</p>
    </div>
  );
}

function InsightCard({ title, metric, benchmark, insight }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition">
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">Your Metric</p>
          <p className="text-2xl font-bold text-black">{metric}</p>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-500 uppercase mb-1">Benchmark</p>
          <p className="text-lg font-semibold text-gray-700">{benchmark}</p>
        </div>
        <p className="text-sm text-gray-600 pt-2">{insight}</p>
      </div>
    </div>
  );
}

function BenchmarkCard({ followers, median, p90, p10, highlight }) {
  return (
    <div className={`border rounded-lg p-6 transition ${highlight ? 'bg-black text-white border-black' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
      <p className={`text-sm font-semibold uppercase mb-4 ${highlight ? 'text-gray-300' : 'text-gray-500'}`}>{followers} Followers</p>
      <div className="space-y-3">
        <div>
          <p className={`text-xs uppercase mb-1 ${highlight ? 'text-gray-400' : 'text-gray-600'}`}>Median</p>
          <p className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-black'}`}>${median.toLocaleString()}</p>
        </div>
        <div>
          <p className={`text-xs uppercase mb-1 ${highlight ? 'text-gray-400' : 'text-gray-600'}`}>Top 10% (P90)</p>
          <p className={`text-xl font-bold ${highlight ? 'text-gray-300' : 'text-gray-700'}`}>${p90.toLocaleString()}</p>
        </div>
        <div>
          <p className={`text-xs uppercase mb-1 ${highlight ? 'text-gray-400' : 'text-gray-600'}`}>Bottom 10% (P10)</p>
          <p className={`text-lg font-semibold ${highlight ? 'text-gray-400' : 'text-gray-600'}`}>${p10.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

function AuthPage({ email, setEmail, password, setPassword, handleLogin }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-black rounded flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">V</div>
          <h1 className="text-4xl font-bold text-black mb-2">vault</h1>
          <p className="text-gray-600">Intelligence for Creator Businesses</p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
          <button onClick={handleLogin} className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
            Login
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Demo Access</p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-xs text-gray-600">
            <p>Email: <span className="font-semibold">demo@example.com</span></p>
            <p>Password: <span className="font-semibold">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
