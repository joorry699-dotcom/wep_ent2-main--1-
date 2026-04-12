import { NextRequest, NextResponse } from 'next/server';

// ==================
// ML LOGIC (NUMERIC)
// ==================

function getFakePlatformData() {
  return {
    google: { estimated_reach: 1500000, estimated_impressions: 5000000, platform: 'google' },
    meta: { estimated_reach: 2000000, estimated_impressions: 6500000, platform: 'meta' },
    snapchat: { estimated_reach: 900000, estimated_impressions: 3000000, platform: 'snapchat' },
  };
}

function predictMetrics(platform: string, interests: string[], age: number, budget: number) {
  // Simulate ML model based on platform and interests
  let ctr = 0.02;
  let engagement = 0.03;

  if (platform === 'meta') {
    ctr += 0.01;
    engagement += 0.02;
  } else if (platform === 'google') {
    ctr += 0.005;
  }

  // Boost for gaming interest
  if (interests.includes('gaming')) {
    ctr += 0.01;
  }

  // Age factor
  const ageFactor = (60 - age) / 60;
  ctr *= (0.8 + ageFactor * 0.4);
  engagement *= (0.7 + ageFactor * 0.5);

  return {
    predicted_ctr: Math.round(ctr * 10000) / 10000,
    predicted_engagement: Math.round(engagement * 10000) / 10000,
  };
}

function calculateCpm(impressions: number, budget: number) {
  return impressions > 0 ? (budget / impressions) * 1000 : 0;
}

function recommendPlatforms(data: any, budget: number) {
  const scores: Record<string, number> = {};
  const maxReach = Math.max(...Object.values(data).map((p: any) => p.estimated_reach));
  const maxImpr = Math.max(...Object.values(data).map((p: any) => p.estimated_impressions));

  for (const [platform, platformData] of Object.entries(data) as [string, any][]) {
    const reachScore = platformData.estimated_reach / maxReach;
    const imprScore = platformData.estimated_impressions / maxImpr;
    const cpm = calculateCpm(platformData.estimated_impressions, budget);
    const efficiency = 1 / (cpm + 1);

    scores[platform] = reachScore * 0.4 + imprScore * 0.3 + efficiency * 0.3;
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const allocation: Record<string, number> = {};

  for (const [platform, score] of Object.entries(scores)) {
    allocation[platform] = total > 0 ? Math.round((score / total) * budget * 100) / 100 : 0;
  }

  return {
    best_platform: Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b)),
    budget_allocation: allocation,
    scores,
  };
}

function estimateAll(data: any) {
  const reach = getFakePlatformData();

  for (const platform of Object.keys(reach)) {
    const preds = predictMetrics(
      platform,
      data.interests || ['technology', 'gaming'],
      data.age_min || 25,
      data.budget_usd || 100
    );
    reach[platform] = { ...reach[platform], ...preds };
  }

  const optimization = recommendPlatforms(reach, data.budget_usd || 100);

  return {
    reach_comparison: reach,
    optimization,
  };
}

// ==================
// API ROUTES
// ==================

export async function GET() {
  return NextResponse.json({
    message: 'AdReach Estimator API v1.0',
    endpoints: {
      POST: '/api/estimate/',
      description: 'Send budget_usd, age_min, interests to estimate reach'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = estimateAll(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request. Send JSON with budget_usd, age_min, interests.' },
      { status: 400 }
    );
  }
}