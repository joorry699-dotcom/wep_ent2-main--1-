'use client';

import { useState } from 'react';

export default function HomePage() {
  const [budget, setBudget] = useState(100);
  const [age, setAge] = useState(25);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runEstimate = async () => {
    setLoading(true);
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
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          AdReach Estimator
        </h1>
        <p className="text-gray-600 mb-8">تقدير وصول الإعلانات وتحسين التوزيع عبر المنصات</p>

        <div className="space-y-4 mb-6">
          <div className="text-right">
            <label className="block text-sm font-medium text-gray-700 mb-1">الميزانية (USD):</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white bg-gray-50 transition-all"
              min="1"
            />
          </div>

          <div className="text-right">
            <label className="block text-sm font-medium text-gray-700 mb-1">العمر الأدنى:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white bg-gray-50 transition-all"
              min="13"
              max="65"
            />
          </div>
        </div>

        <button
          onClick={runEstimate}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:transform-none"
        >
          {loading ? 'جاري الحساب...' : 'احسب التقدير'}
        </button>

        {results && (
          <div className="mt-8 text-right">
            <h2 className="text-2xl font-bold mb-4">النتائج</h2>

            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">مقارنة الوصول</h3>
              <div className="space-y-2">
                {Object.entries(results.reach_comparison).map(([platform, data]: [string, any]) => (
                  <div key={platform} className="flex justify-between items-center">
                    <span className="font-medium">{platform}</span>
                    <span className="text-sm text-gray-600">
                      {data.estimated_reach.toLocaleString()} وصول
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">التحسين</h3>
              <pre className="text-left bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                {JSON.stringify(results.optimization, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
