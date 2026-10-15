import { createHash } from 'node:crypto';

/**
 * Live visitor counter backed by Upstash Redis (or Vercel KV, which uses the same REST API).
 * Without credentials the endpoint answers `{ count: null }` and the site shows its baseline.
 * `position` is the visitor's own number (before the site's baseline is added); `isNew` is true on the visit that was just counted.
 */
const REST_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const SALT = process.env.VISITOR_SALT ?? '';

const COUNT_KEY = 'portfolio:visitors';
const SEEN_TTL_SECONDS = 60 * 60 * 24;

interface VercelRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  setHeader(name: string, value: string): void;
  status(code: number): {
    json(body: unknown): void;
    end(): void;
  };
}

function hasStore() {
  return Boolean(REST_URL && REST_TOKEN);
}

async function command<T>(args: Array<string | number>): Promise<T> {
  const response = await fetch(REST_URL as string, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  if (!response.ok) throw new Error(`Store error: ${response.status}`);
  const data = (await response.json()) as { result: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result;
}

function header(req: VercelRequest, name: string) {
  const value = req.headers[name];
  return Array.isArray(value) ? value[0] : value ?? '';
}

/** A salted hash, so no raw IP address is ever stored. */
function visitorId(req: VercelRequest) {
  const ip = header(req, 'x-forwarded-for').split(',')[0].trim() || header(req, 'x-real-ip');
  return createHash('sha256').update(`${SALT}|${ip}|${header(req, 'user-agent')}`).digest('hex');
}

function sameOrigin(req: VercelRequest) {
  const origin = header(req, 'origin');
  return !origin || origin.endsWith(`//${header(req, 'host')}`);
}

async function readCount() {
  const value = await command<string | null>(['GET', COUNT_KEY]);
  const count = Number(value ?? 0);
  return Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
}

/** The visitor's own number, once they have been counted. */
async function readPosition(id: string) {
  const value = Number(await command<string | null>(['GET', `visitor:${id}`]));
  return Number.isInteger(value) && value > 0 ? value : null;
}

/** Counts a visitor once per day. Claiming the key first keeps concurrent requests from double counting. */
async function recordVisit(id: string) {
  const key = `visitor:${id}`;
  const claimed = await command<string | null>(['SET', key, '0', 'NX', 'EX', SEEN_TTL_SECONDS]);
  if (claimed !== 'OK') return { position: await readPosition(id), isNew: false };

  try {
    const position = await command<number>(['INCR', COUNT_KEY]);
    await command(['SET', key, position, 'KEEPTTL']);
    return { position, isNew: true };
  } catch (error) {
    await command(['DEL', key]).catch(() => undefined);
    throw error;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!hasStore()) return res.status(200).json({ count: null, position: null, isNew: false });

  try {
    const id = visitorId(req);
    // POST records the visit; GET only reads.
    const visit = req.method === 'POST' && sameOrigin(req)
      ? await recordVisit(id)
      : { position: await readPosition(id), isNew: false };
    return res.status(200).json({ count: await readCount(), ...visit });
  } catch (error) {
    console.error('Visitor counter error:', error);
    return res.status(200).json({ count: null, position: null, isNew: false });
  }
}
