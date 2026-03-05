import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Plus, Download, Menu, X, AlertCircle } from 'lucide-react';
// ============= INITIAL SAMPLE DATA =============
const SAMPLE_CREATOR = {
  id: 'creator_001',
  name: 'Alex Chen',
  email: 'alex@example.com',
  niche: 'Personal Finance',
  monthlyRevenue: 45230,
  followers: 145000,
  verified: false
};

const SAMPLE_REVENUE_DATA = [
  { month: 'Jan', youtube: 12000, patreon: 8500, gumroad: 4200, sponsorships: 6500, other: 2100 },
  { month: 'Feb', youtube: 13200, patreon: 8800, gumroad: 4500, sponsorships: 7000, other: 2300 },
  { month: 'Mar', youtube: 14100, patreon: 9200, gumroad: 5100, sponsorships: 7800, other: 2500 },
  { month: 'Apr', youtube: 15800, patreon: 9600, gumroad: 5600, sponsorships: 8200, other: 2800 },
  { month: 'May', youtube: 16500, patreon: 10200, gumroad: 6100, sponsorships: 8500, other: 3100 },
  { month: 'Jun', youtube: 17200, patreon: 10800, gumroad: 6600, sponsorships: 9200, other: 3300 },
];

const NICHE_BENCHMARKS = {
  'Personal Finance': { medianMonthly: 28000, avgFollowers: 82000, avgEngagement: 3.2 },
  'Technology': { medianMonthly: 32000, avgFollowers: 95000, avgEngagement: 2.8 },
  'Fitness': { medianMonthly: 24000, avgFollowers: 65000, avgEngagement: 4.1 },
  'Beauty': { medianMonthly: 26000, avgFollowers: 78000, avgEngagement: 3.8 },
  'Gaming': { medianMonthly: 35000, avgFollowers: 120000, avgEngagement: 2.5 },
};

const PLATFORM_BREAKDOWN = {
  'YouTube': { percentage: 38, color: '#FF0000' },
  'Patreon': { percentage: 24, color: '#FF424D' },
  'Gumroad': { percentage: 15, color: '#EE6352' },
  'Sponsorships': { percentage: 18, color: '#FFB703' },
  'Other': { percentage: 5, color: '#6C757D' },
};

