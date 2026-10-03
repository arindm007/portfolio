"use client";

import { useEffect, useRef } from "react";

const LABELS = ["plan", "retrieve", "tool_call", "memory", "evaluate", "respond", "mcp", "guardrail"];
const LINK = 165; // max distance, in px, at which two nodes are connected
const REACH = 210; // how far the pointer's influence extends

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  glow: number;
  label?: string;
}

/** A shooting star crossing the sky. Position is the head; the tail trails behind it. */
interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

/** A signal travelling from node `a` to node `b`, like an agent handing off a step. */
interface Pulse {
  a: number;
  b: number;
  t: number;
  hops: number;
}

function toRgb(value: string, fallback: string) {
  const hex = value.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  const n = parseInt(hex, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

/**
 * Site backdrop: a drifting graph of nodes with signals hopping between them,
 * stars twinkling underneath and the odd comet streaking across.
 * Reacts to the pointer; clicking fires a burst from the nearest node.
 */
export default function AgentField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let comets: Comet[] = [];
    let stars: { x: number; y: number; r: number; phase: number }[] = [];
    let untilComet = 1200;
    let clock = 0;
    let raf = 0;
    let running = false;
    let last = 0;
    let sinceSpawn = 0;
    let fg = "236, 234, 227";
    let accent = "255, 196, 107";
    let accentHi = "255, 226, 176";
    let ember = "255, 122, 69";
    let mono = "monospace";

    const readTheme = () => {
      const style = getComputedStyle(document.documentElement);
      fg = toRgb(style.getPropertyValue("--fg"), fg);
      accent = toRgb(style.getPropertyValue("--accent"), accent);
      accentHi = toRgb(style.getPropertyValue("--accent-hi"), accentHi);
      ember = toRgb(style.getPropertyValue("--ember"), ember);
      mono = style.getPropertyValue("--font-geist-mono").trim() || "monospace";
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(76, Math.max(20, (w * h) / 19000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        glow: 0,
        label: LABELS[i],
      }));
      pulses = [];
      comets = [];
      stars = Array.from({ length: Math.round((w * h) / 6500) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 0.9 + 0.25,
        phase: Math.random() * Math.PI * 2,
      }));
      if (!running) draw();
    };

    const neighbours = (i: number, except = -1) => {
      const out: number[] = [];
      const a = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i || j === except) continue;
        if (Math.hypot(nodes[j].x - a.x, nodes[j].y - a.y) < LINK) out.push(j);
      }
      return out;
    };

    const send = (from: number, hops = 0, except = -1) => {
      const options = neighbours(from, except);
      if (!options.length) return;
      pulses.push({ a: from, b: options[Math.floor(Math.random() * options.length)], t: 0, hops });
    };

    const update = (dt: number) => {
      const k = dt / 16.67;

      for (const n of nodes) {
        n.x += n.vx * k;
        n.y += n.vy * k;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        // Nodes ease away from the pointer, so the graph parts around it.
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 130 && d > 0.01) {
          const push = (1 - d / 130) * 0.9 * k;
          n.x += (dx / d) * push;
          n.y += (dy / d) * push;
        }
        if (n.glow > 0) n.glow = Math.max(0, n.glow - 0.018 * k);
      }

      sinceSpawn += dt;
      if (sinceSpawn > 380 && pulses.length < 12) {
        sinceSpawn = 0;
        send(Math.floor(Math.random() * nodes.length));
      }

      // Comets enter from the top or left edge and cross on a shallow diagonal.
      clock += dt;
      untilComet -= dt;
      if (untilComet <= 0) {
        untilComet = 2200 + Math.random() * 3800;
        const speed = 0.5 + Math.random() * 0.35;
        const angle = (18 + Math.random() * 22) * (Math.PI / 180);
        const fromTop = Math.random() < 0.7;
        comets.push({
          x: fromTop ? Math.random() * w * 0.75 : -40,
          y: fromTop ? -40 : Math.random() * h * 0.5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        });
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        if (c.x > w + 300 || c.y > h + 300) comets.splice(i, 1);
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += dt / 720;
        if (p.t < 1) continue;
        pulses.splice(i, 1);
        nodes[p.b].glow = 1;
        if (p.hops < 5 && Math.random() < 0.78) send(p.b, p.hops + 1, p.a);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        ctx.fillStyle = `rgba(${fg}, ${0.12 + 0.22 * (0.5 + 0.5 * Math.sin(clock / 1100 + s.phase))})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const c of comets) {
        const length = 220;
        const speed = Math.hypot(c.vx, c.vy);
        const tx = c.x - (c.vx / speed) * length;
        const ty = c.y - (c.vy / speed) * length;
        const tail = ctx.createLinearGradient(c.x, c.y, tx, ty);
        tail.addColorStop(0, `rgba(${accentHi}, 0.95)`);
        tail.addColorStop(0.25, `rgba(${accent}, 0.55)`);
        tail.addColorStop(1, `rgba(${ember}, 0)`);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.fillStyle = `rgb(${accentHi})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d >= LINK) continue;
          ctx.strokeStyle = `rgba(${fg}, ${(1 - d / LINK) * 0.17})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }

        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < REACH) {
          ctx.strokeStyle = `rgba(${accent}, ${(1 - dm / REACH) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        const head = p.t * p.t * (3 - 2 * p.t);
        const tail = Math.max(0, head - 0.28);
        const hx = a.x + (b.x - a.x) * head;
        const hy = a.y + (b.y - a.y) * head;
        ctx.strokeStyle = `rgba(${accent}, 0.75)`;
        ctx.beginPath();
        ctx.moveTo(a.x + (b.x - a.x) * tail, a.y + (b.y - a.y) * tail);
        ctx.lineTo(hx, hy);
        ctx.stroke();
        ctx.fillStyle = `rgb(${accent})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.font = `10px ${mono}`;
      for (const n of nodes) {
        if (n.glow > 0) {
          ctx.strokeStyle = `rgba(${accent}, ${n.glow * 0.7})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3 + (1 - n.glow) * 16, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = n.glow > 0.35 ? `rgb(${accent})` : `rgba(${fg}, ${n.label ? 0.85 : 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.label ? 2.4 : 1.4, 0, Math.PI * 2);
        ctx.fill();
        if (n.label) {
          ctx.fillStyle = n.glow > 0.35 ? `rgba(${accent}, ${0.4 + n.glow * 0.6})` : `rgba(${fg}, 0.34)`;
          ctx.fillText(n.label, n.x + 9, n.y + 3);
        }
      }
    };

    const frame = (now: number) => {
      update(Math.min(now - last, 50));
      last = now;
      draw();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const onClick = () => {
      if (!running || mouse.y < 0 || mouse.y > h) return;
      let nearest = 0;
      let best = Infinity;
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < best) {
          best = d;
          nearest = i;
        }
      });
      nodes[nearest].glow = 1;
      for (let i = 0; i < 4; i++) send(nearest);
    };

    readTheme();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(canvas);
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (!running) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    // The mono face may still be loading on first paint; pick it up once it lands.
    document.fonts?.ready.then(readTheme);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
