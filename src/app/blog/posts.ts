// src/app/blog/posts.ts
export type BlogPostMeta = {
  title: string;
  slug: string; // folder name under /blog
  description: string;
  date: string; // ISO date
  tags?: string[];
};

export const posts: BlogPostMeta[] = [
  {
    title: "TFT Patch 15.4 – What Actually Changed (and How to Climb)",
    slug: "tft-patch-15-4",
    description:
      "Concise breakdown of Patch 15.4: item reworks, trait/role updates, Power-Up tuning, and practical comps/pivots to win LP.",
    date: "2025-09-09",
    tags: ["Patch Notes", "Set 15", "Meta"],
  },
];
