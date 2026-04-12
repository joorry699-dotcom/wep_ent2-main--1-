import { NextRequest, NextResponse } from 'next/server';
import { UNIFIED_INTERESTS, getInterestForPlatform } from '../category_mappings';

// ==================
// PLATFORM CLIENTS
// ==================

interface PlatformResult {
  platform: string;
  success: boolean;
  estimated_reach?: number;
  estimated_impressions?: number;
  predicted_ctr?: number;
  predicted_engagement?: number;
  error?: string;
}

// Mock Google Client
async function googleEstimate(data: any): Promise<PlatformResult> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    const interests = data.interests.map((i: string) => getInterestForPlatform(i, 'google'));
    const baseReach = 1500000;
    const ageFactor = (60 - data.age_min) / 60;
    const reach = Math.round(baseReach * (0.8 + ageFactor * 0.4));

    return {
      platform: 'google',
      success: true,
      estimated_reach: reach,
      estimated_impressions: reach * 3.5,
      predicted_ctr: 0.02 + (interests.includes('gaming') ? 0.01 : 0),
      predicted_engagement: 0.03
    };
  } catch (error) {
    return {
      platform: 'google',
      success: false,
      error: 'Google API unavailable'
    };
  }
}

// Mock Meta Client
async function metaEstimate(data: any): Promise<PlatformResult> {
  try {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 300));

    const interests = data.interests.map((i: string) => getInterestForPlatform(i, 'meta'));
    const baseReach = 2000000;
    const ageFactor = (60 - data.age_min) / 60;
    const reach = Math.round(baseReach * (0.9 + ageFactor * 0.3));

    return {
      platform: 'meta',
      success: true,
      estimated_reach: reach,
      estimated_impressions: reach * 3.2,
      predicted_ctr: 0.03 + (interests.includes('gaming') ? 0.01 : 0),
      predicted_engagement: 0.04
    };
  } catch (error) {
    return {
      platform: 'meta',
      success: false,
      error: 'Meta API unavailable'
    };
  }
}

// Mock Snapchat Client
async function snapchatEstimate(data: any): Promise<PlatformResult> {
  try {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 600 + 200));

    const interests = data.interests.map((i: string) => getInterestForPlatform(i, 'snapchat'));
    const baseReach = 900000;
    const ageFactor = (60 - data.age_min) / 60;
    const reach = Math.round(baseReach * (0.7 + ageFactor * 0.5));

    return {
      platform: 'snapchat',
      success: true,
      estimated_reach: reach,
      estimated_impressions: reach * 2.8,
      predicted_ctr: 0.025 + (interests.includes('gaming') ? 0.015 : 0),
      predicted_engagement: 0.035
    };
  } catch (error) {
    return {
      platform: 'snapchat',
      success: false,
      error: 'Snapchat API unavailable'
    };
  }
}

// Mock TikTok Client (New Platform)
async function tiktokEstimate(data: any): Promise<PlatformResult> {
  try {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 700 + 400));

    const interests = data.interests.map((i: string) => getInterestForPlatform(i, 'tiktok'));
    const baseReach = 1200000;
    const ageFactor = (60 - data.age_min) / 60;
    const reach = Math.round(baseReach * (0.85 + ageFactor * 0.35));

    return {
      platform: 'tiktok',
      success: true,
      estimated_reach: reach,
      estimated_impressions: reach * 4.0,
      predicted_ctr: 0.028 + (interests.includes('gaming') ? 0.012 : 0),
      predicted_engagement: 0.045
    };
  } catch (error) {
    return {
      platform: 'tiktok',
      success: false,
      error: 'TikTok API unavailable'
    };
  }
}

// ==================
// CONCURRENT EXECUTION (Promise.allSettled for parallel calls)
// ==================

async function estimateAllPlatforms(data: any) {
  const platforms = [
    { name: 'google', func: googleEstimate },
    { name: 'meta', func: metaEstimate },
    { name: 'snapchat', func: snapchatEstimate },
    { name: 'tiktok', func: tiktokEstimate } // Added TikTok
  ];

  // Concurrent execution using Promise.allSettled for graceful degradation
  const results = await Promise.allSettled(
    platforms.map(platform => platform.func(data))
  );

  const reachComparison: Record<string, any> = {};
  let successfulPlatforms = 0;
  let failedPlatforms = 0;

  results.forEach((result, index) => {
    const platformName = platforms[index].name;
    if (result.status === 'fulfilled') {
      const platformResult = result.value;
      if (platformResult.success) {
        reachComparison[platformName] = platformResult;
        successfulPlatforms++;
      } else {
        reachComparison[platformName] = platformResult;
        failedPlatforms++;
      }
    } else {
      reachComparison[platformName] = {
        platform: platformName,
        success: false,
        error: 'Request failed'
      };
      failedPlatforms++;
    }
  });

  // Optimization logic
  const optimization = recommendPlatforms(reachComparison, data.budget_usd || 100);

  return {
    summary: {
      total_platforms: platforms.length,
      successful_platforms: successfulPlatforms,
      failed_platforms: failedPlatforms
    },
    reach_comparison: reachComparison,
    optimization
  };
}

// ==================
// OPTIMIZATION LOGIC
// ==================

function calculateCpm(impressions: number, budget: number) {
  return impressions > 0 ? (budget / impressions) * 1000 : 0;
}

function recommendPlatforms(data: any, budget: number) {
  const scores: Record<string, number> = {};
  const successfulPlatforms = Object.entries(data).filter(([_, p]: [string, any]) => p.success);

  if (successfulPlatforms.length === 0) {
    return {
      best_platform: 'none',
      budget_allocation: {},
      scores: {},
      message: 'No platforms available'
    };
  }

  const maxReach = Math.max(...successfulPlatforms.map(([_, p]: [string, any]) => p.estimated_reach));
  const maxImpr = Math.max(...successfulPlatforms.map(([_, p]: [string, any]) => p.estimated_impressions));

  for (const [platform, platformData] of successfulPlatforms) {
    const p = platformData as PlatformResult;
    const reachScore = p.estimated_reach! / maxReach;
    const imprScore = p.estimated_impressions! / maxImpr;
    const cpm = calculateCpm(p.estimated_impressions!, budget);
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
    scores
  };
}

// ==================
// API ROUTES
// ==================

export async function GET() {
  return NextResponse.json({
    message: 'Unified Reach Estimator API v2.0',
    endpoints: {
      POST: '/api/estimate',
      description: 'Multi-platform reach estimation with concurrent calls'
    },
    supported_platforms: ['google', 'meta', 'snapchat', 'tiktok'],
    features: [
      'Concurrent API calls',
      'Graceful degradation',
      'Cross-platform interest mapping',
      'Budget optimization'
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await estimateAllPlatforms(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request. Send JSON with budget_usd, age_min, interests.' },
      { status: 400 }
    );
  }
}