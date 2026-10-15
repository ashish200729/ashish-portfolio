import { useEffect, useState } from 'react';

const SESSION_KEY = 'visit-state';

export interface VisitorState {
  /** Visits recorded live so far, or null while loading or when no counter is configured. */
  count: number | null;
  /** This visitor's own number among live visits, once counted. */
  position: number | null;
  /** True for the visit that was just counted, and for the rest of that session. */
  isNew: boolean;
}

const EMPTY: VisitorState = { count: null, position: null, isNew: false };

function readSession(): { newPosition: number } | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const parsed = raw ? (JSON.parse(raw) as { newPosition?: unknown }) : null;
    return parsed && Number.isInteger(parsed.newPosition) ? { newPosition: parsed.newPosition as number } : null;
  } catch {
    return null;
  }
}

function writeSession(value: { newPosition: number | null }) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

function hasRecorded() {
  try { return sessionStorage.getItem(SESSION_KEY) !== null; } catch { return false; }
}

/** Records this visit once per browser session and returns the live visitor state. */
export function useVisitorCount() {
  const [state, setState] = useState<VisitorState>(EMPTY);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    const record = !hasRecorded();

    fetch('/api/visitors', { method: record ? 'POST' : 'GET', signal: controller.signal })
      .then(response => (response.ok ? response.json() : null))
      .then((data: { count?: unknown; position?: unknown; isNew?: unknown } | null) => {
        if (!data || typeof data.count !== 'number' || !Number.isInteger(data.count) || data.count < 0) return;
        const position = Number.isInteger(data.position) && (data.position as number) > 0 ? (data.position as number) : null;
        if (record) writeSession({ newPosition: data.isNew === true ? position : null });
        const remembered = readSession();
        setState({
          count: data.count,
          position: remembered?.newPosition ?? position,
          isNew: remembered !== null,
        });
      })
      .catch(() => { /* the baseline stays visible */ })
      .finally(() => window.clearTimeout(timeout));

    return () => { controller.abort(); window.clearTimeout(timeout); };
  }, []);

  return state;
}
