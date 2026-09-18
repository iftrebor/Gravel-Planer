import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTour, normalizeInput, parseRatio } from '../js/calculations.js';

test('normalizes invalid values safely', () => {
  const input = normalizeInput({ distance: -1, speed: 'invalid', bottleMl: 5000 });
  assert.equal(input.distance, 10);
  assert.equal(input.speed, 20);
  assert.equal(input.bottleMl, 1000);
});

test('parses ratios and falls back safely', () => {
  assert.deepEqual(parseRatio('1:2'), { f: 1 / 3, m: 2 / 3, label: '1:2' });
  assert.equal(parseRatio('bad').label, '1:2');
});

test('calculates a standard 130 km tour', () => {
  const result = calculateTour({ distance: 130, speed: 20, mlPerHour: 650, carbPerHour: 60, saltPerHour: 500, bottleMl: 800 });
  assert.equal(result.duration, 6.5);
  assert.equal(result.totalMl, 4225);
  assert.equal(result.totalCarbs, 390);
  assert.equal(result.gelWaterMl, 273);
  assert.equal(result.gelWaterPerBottleMl, 61);
  assert.equal(result.gelPerBottleMassG, 135.5);
  assert.equal(result.squeezeGelMassG, 395.2);
  assert.equal(result.gelPerSqueezeMl, 152);
  assert.equal(result.extraGelVesselMl, 0);
  assert.equal(result.totalSodium, 1277);
  assert.equal(result.totalSalt, 3.25);
});

test('converts salt input to sodium output', () => {
  const result = calculateTour({ saltPerHour: 1000 });
  assert.equal(result.naPerHour, 393);
  assert.equal(result.saltPerBottle, 1000);
});

test('splits drink and water correctly', () => {
  const result = calculateTour({ distance: 100, speed: 20, waterSecond: true });
  assert.equal(result.drinkMlPerHour, 325);
  assert.equal(result.waterMlPerHour, 325);
});
