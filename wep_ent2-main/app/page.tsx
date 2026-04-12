'use client';

import { useState } from 'react';
import { TrendingUp, Zap, Target, DollarSign, BarChart3, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [budget, setBudget] = useState(500);
  const [age, setAge] = useState(28);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const runEstimate = async () => {
    setLoading(true);
    setError('');
    setResults(null);
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
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError(`خطأ في الاتصال: ${err}`);
      console.error(err);
    }
    setLoading(false);
  };

  const platformIcons: Record<string, string> = {
    google: '🔍',
    meta: '📘',
    snapchat: '👻',
  };

  const platformEmojis: Record<string, string> = {
    google: '🟦',
    meta: '🟪',
    snapchat: '💛',
  };

  const getPercentage = (value: number, max: number) => Math.round((value / max) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  AdReach Pro
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Advertising Estimator</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold">Smart Analytics</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Input Section */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <Target className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-bold">حدد معاملاتك</h2>
                  </div>

                  <div className="space-y-8">
                    {/* Budget Section */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        الميزانية
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          value={budget}
                          onChange={(e) => setBudget(Number(e.target.value))}
                          className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-cyan-400 [&::-webkit-slider-thumb]:to-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-cyan-500/50"
                          min="10"
                          max="5000"
                          step="10"
                        />
                      </div>
                      <div className="flex justify-between mt-4">
                        <span className="text-xs text-gray-500">$10</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          ${budget.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">$5000</span>
                      </div>
                    </div>

                    {/* Age Section */}
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-200 mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-400" />
                        العمر المستهدف
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[13, 18, 25, 35, 45, 55, 65].map((a) => (
                          <button
                            key={a}
                            onClick={() => setAge(a)}
                            className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                              age === a
                                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/50 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-xs text-gray-400 mb-1">العمر المختار</p>
                        <p className="text-2xl font-bold text-orange-400">{age} سنة</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={runEstimate}
                      disabled={loading}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        loading
                          ? 'bg-gray-500/50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:shadow-2xl hover:shadow-cyan-500/50 active:scale-95'
                      }`}
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin text-2xl">⚙️</span>
                          جاري الحساب...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          احسب الآن
                        </>
                      )}
                    </button>

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                        <p className="text-red-200 text-sm font-semibold">⚠️ خطأ</p>
                        <p className="text-red-100 text-xs mt-1">{error}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Results Section */}
            <div className="lg:col-span-3">
              {!results ? (
                <div className="h-full min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-6 animate-bounce">📊</div>
                    <p className="text-gray-400 text-lg">
                      أدخل معاملات الحملة واضغط "احسب الآن"
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      سيتم تحليل البيانات وإظهار أفضل استراتيجية
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Platform Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(results.reach_comparison).map(([platform, data]: [string, any]) => {
                      const maxReach = Math.max(
                        ...Object.values(results.reach_comparison).map((p: any) => p.estimated_reach)
                      );
                      const percentage = getPercentage(data.estimated_reach, maxReach);
                      const isBest = platform === results.optimization.best_platform;

                      return (
                        <div
                          key={platform}
                          className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                            isBest
                              ? 'bg-gradient-to-br from-cyan-500/30 via-blue-500/20 to-purple-500/10 border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/20 scale-105'
                              : 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20 hover:border-white/40 hover:shadow-xl'
                          }`}
                        >
                          {/* Badge */}
                          {isBest && (
                            <div className="absolute -top-1 -right-1">
                              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1">
                                ⭐ الأفضل
                              </div>
                            </div>
                          )}

                          {/* Header */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="text-4xl">{platformIcons[platform]}</div>
                            <span className="text-sm font-bold px-3 py-1 bg-white/10 rounded-full capitalize">
                              {platform}
                            </span>
                          </div>

                          {/* Reach Progress */}
                          <div className="mb-6">
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-gray-300">الوصول المتوقع</span>
                              <span className="font-bold text-cyan-300">{percentage}%</span>
                            </div>
                            <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${
                                  platform === 'google'
                                    ? 'from-blue-400 to-blue-600'
                                    : platform === 'meta'
                                    ? 'from-indigo-400 to-indigo-600'
                                    : 'from-yellow-300 to-yellow-500'
                                } rounded-full transition-all duration-1000`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-400 mt-3">
                              {(data.estimated_reach / 1000000).toFixed(2)}M جمهور متوقع
                            </p>
                          </div>

                          {/* Metrics Grid */}
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-2">معدل النقر</p>
                              <p className="text-2xl font-bold text-cyan-300">
                                {(data.predicted_ctr * 100).toFixed(2)}%
                              </p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg">
                              <p className="text-xs text-gray-400 mb-2">التفاعل</p>
                              <p className="text-2xl font-bold text-purple-300">
                                {(data.predicted_engagement * 100).toFixed(2)}%
                              </p>
                            </div>
                          </div>

                          {/* Impressions */}
                          <div className="mt-4 p-3 bg-gradient-to-r from-white/10 to-white/5 rounded-lg border border-white/10">
                            <p className="text-xs text-gray-400">عدد مرات الظهور</p>
                            <p className="text-lg font-bold text-white">
                              {(data.estimated_impressions / 1000000).toFixed(1)}M
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommendation Section */}
                  <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-start gap-6">
                      <div className="text-5xl flex-shrink-0">💡</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold mb-4 text-amber-100">
                          📌 التوصية المثلى
                        </h3>
                        
                        <div className="mb-6 p-4 bg-white/10 rounded-lg border border-amber-400/30">
                          <p className="text-sm text-gray-300 mb-2">اختر المنصة:</p>
                          <p className="text-3xl font-bold text-amber-300 capitalize">
                            {results.optimization.best_platform.toUpperCase()} {platformEmojis[results.optimization.best_platform]}
                          </p>
                        </div>

                        <p className="text-sm text-gray-200 mb-4">توزيع الميزانية الموصى به:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(results.optimization.budget_allocation).map(([platform, amount]: [string, any]) => (
                            <div
                              key={platform}
                              className="p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition-all"
                            >
                              <p className="text-xs text-gray-400 mb-2 capitalize flex items-center gap-2">
                                {platformEmojis[platform]} {platform}
                              </p>
                              <p className="text-2xl font-bold text-cyan-300">
                                ${amount.toLocaleString()}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {((amount / budget) * 100).toFixed(0)}% من الميزانية
                              </p>
                            </div>
                          ))}
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
    </div>
  );
}
