import { familyMembers, mainBranchIds, type FamilyMember } from "../data/familyTree";

// ─── Tree Node with computed children ───

export interface TreeNode extends FamilyMember {
  children: TreeNode[];
  level: number;
}

// ─── Build hierarchical tree from flat list ───

export function buildTree(members: FamilyMember[] = familyMembers): TreeNode {
  const map = new Map<string, TreeNode>();

  // Create TreeNode for each member
  for (const m of members) {
    map.set(m.id, { ...m, children: [], level: 0 });
  }

  let root: TreeNode | null = null;

  for (const node of map.values()) {
    if (node.parentId === null) {
      root = node;
    } else {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  if (!root) throw new Error("No root node found in family data");

  // Assign levels via BFS
  const queue: TreeNode[] = [root];
  root.level = 0;
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const child of current.children) {
      child.level = current.level + 1;
      queue.push(child);
    }
  }

  return root;
}

// ─── Flat list of all nodes from the tree ───

export function flattenTree(node: TreeNode): TreeNode[] {
  const result: TreeNode[] = [node];
  for (const child of node.children) {
    result.push(...flattenTree(child));
  }
  return result;
}

// ─── Tree height (longest root-to-leaf path in edges) ───

export function getTreeHeight(node: TreeNode): number {
  if (node.children.length === 0) return 0;
  return 1 + Math.max(...node.children.map(getTreeHeight));
}

// ─── Degree of a node (number of children) ───

export function getDegree(node: TreeNode): number {
  return node.children.length;
}

// ─── Node type ───

export type NodeType = "Root" | "Internal Node" | "Leaf Node";

export function getNodeType(node: TreeNode): NodeType {
  if (node.parentId === null) return "Root";
  if (node.children.length === 0) return "Leaf Node";
  return "Internal Node";
}

// ─── Check if node is on main branch ───

export function isOnMainBranch(nodeId: string): boolean {
  return mainBranchIds.includes(nodeId);
}

// ─── Get parent name ───

export function getParentName(nodeId: string, members: FamilyMember[] = familyMembers): string {
  const member = members.find((m) => m.id === nodeId);
  if (!member || !member.parentId) return "None (Root)";
  const parent = members.find((m) => m.id === member.parentId);
  return parent ? parent.name : "Unknown";
}

// ─── Get children names ───

export function getChildrenNames(node: TreeNode): string[] {
  return node.children.map((c) => c.name);
}

// ─── Get siblings ───

export function getSiblings(nodeId: string, allNodes: TreeNode[]): TreeNode[] {
  const node = allNodes.find((n) => n.id === nodeId);
  if (!node || !node.parentId) return [];
  return allNodes.filter((n) => n.parentId === node.parentId && n.id !== nodeId);
}

// ─── Statistics ───

export interface TreeStats {
  totalNodes: number;
  leafNodes: number;
  internalNodes: number;
  treeHeight: number;
  generations: number;
  maxDegree: number;
  myLevel: number;
}

export function computeStats(root: TreeNode): TreeStats {
  const allNodes = flattenTree(root);
  const leaves = allNodes.filter((n) => n.children.length === 0);
  const internals = allNodes.filter((n) => n.children.length > 0);
  const height = getTreeHeight(root);
  const maxLevel = Math.max(...allNodes.map((n) => n.level));
  const maxDegree = Math.max(...allNodes.map((n) => n.children.length));
  const vinit = allNodes.find((n) => n.id === "vinit");

  return {
    totalNodes: allNodes.length,
    leafNodes: leaves.length,
    internalNodes: internals.length,
    treeHeight: height,
    generations: maxLevel + 1,
    maxDegree,
    myLevel: vinit ? vinit.level : -1,
  };
}

// ─── Get nodes grouped by level/generation ───

export function getNodesByLevel(root: TreeNode): Map<number, TreeNode[]> {
  const allNodes = flattenTree(root);
  const map = new Map<number, TreeNode[]>();
  for (const node of allNodes) {
    if (!map.has(node.level)) map.set(node.level, []);
    map.get(node.level)!.push(node);
  }
  return map;
}

// ─── Search ───

export function searchNodes(query: string, allNodes: TreeNode[]): TreeNode[] {
  if (!query.trim()) return [];
  const lower = query.toLowerCase().trim();
  return allNodes.filter((n) => n.name.toLowerCase().includes(lower));
}

// ─── Generation label ───

export function getGenerationLabel(level: number): string {
  const labels: Record<number, string> = {
    0: "1st Generation",
    1: "2nd Generation",
    2: "3rd Generation",
    3: "4th Generation",
    4: "5th Generation",
  };
  return labels[level] || `Generation ${level + 1}`;
}
