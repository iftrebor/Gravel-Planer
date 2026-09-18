export const SODIUM_PER_GRAM_SALT = 393;
export const SODIUM_PER_MG_SALT = 0.393;
export const GEL_WATER_PER_CARB = 0.7;

export const LIMITS = Object.freeze({
  distance: [10, 1000],
  speed: [10, 40],
  mlPerHour: [300, 1200],
  carbPerHour: [40, 110],
  saltPerHour: [200, 1500],
  bottleMl: [500, 1000]
});

export function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

export function parseRatio(value) {
  const match = /^([1-9]\d*):([1-9]\d*)$/.exec(String(value));
  if (!match) return { f: 1 / 3, m: 2 / 3, label: '1:2' };
  const f = Number(match[1]);
  const m = Number(match[2]);
  const sum = f + m;
  return { f: f / sum, m: m / sum, label: `${f}:${m}` };
}

export function normalizeInput(input = {}) {
  const saltPerHour = input.saltPerHour ?? input.naPerHour;
  return {
    distance: clampNumber(input.distance, ...LIMITS.distance, 130),
    speed: clampNumber(input.speed, ...LIMITS.speed, 20),
    mlPerHour: clampNumber(input.mlPerHour, ...LIMITS.mlPerHour, 650),
    carbPerHour: clampNumber(input.carbPerHour, ...LIMITS.carbPerHour, 60),
    saltPerHour: clampNumber(saltPerHour, ...LIMITS.saltPerHour, 500),
    bottleMl: clampNumber(input.bottleMl, ...LIMITS.bottleMl, 800),
    hotMode: Boolean(input.hotMode),
    waterSecond: Boolean(input.waterSecond),
    ratio: parseRatio(input.ratio)
  };
}

export function calculateTour(rawInput = {}) {
  const input = normalizeInput(rawInput);
  const mlPerHour = input.hotMode ? Math.max(input.mlPerHour, 800) : input.mlPerHour;
  const saltPerHour = input.hotMode ? Math.max(input.saltPerHour, 850) : input.saltPerHour;
  const naPerHour = saltPerHour * SODIUM_PER_MG_SALT;
  const duration = input.distance / input.speed;
  const drinkShare = input.waterSecond ? 0.5 : 1;
  const drinkMlPerHour = Math.round(mlPerHour * drinkShare);
  const waterMlPerHour = Math.max(0, mlPerHour - drinkMlPerHour);
  const drinkBottlesPerHour = input.bottleMl > 0 ? drinkMlPerHour / input.bottleMl : 0;
  const carbPerBottle = drinkBottlesPerHour > 0 ? input.carbPerHour / drinkBottlesPerHour : 0;
  const sodiumPerBottle = drinkBottlesPerHour > 0 ? naPerHour / drinkBottlesPerHour : 0;
  const totalMl = Math.round(mlPerHour * duration);
  const totalDrinkMl = Math.round(drinkMlPerHour * duration);
  const totalWaterMl = totalMl - totalDrinkMl;
  const totalBottleFills = Math.ceil(totalMl / input.bottleMl);
  const refillsNeeded = Math.max(0, Math.ceil((totalMl - input.bottleMl * 2) / input.bottleMl));
  const totalCarbs = Math.round(input.carbPerHour * duration);
  const totalSodium = Math.round(naPerHour * duration);
  const gelWaterMl = Math.round(totalCarbs * GEL_WATER_PER_CARB);
  const gelWaterPerBottleMl = Math.round(carbPerBottle * GEL_WATER_PER_CARB);
  const totalSaltMg = totalSodium / SODIUM_PER_MG_SALT;
  const saltPerBottleMg = sodiumPerBottle / SODIUM_PER_MG_SALT;
  const gelConcentrateMl = Math.round(gelWaterMl + totalCarbs + totalSaltMg / 1000);
  const gelPerBottleMl = Math.round(gelWaterPerBottleMl + carbPerBottle + saltPerBottleMg / 1000);
  const mixedDrinkBottleCount = Math.ceil(totalDrinkMl / input.bottleMl);
  const initialGelBottleCount = Math.min(2, mixedDrinkBottleCount);
  const squeezeGelMl = Math.max(0, gelConcentrateMl - initialGelBottleCount * gelPerBottleMl);
  const squeezeCapacityMl = 500;
  const gelPerSqueezeMl = Math.min(squeezeCapacityMl / 2, squeezeGelMl / 2);
  const extraGelVesselMl = Math.max(0, squeezeGelMl - squeezeCapacityMl);

  return {
    input,
    duration,
    mlPerHour,
    saltPerHour,
    naPerHour,
    drinkMlPerHour,
    waterMlPerHour,
    carbPerBottle,
    sodiumPerBottle,
    saltPerBottle: sodiumPerBottle / SODIUM_PER_MG_SALT,
    totalMl,
    totalDrinkMl,
    totalWaterMl,
    totalBottleFills,
    refillsNeeded,
    totalCarbs,
    totalSodium,
    gelWaterMl,
    gelWaterPerBottleMl,
    gelConcentrateMl,
    gelPerBottleMl,
    squeezeGelMl,
    squeezeCapacityMl,
    gelPerSqueezeMl,
    extraGelVesselMl,
    totalSalt: totalSodium / SODIUM_PER_MG_SALT / 1000
  };
}
