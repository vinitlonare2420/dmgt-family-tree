// Single source of truth for the Lonare family tree
// All relationships, levels, and calculations derive from this data.

export interface FamilyMember {
  id: string;
  name: string;
  parentId: string | null;
  isMe?: boolean;
}

/**
 * Flat family member list.
 * The tree hierarchy is derived from parentId relationships.
 * Do NOT modify names or relationships — they come from confirmed data.
 */
export const familyMembers: FamilyMember[] = [
  // Generation 1 — Root
  { id: "ganuji", name: "Ganuji Lonare", parentId: null },

  // Generation 2 — Child of Root
  { id: "mahenjaji", name: "Mahenjaji Lonare", parentId: "ganuji" },

  // Generation 3 — Children of Mahenjaji
  { id: "sahebrao", name: "Sahebrao Lonare", parentId: "mahenjaji" },
  { id: "shitaramji", name: "Shitaramji Lonare", parentId: "mahenjaji" },
  { id: "gulabrao", name: "Gulabrao Lonare", parentId: "mahenjaji" },
  { id: "champakrao", name: "Champakrao Lonare", parentId: "mahenjaji" },

  // Generation 4 — Children of Sahebrao
  { id: "mirabai", name: "Mirabai Lonare", parentId: "sahebrao" },
  { id: "kusumtai", name: "Kusumtai Lonare", parentId: "sahebrao" },

  // Generation 4 — Child of Shitaramji
  { id: "parrmilatai", name: "Parrmilatai Lonare", parentId: "shitaramji" },

  // Generation 4 — Children of Gulabrao
  { id: "namdeo", name: "Namdeo Lonare", parentId: "gulabrao" },
  { id: "mahesh", name: "Mahesh Lonare", parentId: "gulabrao" },
  { id: "gajanan", name: "Gajanan Lonare", parentId: "gulabrao" },

  // Generation 5 — Children of Namdeo (deepest level through main branch)
  { id: "vinit", name: "Vinit Lonare", parentId: "namdeo", isMe: true },
  { id: "nidhi", name: "Nidhi Lonare", parentId: "namdeo" },

  // Generation 5 — Children of Mahesh
  { id: "piyush", name: "Piyush Lonare", parentId: "mahesh" },
  { id: "ayush", name: "Ayush Lonare", parentId: "mahesh" },

  // Generation 5 — Child of Gajanan
  { id: "kushmit", name: "Kushmit Lonare", parentId: "gajanan" },

  // Generation 4 — Children of Champakrao
  { id: "gyanashvar", name: "Gyanashvar Lonare", parentId: "champakrao" },
  { id: "varshatai", name: "Varshatai Lonare", parentId: "champakrao" },
];

/** The IDs forming Vinit's direct branch from root */
export const mainBranchIds: string[] = [
  "ganuji",
  "mahenjaji",
  "gulabrao",
  "namdeo",
  "vinit",
];
