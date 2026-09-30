import { useMemo } from "react";
import type { TreeNode } from "../utils/treeUtils";
import { isOnMainBranch, getGenerationLabel, flattenTree } from "../utils/treeUtils";

interface SvgFamilyTreeProps {
  root: TreeNode;
  onNodeClick: (node: TreeNode) => void;
  highlightedIds: Set<string>;
  showMainBranch: boolean;
  showGenerations: boolean;
}

// ─── Layout constants (compact for fitting on screen) ───
const NODE_W = 110;
const NODE_H = 48;
const H_GAP = 10;
const V_GAP = 60;
const PADDING = 20;

// ─── Layout types ───
interface LayoutNode {
  node: TreeNode;
  x: number; // center x
  y: number; // top of the node box
  children: LayoutNode[];
}

// ─── Recursive layout: assigns (x, y) to each node ───
function layoutTree(node: TreeNode, depth: number, xOffset: { val: number }): LayoutNode {
  if (node.children.length === 0) {
    const x = xOffset.val + NODE_W / 2;
    xOffset.val += NODE_W + H_GAP;
    return { node, x, y: depth * (NODE_H + V_GAP) + PADDING, children: [] };
  }

  const childLayouts = node.children.map((child) =>
    layoutTree(child, depth + 1, xOffset)
  );

  const firstChild = childLayouts[0];
  const lastChild = childLayouts[childLayouts.length - 1];
  const x = (firstChild.x + lastChild.x) / 2;
  const y = depth * (NODE_H + V_GAP) + PADDING;

  return { node, x, y, children: childLayouts };
}

// ─── Flatten layout tree ───
function flattenLayout(ln: LayoutNode): LayoutNode[] {
  const result: LayoutNode[] = [ln];
  for (const ch of ln.children) result.push(...flattenLayout(ch));
  return result;
}

// ─── Edge data ───
interface Edge {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  midY: number;
  onPath: boolean;
}

function computeEdges(ln: LayoutNode, showMainBranch: boolean): Edge[] {
  const edges: Edge[] = [];
  for (const child of ln.children) {
    const parentOnMain = isOnMainBranch(ln.node.id);
    const childOnMain = isOnMainBranch(child.node.id);
    const onPath = showMainBranch && parentOnMain && childOnMain;

    const midY = ln.y + NODE_H + V_GAP / 2;
    edges.push({
      id: `edge-${ln.node.id}-${child.node.id}`,
      x1: ln.x,
      y1: ln.y + NODE_H,
      x2: child.x,
      y2: child.y,
      midY,
      onPath,
    });
    edges.push(...computeEdges(child, showMainBranch));
  }
  return edges;
}