// ============= MAIN APP =============
export default function CreatorDashboard() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [revenueData] = useState(SAMPLE_REVENUE_DATA);
  const [creator, setCreator] = useState(null);
  const [showAddRevenue, setShowAddRevenue] = useState(false);
  const [newRevenueSource, setNewRevenueSource] = useState({ source: 'YouTube', amount: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hideRevenue, setHideRevenue] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setUser({ email, name: SAMPLE_CREATOR.name });
      setCreator(SAMPLE_CREATOR);
      setEmail('');
      setPassword('');
    }
  };

  const handleSignup = () => {
    if (email && password) {
      setUser({ email, name: 'New Creator' });
      setCreator({ ...SAMPLE_CREATOR, email, name: 'New Creator' });
      setShowSignup(false);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCreator(null);
  };

  const addRevenueEntry = () => {
    if (newRevenueSource.amount) {
      const month = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      // In a real app, this would save to a database
      setNewRevenueSource({ source: 'YouTube', amount: '' });
      setShowAddRevenue(false);
    }
  };

  if (!user) {
    return <AuthPage email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} showSignup={showSignup} setShowSignup={setShowSignup} handleSignup={handleSignup} />;
  }

  const currentMonth = revenueData[revenueData.length - 1];
  const lastMonth = revenueData[revenueData.length - 2];
  const totalMonthly = Object.values(currentMonth).filter((v, i) => i > 0).reduce((a, b) => a + b, 0);
  const totalLastMonth = Object.values(lastMonth).filter((v, i) => i > 0).reduce((a, b) => a + b, 0);
  const monthlyGrowth = ((totalMonthly - totalLastMonth) / totalLastMonth * 100).toFixed(1);

  const benchmark = NICHE_BENCHMARKS[creator?.niche] || NICHE_BENCHMARKS['Technology'];
  const vs_benchmark = ((totalMonthly - benchmark.medianMonthly) / benchmark.medianMonthly * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-sm">C</div>
            <div>
              <h1 className="text-xl font-semibold text-black">vault</h1>
              <p className="text-xs text-gray-500">Revenue Intelligence</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <span className="text-sm text-gray-600">{user.name}</span>
            <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-black transition">
              Logout
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white p-4 space-y-4">
          <p className="text-sm text-gray-600">{user.name}</p>
          <button onClick={handleLogout} className="w-full text-left text-sm text-gray-600 hover:text-black transition">
            Logout
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* VERIFICATION BANNER */}
        {!creator?.verified && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Complete Your Profile</p>
              <p className="text-sm text-blue-800 mt-1">Connect your revenue sources (Stripe, Gumroad, Patreon) to unlock benchmarking and insights.</p>
            </div>
          </div>
        )}

        {/* KEY METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <MetricCard
            label="This Month"
            value={hideRevenue ? '***' : `$${totalMonthly.toLocaleString()}`}
            subtext={`+${monthlyGrowth}% from last month`}
            icon={<DollarSign size={24} />}
            onToggleHide={() => setHideRevenue(!hideRevenue)}
          />
          <MetricCard
            label="Followers"
            value={creator?.followers.toLocaleString()}
            subtext={`${creator?.niche}`}
            icon={<TrendingUp size={24} />}
          />
          <MetricCard
            label="vs. Benchmark"
            value={`${vs_benchmark > 0 ? '+' : ''}${vs_benchmark}%`}
            subtext={`Median: $${benchmark.medianMonthly.toLocaleString()}`}
            highlight={vs_benchmark > 0}
            icon={<BarChart3 size={24} />}
          />
          <MetricCard
            label="Annual Estimate"
            value={hideRevenue ? '***' : `$${(totalMonthly * 12).toLocaleString()}`}
            subtext="Based on current month"
            icon={<DollarSign size={24} />}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">
            {/* REVENUE CHART */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-xl font-semibold text-black">Revenue Trend</h2>
                  <p className="text-sm text-gray-500 mt-1">Last 6 months across all sources</p>
                </div>
                <button className="text-gray-600 hover:text-black transition">
                  <Download size={20} />
                </button>
              </div>

              {/* SIMPLE BAR CHART */}
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
                        <div
                          className="bg-black rounded-full h-3 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      {/* BREAKDOWN */}
                      <div className="flex gap-1 mt-2">
                        {[
                          { key: 'youtube', color: '#FF0000' },
                          { key: 'patreon', color: '#FF424D' },
                          { key: 'gumroad', color: '#EE6352' },
                          { key: 'sponsorships', color: '#FFB703' },
                        ].map(({ key, color }) => (
                          data[key] > 0 && (
                            <div
                              key={key}
                              className="h-1.5 rounded-full"
                              style={{ 
                                width: `${(data[key] / total) * 100}%`,
                                backgroundColor: color 
                              }}
                            />
                          )
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* LEGEND */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-200">
                {Object.entries(PLATFORM_BREAKDOWN).map(([platform, data]) => (
                  <div key={platform} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                    <span className="text-sm text-gray-600">{platform}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* MONTHLY BREAKDOWN */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-black">This Month's Breakdown</h2>
                <button onClick={() => setShowAddRevenue(!showAddRevenue)} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-900 transition">
                  <Plus size={18} /> Add Source
                </button>
              </div>

              {showAddRevenue && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <select value={newRevenueSource.source} onChange={(e) => setNewRevenueSource({ ...newRevenueSource, source: e.target.value })} className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black">
                      <option>YouTube</option>
                      <option>Patreon</option>
                      <option>Gumroad</option>
                      <option>Sponsorships</option>
                      <option>Other</option>
                    </select>
                    <input
                      type="number"
                      value={newRevenueSource.amount}
                      onChange={(e) => setNewRevenueSource({ ...newRevenueSource, amount: e.target.value })}
                      placeholder="Amount"
                      className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <button onClick={addRevenueEntry} className="w-full bg-black text-white py-2 rounded text-sm font-semibold hover:bg-gray-900 transition">
                    Add Entry
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {Object.entries(currentMonth).filter(([k]) => k !== 'month').map(([source, amount]) => (
                  <div key={source} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PLATFORM_BREAKDOWN[source.charAt(0).toUpperCase() + source.slice(1)]?.color || '#999' }} />
                      <span className="text-sm font-semibold text-black capitalize">{source}</span>
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

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* BENCHMARK COMPARISON */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <h2 className="text-lg font-semibold text-black mb-6">How You Compare</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">Monthly Revenue</span>
                    <span className="text-sm font-semibold text-black">${totalMonthly.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-white border border-gray-200 rounded h-2">
                    <div className="bg-black h-2 rounded" style={{ width: `${Math.min(100, (totalMonthly / (benchmark.medianMonthly * 1.5)) * 100)}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Niche median: ${benchmark.medianMonthly.toLocaleString()}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Your Metrics</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Monthly Revenue</span>
                      <span className="text-sm font-semibold text-black">${totalMonthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Annual Run Rate</span>
                      <span className="text-sm font-semibold text-black">${(totalMonthly * 12).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Followers</span>
                      <span className="text-sm font-semibold text-black">{creator?.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Revenue per Follower</span>
                      <span className="text-sm font-semibold text-black">${(totalMonthly / creator?.followers).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Niche Avg ({creator?.niche})</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Monthly Revenue</span>
                      <span className="text-sm font-semibold text-black">${benchmark.medianMonthly.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Followers</span>
                      <span className="text-sm font-semibold text-black">{benchmark.avgFollowers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Engagement Rate</span>
                      <span className="text-sm font-semibold text-black">{benchmark.avgEngagement}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* INSIGHTS */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-lg font-semibold text-black mb-6">Insights</h2>

              <div className="space-y-4">
                <InsightCard
                  icon={<TrendingUp size={16} />}
                  title="Growth Trending Up"
                  desc="You're growing +2.8% month-over-month"
                  positive={true}
                />
                <InsightCard
                  icon={<DollarSign size={16} />}
                  title="Sponsorships Opportunity"
                  desc="Sponsorships are only 18% of revenue. Comparable creators avg 28%"
                  positive={true}
                />
                <InsightCard
                  icon={<TrendingUp size={16} />}
                  title="You're Ahead"
                  desc={`Earning ${vs_benchmark > 0 ? '+' : ''}${vs_benchmark}% vs. niche average`}
                  positive={vs_benchmark > 0}
                />
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black text-white rounded-lg p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to Grow?</h3>
              <p className="text-sm text-gray-300 mb-4">Get personalized growth strategies based on your data</p>
              <button className="w-full bg-white text-black py-2 rounded font-semibold hover:bg-gray-100 transition text-sm">
                See Growth Recommendations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= METRIC CARD COMPONENT =============
function MetricCard({ label, value, subtext, icon, highlight, onToggleHide }) {
  return (
    <div className={`border rounded-lg p-6 ${highlight ? 'bg-black text-white border-black' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-xs font-semibold uppercase tracking-wide ${highlight ? 'text-gray-300' : 'text-gray-500'}`}>{label}</span>
        {onToggleHide && (
          <button onClick={onToggleHide} className={`${highlight ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-black'} transition`}>
            <Eye size={16} />
          </button>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-3xl font-bold mb-2 ${highlight ? 'text-white' : 'text-black'}`}>{value}</p>
          <p className={`text-sm ${highlight ? 'text-gray-300' : 'text-gray-500'}`}>{subtext}</p>
        </div>
        <div className={highlight ? 'text-white' : 'text-gray-300'}>{icon}</div>
      </div>
    </div>
  );
}

function InsightCard({ icon, title, desc, positive }) {
  return (
    <div className={`border rounded-lg p-4 flex gap-3 ${positive ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
      <div className={`flex-shrink-0 mt-0.5 ${positive ? 'text-green-600' : 'text-orange-600'}`}>{icon}</div>
      <div>
        <p className={`text-sm font-semibold ${positive ? 'text-green-900' : 'text-orange-900'}`}>{title}</p>
        <p className={`text-sm ${positive ? 'text-green-800' : 'text-orange-800'}`}>{desc}</p>
      </div>
    </div>
  );
}

// ============= AUTH PAGE =============
function AuthPage({ email, setEmail, password, setPassword, handleLogin, showSignup, setShowSignup, handleSignup }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 bg-black rounded flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">C</div>
          <h1 className="text-4xl font-bold text-black mb-2">vault</h1>
          <p className="text-gray-600">See all your revenue in one place</p>
        </div>

        {/* FORM */}
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

          {!showSignup ? (
            <>
              <button
                onClick={handleLogin}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
              >
                Login
              </button>
              <p className="text-center text-sm text-gray-600">
                No account yet?{' '}
                <button onClick={() => setShowSignup(true)} className="text-black font-semibold hover:underline">
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <button
                onClick={handleSignup}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
              >
                Create Account
              </button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => setShowSignup(false)} className="text-black font-semibold hover:underline">
                  Login
                </button>
              </p>
            </>
          )}
        </div>

        {/* DEMO INFO */}
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
