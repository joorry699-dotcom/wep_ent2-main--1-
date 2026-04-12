'use client';

import { useState } from 'react';
import { TrendingUp, Zap, Target, DollarSign } from 'lucide-react';

export default function HomePage() {
  const [budget, setBudget] = useState(500);
  const [age, setAge] = useState(28);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const runEstimate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/estimate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget_usd: budget,
          age_min: age,
          interests: ['technology', 'gaming'],
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال');
      console.error(err);
    }
    setLoading(false);
  };

  const platformIcons: Record<string, string> = {
    google: '🔍',
    meta: '📘',
    snapchat: '👻',
  };

  const platformColors: Record<string, string> = {
    google: 'from-blue-400 to-blue-600',
    meta: 'from-indigo-400 to-indigo-600',
    snapchat: 'from-yellow-300 to-yellow-500',
  };

  const getPercentage = (value: number, max: number) => Math.round((value / max) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-white">AI-Powered Ad Estimator</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            AdReach
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"> Estimator</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-8">
            احصل على تقديرات دقيقة لوصول إعلاناتك وتوزيع الميزانية الأمثل عبر Google و Meta و Snapchat
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Input Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-cyan-400" />
                المعاملات
              </h2>

              <div className="space-y-6">
                {/* Budget Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    الميزانية (USD)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    min="1"
                    max="10000"
                  />
                  <div className="text-xs text-gray-400 mt-2">${budget.toLocaleString()}</div>
                </div>

                {/* Age Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    🎯 العمر الأدنى
                  </label>
                  <input
                    type="range"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    min="13"
                    max="65"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>13</span>
                    <span className="font-semibold text-cyan-400">{age} سنة</span>
                    <span>65</span>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={runEstimate}
                  disabled={loading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⚙️</span>
                      جاري الحساب...
                    </span>
                  ) : (
                    'احسب التقدير'
                  )}
                </button>

                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-2">
            {!results ? (
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-gray-300 text-center">
                  أدخل المعاملات واضغط "احسب التقدير" لرؤية النتائج
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Platform Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(results.reach_comparison).map(([platform, data]: [string, any]) => {
                    const maxReach = Math.max(
                      ...Object.values(results.reach_comparison).map((p: any) => p.estimated_reach)
                    );
                    const percentage = getPercentage(data.estimated_reach, maxReach);
                    const isbestPlatform = platform === results.optimization.best_platform;

                    return (
                      <div
                        key={platform}
                        className={`relative group overflow-hidden rounded-xl p-6 backdrop-blur-xl border transition-all ${
                          isbestPlatform
                            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/50 ring-2 ring-cyan-400/50'
                            : 'bg-white/10 border-white/20 hover:border-white/40'
                        }`}
                      >
                        {isbestPlatform && (
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs px-3 py-1 rounded-full">
                            ⭐ الأفضل
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl">{platformIcons[platform]}</span>
                          <span className="text-2xl font-bold text-white capitalize">{platform}</span>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-300">الوصول</span>
                              <span className="text-cyan-300 font-semibold">{percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${platformColors[platform]} transition-all`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                              {(data.estimated_reach / 1000000).toFixed(1)}M متابع
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                            <div>
                              <p className="text-xs text-gray-400">CTR</p>
                              <p className="text-lg font-bold text-cyan-400">{(data.predicted_ctr * 100).toFixed(2)}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">التفاعل</p>
                              <p className="text-lg font-bold text-purple-400">{(data.predicted_engagement * 100).toFixed(2)}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recommendation Card */}
                <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💡</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">التوصية المثلى</h3>
                      <div className="space-y-2">
                        <p className="text-gray-200">
                          <span className="font-semibold text-amber-300">المنصة الأفضل:</span>{' '}
                          <span className="capitalize"> {results.optimization.best_platform.toUpperCase()}</span>
                        </p>
                        <div className="bg-white/5 rounded-lg p-4 mt-4">
                          <p className="text-sm text-gray-300 mb-3 font-semibold">توزيع الميزانية الموصى به:</p>
                          <div className="space-y-2">
                            {Object.entries(results.optimization.budget_allocation).map(([platform, amount]: [string, any]) => (
                              <div key={platform} className="flex justify-between items-center">
                                <span className="text-gray-300 capitalize">{platform}</span>
                                <span className="font-bold text-cyan-300">${amount.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