export default function SvgFamilyTree({
  root,
  onNodeClick,
  highlightedIds,
  showMainBranch,
  showGenerations,
}: SvgFamilyTreeProps) {
  const layoutRoot = useMemo(() => {
    const xOffset = { val: PADDING };
    return layoutTree(root, 0, xOffset);
  }, [root]);

  const allLayouts = useMemo(() => flattenLayout(layoutRoot), [layoutRoot]);
  const allEdges = useMemo(() => computeEdges(layoutRoot, showMainBranch), [layoutRoot, showMainBranch]);

  // Compute SVG viewBox from actual tree bounds
  const allNodes = flattenTree(root);
  const maxX = Math.max(...allLayouts.map((l) => l.x)) + NODE_W / 2 + PADDING;
  const maxLevel = Math.max(...allNodes.map((n) => n.level));
  const svgH = (maxLevel + 1) * (NODE_H + V_GAP) + PADDING * 2;
  const svgW = maxX;

  return (
    <div className="w-full pb-4">
      {/* Legend */}
      <div className="flex flex-wrap justify-center mb-6 gap-3">
        <div className="inline-flex flex-wrap items-center gap-4 px-5 py-2.5 rounded-full bg-surface-800/60 border border-surface-700/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
            <span className="text-xs font-semibold text-amber-300">My Path</span>
          </div>
          <div className="w-px h-4 bg-surface-600/50" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 rounded-full bg-surface-400" />
            <span className="text-xs text-surface-300">Tree Edge</span>
          </div>
          <div className="w-px h-4 bg-surface-600/50" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold-400 ring-1 ring-gold-400/50" />
            <span className="text-xs font-semibold text-gold-300">ME</span>
          </div>
        </div>
      </div>

      {/* Path label */}
      {showMainBranch && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/25">
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-amber-300">
              Path:
            </span>
            <span className="text-[11px] text-amber-300/80 font-mono">
              Ganuji → Mahenjaji → Gulabrao → Namdeo → Vinit
            </span>
          </div>
        </div>
      )}

      {/* Responsive SVG — scales to fit container, no overflow */}
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block mx-auto"
        style={{ maxHeight: "80vh" }}
      >
        <defs>
          <filter id="edge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ═══ EDGES — normal first, then highlighted on top ═══ */}
        {allEdges.filter((e) => !e.onPath).map((edge) => (
          <g key={edge.id} id={edge.id}>
            <line x1={edge.x1} y1={edge.y1} x2={edge.x1} y2={edge.midY}
              stroke="#64748b" strokeWidth={1.5} strokeOpacity={0.5} />
            <line x1={edge.x1} y1={edge.midY} x2={edge.x2} y2={edge.midY}
              stroke="#64748b" strokeWidth={1.5} strokeOpacity={0.5} />
            <line x1={edge.x2} y1={edge.midY} x2={edge.x2} y2={edge.y2}
              stroke="#64748b" strokeWidth={1.5} strokeOpacity={0.5} />
          </g>
        ))}
        {allEdges.filter((e) => e.onPath).map((edge) => (
          <g key={edge.id} id={edge.id} filter="url(#edge-glow)">
            <line x1={edge.x1} y1={edge.y1} x2={edge.x1} y2={edge.midY}
              stroke="#fbbf24" strokeWidth={3} strokeLinecap="round" />
            <line x1={edge.x1} y1={edge.midY} x2={edge.x2} y2={edge.midY}
              stroke="#fbbf24" strokeWidth={3} strokeLinecap="round" />
            <line x1={edge.x2} y1={edge.midY} x2={edge.x2} y2={edge.y2}
              stroke="#fbbf24" strokeWidth={3} strokeLinecap="round" />
          </g>
        ))}

        {/* ═══ NODES ═══ */}
        {allLayouts.map((ln) => {
          const n = ln.node;
          const onMain = isOnMainBranch(n.id);
          const isMe = n.isMe === true;
          const isHighlighted = highlightedIds.has(n.id);
          const pathNode = showMainBranch && onMain;

          const rx = 8;
          const x = ln.x - NODE_W / 2;
          const y = ln.y;

          let fill = "#1e293b";
          let stroke = "#475569";
          let strokeW = 1.5;
          let textFill = "#e2e8f0";

          if (isMe) {
            fill = "#422006"; stroke = "#facc15"; strokeW = 2.5; textFill = "#fef08a";
          } else if (pathNode) {
            fill = "#1c1917"; stroke = "#f59e0b"; strokeW = 2; textFill = "#fde68a";
          } else if (isHighlighted) {
            fill = "#1e1b4b"; stroke = "#a78bfa"; strokeW = 2; textFill = "#ddd6fe";
          }

          return (
            <g
              key={n.id}
              className="cursor-pointer"
              onClick={() => onNodeClick(n)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNodeClick(n); }}
            >
              {/* Glow behind path nodes */}
              {(pathNode || isMe) && (
                <rect
                  x={x - 2} y={y - 2}
                  width={NODE_W + 4} height={NODE_H + 4}
                  rx={rx + 2}
                  fill="none" stroke={isMe ? "#facc15" : "#f59e0b"}
                  strokeWidth={1} strokeOpacity={0.3}
                  filter="url(#edge-glow)"
                />
              )}

              {/* Node rectangle */}
              <rect
                x={x} y={y}
                width={NODE_W} height={NODE_H}
                rx={rx}
                fill={fill} stroke={stroke} strokeWidth={strokeW}
              />

              {/* Name */}
              <text
                x={ln.x} y={y + (showGenerations ? 18 : 26)}
                textAnchor="middle"
                fill={textFill}
                fontSize={10} fontWeight={600}
                fontFamily="Inter, system-ui, sans-serif"
              >
                {n.name}
              </text>

              {/* Level & Generation label */}
              {showGenerations && (
                <text
                  x={ln.x} y={y + 34}
                  textAnchor="middle"
                  fill={textFill}
                  fontSize={8} fontWeight={400}
                  opacity={0.6}
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  L{n.level} · {getGenerationLabel(n.level)}
                </text>
              )}

              {/* Root badge */}
              {n.parentId === null && (
                <g>
                  <rect
                    x={ln.x - 16} y={y - 11}
                    width={32} height={13}
                    rx={6}
                    fill={pathNode ? "#f59e0b" : "#3b82f6"}
                  />
                  <text
                    x={ln.x} y={y - 2}
                    textAnchor="middle"
                    fill={pathNode ? "#1c1917" : "#ffffff"}
                    fontSize={7} fontWeight={700}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    ROOT
                  </text>
                </g>
              )}

              {/* ME badge */}
              {isMe && (
                <g>
                  <rect
                    x={x + NODE_W - 24} y={y - 9}
                    width={26} height={13}
                    rx={6}
                    fill="#facc15"
                  />
                  <text
                    x={x + NODE_W - 11} y={y + 1}
                    textAnchor="middle"
                    fill="#1c1917"
                    fontSize={7} fontWeight={800}
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    ME
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
