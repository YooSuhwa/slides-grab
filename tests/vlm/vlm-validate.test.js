import assert from 'node:assert/strict';
import test from 'node:test';

import { parseCliArgs, parseStructuredFeedback } from '../../scripts/vlm-validate.js';

test('parseCliArgs applies US-005 defaults', () => {
  const parsed = parseCliArgs([]);

  assert.deepEqual(parsed, {
    maxIterations: 3,
    provider: 'google',
    model: 'gemini-2.0-flash',
    help: false,
  });
});

test('parseCliArgs reads --max-iterations, --provider, --model', () => {
  const parsed = parseCliArgs([
    '--max-iterations',
    '5',
    '--provider',
    'anthropic',
    '--model',
    'claude-3-7-sonnet',
  ]);

  assert.equal(parsed.maxIterations, 5);
  assert.equal(parsed.provider, 'anthropic');
  assert.equal(parsed.model, 'claude-3-7-sonnet');
  assert.equal(parsed.help, false);
});

test('parseCliArgs rejects invalid max iteration values', () => {
  assert.throws(() => parseCliArgs(['--max-iterations', '0']), /positive integer/i);
  assert.throws(() => parseCliArgs(['--max-iterations=abc']), /positive integer/i);
});

test('parseStructuredFeedback parses fenced JSON and normalizes issue fields', () => {
  const parsed = parseStructuredFeedback(
    [
      '```json',
      '{"slide":"slide-01.html","status":"fail","issues":[{"type":"overflow","severity":"critical","message":"Title overflows","evidence":"right edge","suggestion":"Reduce font size"}]}',
      '```',
    ].join('\n'),
    'slide-fallback.html',
  );

  assert.equal(parsed.slide, 'slide-01.html');
  assert.equal(parsed.status, 'fail');
  assert.equal(parsed.issues.length, 1);
  assert.deepEqual(parsed.issues[0], {
    type: 'overflow',
    severity: 'critical',
    message: 'Title overflows',
    evidence: 'right edge',
    suggestion: 'Reduce font size',
  });
});

test('parseStructuredFeedback infers pass when issues is empty', () => {
  const parsed = parseStructuredFeedback('{"slide":"slide-02.html","issues":[]}', 'slide-02.html');
  assert.equal(parsed.status, 'pass');
  assert.deepEqual(parsed.issues, []);
});
