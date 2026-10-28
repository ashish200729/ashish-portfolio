import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from '../hooks/useMotion';

interface Node {
  x: number;
  y: number;
  phase: number;
  drift: number;
  size: number;
  born: number;
  /** Time the fact stopped being true, if it has. */
  closedAt?: number;
  /** Time the node began fading out of the field. */
  removedAt?: number;
}

interface Edge {
  from: Node;
  to: Node;
  born: number;
  supersedes: boolean;
}

const SUPERSEDE_EVERY = 1500;
const DRAW_LINK = 700;
const FADE_OUT = 1200;

/** A small deterministic generator, so every visit starts from the same composition. */
function random(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function createField(width: number, height: number) {
  const rand = random(20261028);
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const count = Math.max(26, Math.min(64, Math.round(width * height / 2600)));
  const margin = 22;

  // Points gather in a loose band, like a cluster of related memories.
  const place = (near?: Node) => {
    if (near) {
      const angle = rand() * Math.PI * 2;
      const distance = 20 + rand() * 18;
      return {
        x: Math.min(width - margin, Math.max(margin, near.x + Math.cos(angle) * distance)),
        y: Math.min(height - margin, Math.max(margin, near.y + Math.sin(angle) * distance)),
      };
    }
    const x = margin + rand() * (width - margin * 2);
    const band = height / 2 + Math.sin(x / width * Math.PI * 2) * height * 0.16;
    return { x, y: Math.min(height - margin, Math.max(margin, band + (rand() - 0.5) * height * 0.62)) };
  };

  const add = (time: number, near?: Node): Node => {
    const node: Node = { ...place(near), phase: rand() * Math.PI * 2, drift: 2 + rand() * 4, size: 1.6 + rand() * 1.6, born: time };
    nodes.push(node);
    return node;
  };

  const nearest = (node: Node, limit: number) => nodes
    .filter(other => other !== node && other.removedAt === undefined)
    .sort((a, b) => Math.hypot(a.x - node.x, a.y - node.y) - Math.hypot(b.x - node.x, b.y - node.y))
    .slice(0, limit);

  for (let index = 0; index < count; index += 1) add(-10_000);
  for (const node of nodes) {
    for (const other of nearest(node, 2)) {
      if (!edges.some(edge => (edge.from === node && edge.to === other) || (edge.from === other && edge.to === node))) {
        edges.push({ from: node, to: other, born: -10_000, supersedes: false });
      }
    }
  }

  /** One fact stops being true: it is closed, kept, and linked to the fact that replaced it. */
  const supersede = (time: number) => {
    const live = nodes.filter(node => node.closedAt === undefined && node.removedAt === undefined && time - node.born > 2000);
    if (!live.length) return;
    const old = live[Math.floor(rand() * live.length)];
    old.closedAt = time;
    const next = add(time, old);
    edges.push({ from: old, to: next, born: time, supersedes: true });
    const neighbour = nearest(next, 2).find(other => other !== old && other.closedAt === undefined);
    if (neighbour) edges.push({ from: next, to: neighbour, born: time, supersedes: false });

    // Keep the field readable: the oldest closed facts fade out once there are too many.
    const closed = nodes.filter(node => node.closedAt !== undefined && node.removedAt === undefined);
    if (closed.length > count * 0.3) closed.sort((a, b) => (a.closedAt ?? 0) - (b.closedAt ?? 0))[0].removedAt = time;
  };

  const prune = (time: number) => {
    for (let index = nodes.length - 1; index >= 0; index -= 1) {
      const node = nodes[index];
      if (node.removedAt !== undefined && time - node.removedAt > FADE_OUT) {
        nodes.splice(index, 1);
        for (let edge = edges.length - 1; edge >= 0; edge -= 1) {
          if (edges[edge].from === node || edges[edge].to === node) edges.splice(edge, 1);
        }
      }
    }
  };

  return { nodes, edges, supersede, prune };
}

type Field = ReturnType<typeof createField>;

function draw(context: CanvasRenderingContext2D, field: Field, width: number, height: number, time: number, moving: boolean) {
  context.clearRect(0, 0, width, height);

  // Faint ledger grid.
  context.fillStyle = 'rgba(132, 164, 255, 0.13)';
  for (let x = 7; x < width; x += 14) {
    for (let y = 7; y < height; y += 14) context.fillRect(x, y, 1, 1);
  }

  const position = (node: Node) => moving
    ? { x: node.x + Math.sin(time / 2400 + node.phase) * node.drift, y: node.y + Math.cos(time / 3100 + node.phase) * node.drift * 0.7 }
    : { x: node.x, y: node.y };
  const presence = (node: Node) => {
    const entering = Math.min(1, Math.max(0, (time - node.born) / 600));
    const leaving = node.removedAt === undefined ? 1 : Math.max(0, 1 - (time - node.removedAt) / FADE_OUT);
    return entering * leaving;
  };

  for (const edge of field.edges) {
    const from = position(edge.from);
    const to = position(edge.to);
    const progress = Math.min(1, Math.max(0, (time - edge.born) / DRAW_LINK));
    const alpha = Math.min(presence(edge.from), presence(edge.to));
    if (progress <= 0 || alpha <= 0) continue;
    const end = { x: from.x + (to.x - from.x) * progress, y: from.y + (to.y - from.y) * progress };
    if (edge.supersedes) {
      const glow = Math.max(0.6, 1 - (time - edge.born) / 3200);
      context.strokeStyle = `rgba(196, 214, 255, ${0.95 * glow * alpha})`;
      context.lineWidth = 1.5;
    } else {
      context.strokeStyle = `rgba(132, 164, 255, ${0.24 * alpha})`;
      context.lineWidth = 1;
    }
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  }

  for (const node of field.nodes) {
    const { x, y } = position(node);
    const alpha = presence(node);
    if (alpha <= 0) continue;
    if (node.closedAt !== undefined) {
      // Closed, not deleted: a hollow ring that stays in the history.
      context.strokeStyle = `rgba(176, 198, 255, ${0.85 * alpha})`;
      context.lineWidth = 1.25;
      context.beginPath();
      context.arc(x, y, node.size + 2.4, 0, Math.PI * 2);
      context.stroke();
      continue;
    }
    const age = time - node.born;
    if (moving && age >= 0 && age < 1400) {
      const pulse = age / 1400;
      context.strokeStyle = `rgba(196, 214, 255, ${(1 - pulse) * 0.8})`;
      context.lineWidth = 1;
      context.beginPath();
      context.arc(x, y, node.size + 2 + pulse * 12, 0, Math.PI * 2);
      context.stroke();
    }
    context.fillStyle = `rgba(112, 150, 255, ${0.22 * alpha})`;
    context.beginPath();
    context.arc(x, y, node.size + 3, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = `rgba(214, 226, 255, ${alpha})`;
    context.beginPath();
    context.arc(x, y, node.size, 0, Math.PI * 2);
    context.fill();
  }
}

/**
 * A decorative field of facts. Every so often one is superseded: it becomes a hollow ring and a bright
 * link draws to the fact that replaced it. Pauses off screen and in background tabs; still for reduced motion.
 */
export default function MemoryField({ caption }: { caption: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const visible = useInView(frame, { threshold: 0 });

  useEffect(() => {
    const element = canvas.current;
    const container = frame.current;
    const context = element?.getContext('2d');
    if (!element || !container || !context) return;

    let field: Field | undefined;
    let width = 0;
    let height = 0;
    let animation = 0;
    let elapsed = 0;
    let last = 0;
    let nextSupersede = SUPERSEDE_EVERY;
    const animate = !reducedMotion && visible;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      if (Math.round(bounds.width) === width && Math.round(bounds.height) === height && field) return;
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      field = createField(width, height);
      elapsed = 0;
      nextSupersede = SUPERSEDE_EVERY;
      if (!animate) {
        // A still frame that already shows a few superseded facts.
        for (let step = 1; step <= 6; step += 1) field.supersede(step * SUPERSEDE_EVERY);
        draw(context, field, width, height, 6 * SUPERSEDE_EVERY + 4000, false);
      }
    };

    const tick = (now: number) => {
      if (!field) return;
      if (document.hidden) {
        last = now;
        animation = requestAnimationFrame(tick);
        return;
      }
      elapsed += last ? Math.min(now - last, 64) : 0;
      last = now;
      while (elapsed >= nextSupersede) {
        field.supersede(nextSupersede);
        nextSupersede += SUPERSEDE_EVERY;
      }
      field.prune(elapsed);
      draw(context, field, width, height, elapsed, true);
      animation = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      if (!animate && field) draw(context, field, width, height, 6 * SUPERSEDE_EVERY + 4000, false);
    });
    observer.observe(container);
    if (animate) animation = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animation);
    };
  }, [reducedMotion, visible]);

  return (
    <figure className="mt-8">
      <div ref={frame} className="relative aspect-[2/1] overflow-hidden rounded-2xl bg-signal-panel sm:aspect-[2.3/1]">
        <canvas ref={canvas} className="absolute inset-0 size-full" aria-hidden="true" />
      </div>
      <figcaption className="mt-2.5 text-xs leading-5 text-ink-2">{caption}</figcaption>
    </figure>
  );
}
