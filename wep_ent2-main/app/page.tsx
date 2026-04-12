'use client';

import { useState } from 'react';
import { TrendingUp, Zap, Target, DollarSign, BarChart3, Globe } from 'lucide-react';

export default function HomePage() {
  const [budget, setBudget] = useState(500);
  const [age, setAge] = useState(28);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const t = {
    ar: {
      title: 'AdReach Pro',
      subtitle: 'محلل الإعلانات الذكي',
      budget: 'الميزانية',
      age: 'العمر المستهدف',
      calculate: 'احسب الآن',
      calculating: 'جاري الحساب...',
      reach: 'الوصول المتوقع',
      ctr: 'معدل النقر',
      engagement: 'التفاعل',
      impressions: 'عدد مرات الظهور',
      selectBest: 'اختر المنصة:',
      recommended: 'التوصية المثلى',
      budgetDistribution: 'توزيع الموصى به:',
      ofBudget: 'من الميزانية',
      audience: 'جمهور متوقع',
      setParams: 'حدد المعاملات',
      expectedAudience: 'جمهور متوقع',
      selectAge: 'العمر المختار',
      years: 'سنة',
      error: 'خطأ',
      enterParams: 'أدخل معاملات الحملة واضغط احسب الآن',
      analysis: 'سيتم تحليل البيانات وإظهار أفضل استراتيجية',
    },
    en: {
      title: 'AdReach Pro',
      subtitle: 'Smart Ad Analytics',
      budget: 'Budget',
      age: 'Target Age',
      calculate: 'Calculate Now',
      calculating: 'Calculating...',
      reach: 'Expected Reach',
      ctr: 'Click Rate',
      engagement: 'Engagement',
      impressions: 'Impressions',
      selectBest: 'Select Platform:',
      recommended: 'Best Recommendation',
      budgetDistribution: 'Recommended Distribution:',
      ofBudget: 'of budget',
      audience: 'expected audience',
      setParams: 'Set Parameters',
      expectedAudience: 'expected audience',
      selectAge: 'Selected Age',
      years: 'years',
      error: 'Error',
      enterParams: 'Enter campaign parameters and click Calculate Now',
      analysis: 'Data will be analyzed and best strategy shown',
    },
  };

  const texts = t[lang];

  const runEstimate = async () => {
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const res = await fetch('/api/estimate', {
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
      setError(`${texts.error}: ${err}`);
    }
    setLoading(false);
  };

  const platformIcons: Record<string, string> = {
    google: '🔍',
    meta: '📘',
    snapchat: '👻',
    tiktok: '🎵',
  };

  const platformEmojis: Record<string, string> = {
    google: '🟦',
    meta: '🟪',
    snapchat: '💛',
    tiktok: '🟥',
  };

  const getPercentage = (value: number, max: number) => Math.round((value / max) * 100);

  return (
    <div className={lang === 'ar' ? 'rtl' : 'ltr'} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="border-b border-white/10 backdrop-blur-xl bg-white/5">
            <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {texts.title}
                </h1>
              </div>
              
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
              </button>
            </div>
          </div>

          {/* Main Grid */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-8">
                    <Target className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl font-bold">{texts.setParams}</h2>
                  </div>

                  <div className="space-y-8">
                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        {texts.budget}
                      </label>
                      <input
                        type="range"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full"
                        min="10"
                        max="5000"
                        step="10"
                      />
                      <div className="flex justify-between mt-4 text-sm">
                        <span className="text-gray-500">$10</span>
                        <span className="text-2xl font-bold text-cyan-300">${budget}</span>
                        <span className="text-gray-500">$5000</span>
                      </div>
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-orange-400" />
                        {texts.age}
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[13, 18, 25, 35, 45, 55, 65].map((a) => (
                          <button
                            key={a}
                            onClick={() => setAge(a)}
                            className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                              age === a
                                ? 'bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-xs text-gray-400">{texts.selectAge}</p>
                        <p className="text-2xl font-bold text-orange-400">{age}</p>
                      </div>
                    </div>

                    {/* Calculate Button */}
                    <button
                      onClick={runEstimate}
                      disabled={loading}
                      className="w-full py-4 px-6 rounded-xl font-bold text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>⚙️ {texts.calculating}</>
                      ) : (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          {texts.calculate}
                        </>
                      )}
                    </button>

                    {error && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                        <p className="text-red-200 text-sm">⚠️ {error}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-3">
                {!results ? (
                  <div className="h-full min-h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-6">📊</div>
                      <p className="text-gray-400 text-lg mb-2">{texts.enterParams}</p>
                      <p className="text-gray-500 text-sm">{texts.analysis}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Simple Chart */}
                    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                      <h3 className="text-xl font-bold mb-6 text-center">📊 {lang === 'ar' ? 'مقارنة الوصول' : 'Reach Comparison'}</h3>
                      <div className="flex justify-center">
                        <svg width="600" height="300" className="w-full max-w-2xl">
                          {Object.entries(results.reach_comparison).map(([platform, data]: [string, any], index) => {
                            const maxReach = Math.max(...Object.values(results.reach_comparison).map((p: any) => p.estimated_reach || 0));
                            const height = maxReach > 0 ? ((data.estimated_reach || 0) / maxReach) * 200 : 0;
                            const x = index * 150 + 50;
                            const y = 250 - height;
                            const color = platform === 'google'
                              ? '#3b82f6'
                              : platform === 'meta'
                                ? '#6366f1'
                                : platform === 'snapchat'
                                  ? '#eab308'
                                  : '#25F4EE';
                            return (
                              <g key={platform}>
                                <rect x={x} y={y} width="60" height={height} fill={color} rx="5" />
                                <text x={x + 30} y={y - 10} textAnchor="middle" className="fill-white text-sm font-bold">
                                  {(data.estimated_reach / 1000000).toFixed(1)}M
                                </text>
                                <text x={x + 30} y="280" textAnchor="middle" className="fill-gray-300 text-sm capitalize">
                                  {platform}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>

                    {/* Detailed Results */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                      <h3 className="text-xl font-bold mb-6">📋 {lang === 'ar' ? 'النتائج التفصيلية' : 'Detailed Results'}</h3>
                      <pre className="bg-black/50 p-4 rounded-lg text-green-400 text-sm overflow-x-auto font-mono">
{JSON.stringify(results.optimization, null, 2)}
                      </pre>
                    </div>

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
                            className={`relative rounded-2xl p-6 transition-all ${
                              isBest
                                ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border-2 border-cyan-400/60 shadow-2xl scale-105'
                                : 'bg-gradient-to-br from-white/15 to-white/5 border border-white/20'
                            }`}
                          >
                            {isBest && (
                              <div className="absolute -top-3 -right-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                ⭐ BEST
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mb-6">
                              <div className="text-4xl">{platformIcons[platform]}</div>
                              <span className="text-sm font-bold px-3 py-1 bg-white/10 rounded-full capitalize">
                                {platform}
                              </span>
                            </div>

                            <div className="mb-6">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-300">{texts.reach}</span>
                                <span className="font-bold text-cyan-300">{percentage}%</span>
                              </div>
                              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all ${
                                    platform === 'google' ? 'bg-blue-500' :
                                    platform === 'meta' ? 'bg-indigo-500' :
                                    platform === 'snapchat' ? 'bg-yellow-400' :
                                    'bg-cyan-400'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-400 mt-2">
                                {(data.estimated_reach / 1000000).toFixed(2)}M {texts.expectedAudience}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 p-3 bg-white/5 rounded-lg">
                              <div>
                                <p className="text-xs text-gray-400">{texts.ctr}</p>
                                <p className="font-bold text-cyan-300">{(data.predicted_ctr * 100).toFixed(2)}%</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400">{texts.engagement}</p>
                                <p className="font-bold text-purple-300">{(data.predicted_engagement * 100).toFixed(2)}%</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Recommendation */}
                    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-xl border border-amber-400/30 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold mb-4">💡 {texts.recommended}</h3>
                      
                      <div className="mb-6 p-4 bg-white/10 rounded-lg">
                        <p className="text-sm text-gray-300 mb-2">{texts.selectBest}</p>
                        <p className="text-3xl font-bold text-amber-300">
                          {results.optimization.best_platform.toUpperCase()} {platformEmojis[results.optimization.best_platform]}
                        </p>
                      </div>

                      <p className="text-sm text-gray-200 mb-4">{texts.budgetDistribution}</p>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(results.optimization.budget_allocation).map(([platform, amount]: [string, any]) => (
                          <div key={platform} className="p-4 bg-white/5 rounded-lg">
                            <p className="text-xs text-gray-400 mb-2">{platformEmojis[platform]} {platform}</p>
                            <p className="text-2xl font-bold text-cyan-300">${amount}</p>
                            <p className="text-xs text-gray-500 mt-2">{((amount / budget) * 100).toFixed(0)}% {texts.ofBudget}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
