import { NextRequest, NextResponse } from 'next/server';

function fakePlatformData() {
  return {
    google: {
      estimated_reach: 1500000,
      estimated_impressions: 5000000,
    },
    meta: {
      estimated_reach: 2000000,
      estimated_impressions: 6500000,
    },
    snapchat: {
      estimated_reach: 900000,
      estimated_impressions: 3000000,
    },
  };
}

function predictMetrics(platform: string, interests: string[], age: number, budget: number) {
  let baseCtr = 0.02;
  let baseEng = 0.03;

  if (platform === 'meta') {
    baseCtr += 0.01;
    baseEng += 0.02;
  } else if (platform === 'google') {
    baseCtr += 0.005;
  }

  if (interests.includes('gaming')) {
    baseCtr += 0.01;
  }

  return {
    predicted_ctr: Math.round(baseCtr * 10000) / 10000,
    predicted_engagement: Math.round(baseEng * 10000) / 10000,
  };
}

function calculateCpm(impressions: number, budget: number) {
  return impressions > 0 ? (budget / impressions) * 1000 : 0;
}

function recommendPlatforms(data: any, budget: number) {
  const scores: { [key: string]: number } = {};

  const maxReach = Math.max(...Object.values(data).map((p: any) => p.estimated_reach));
  const maxImpr = Math.max(...Object.values(data).map((p: any) => p.estimated_impressions));

  for (const [p, d] of Object.entries(data) as [string, any][]) {
    const reachScore = d.estimated_reach / maxReach;
    const imprScore = d.estimated_impressions / maxImpr;
    const cpm = calculateCpm(d.estimated_impressions, budget);
    const efficiency = 1 / (cpm + 1);

    scores[p] = reachScore * 0.4 + imprScore * 0.3 + efficiency * 0.3;
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  const allocation: { [key: string]: number } = {};
  for (const [p, s] of Object.entries(scores)) {
    allocation[p] = total > 0 ? Math.round((s / total) * budget * 100) / 100 : 0;
  }

  return {
    best_platform: Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b)),
    budget_allocation: allocation,
    scores,
  };
}

function estimateAll(data: any) {
  const reach = fakePlatformData();

  for (const platform in reach) {
    const preds = predictMetrics(
      platform,
      data.interests || [],
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

export async function GET() {
  return NextResponse.json({ message: 'API is working' });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = estimateAll(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}