// Category Mappings - Cross-platform interest and city mappings
// Based on Unified Reach Estimator architecture

export type PlatformName = 'google' | 'meta' | 'snapchat' | 'tiktok';

export type InterestMapping = {
  display_name: string;
} & Record<PlatformName, string>;

export const UNIFIED_INTERESTS: Record<string, InterestMapping> = {
  technology: {
    display_name: "Technology",
    google: "Technology",
    meta: "Technology",
    snapchat: "Technology",
    tiktok: "Technology"
  },
  gaming: {
    display_name: "Gaming",
    google: "Games",
    meta: "Games",
    snapchat: "Gaming",
    tiktok: "Gaming"
  },
  food_and_drink: {
    display_name: "Food & Drink",
    google: "Food and drink",
    meta: "Food and drink",
    snapchat: "Food & Beverage",
    tiktok: "Food & Drink"
  },
  sports: {
    display_name: "Sports",
    google: "Sports",
    meta: "Sports",
    snapchat: "Sports",
    tiktok: "Sports"
  },
  fashion: {
    display_name: "Fashion",
    google: "Fashion and style",
    meta: "Fashion",
    snapchat: "Fashion",
    tiktok: "Fashion"
  },
  travel: {
    display_name: "Travel",
    google: "Travel",
    meta: "Travel",
    snapchat: "Travel",
    tiktok: "Travel"
  },
  music: {
    display_name: "Music",
    google: "Music",
    meta: "Music",
    snapchat: "Music",
    tiktok: "Music"
  },
  movies: {
    display_name: "Movies",
    google: "Movies and TV",
    meta: "Movies",
    snapchat: "Movies & TV",
    tiktok: "Movies"
  }
};

export const UNIFIED_CITIES: Record<string, any> = {
  "2726790": {
    display_name: "Stockholm",
    key: "2726790",
    country_code: "SE"
  },
  "2643743": {
    display_name: "London",
    key: "2643743",
    country_code: "GB"
  },
  "5128581": {
    display_name: "New York",
    key: "5128581",
    country_code: "US"
  },
  "2950159": {
    display_name: "Berlin",
    key: "2950159",
    country_code: "DE"
  }
};

export const GENDER_MAPPINGS: Record<number, { display: string } & Record<PlatformName, string>> = {
  1: { display: "Male", google: "1", meta: "male", snapchat: "MALE", tiktok: "male" },
  2: { display: "Female", google: "2", meta: "female", snapchat: "FEMALE", tiktok: "female" }
};

export function getInterestForPlatform(interest: string, platform: PlatformName): string {
  return UNIFIED_INTERESTS[interest]?.[platform] || interest;
}

export function getCityInfo(cityKey: string) {
  return UNIFIED_CITIES[cityKey] || null;
}

export function getGenderForPlatform(gender: number, platform: PlatformName) {
  return GENDER_MAPPINGS[gender]?.[platform] || String(gender);
}