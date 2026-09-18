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
  assert.equal(result.gelWaterPerBottleMl, 52);
  assert.equal(result.gelPerBottleMassG, 126.5);
  assert.ok(Math.abs(result.squeezeGelMassG - 413.2) < 1e-9);
  assert.equal(result.gelPerSqueezeMassG, 206.6);
  assert.equal(result.extraGelVesselMassG, 0);
  assert.equal(result.totalSodium, 1277);
  assert.ok(Math.abs(result.totalSalt - 3.2493638676844783) < 1e-9);
});

test('converts the maximum supported salt input to sodium output', () => {
  const result = calculateTour({ saltPerHour: 900 });
  assert.equal(result.naPerHour, 353.7);
  assert.ok(Math.abs(result.saltPerBottle - 1107.6923076923076) < 1e-9);
});

test('uses both bottles for the mixed drink', () => {
  const result = calculateTour({ distance: 100, speed: 20 });
  assert.equal(result.drinkMlPerHour, 650);
});

test('splits a bikepacking tour evenly across days', () => {
  const result = calculateTour({ distance: 200, speed: 20, days: 2 });
  assert.equal(result.dailyDistance, 100);
  assert.equal(result.dailyDuration, 5);
  assert.equal(result.dailyTotalMl, 3250);
  assert.equal(result.dailyTotalCarbs, 300);
});
