import { z, defineCollection } from "astro:content";

const Tags = z.enum(["react", "webdev", "frontend"]);

const posts = defineCollection({
  type: "content",
  schema: z.object({
    // ugh, max lengths for title and description are so inconsistent
    // maybe I should just let it truncate
    // https://ogtester.com/blog/what-is-maximum-length-of-og-title-and-og-description
    title: z.string().max(60),
    description: z.string().max(160),
    publishedAt: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedAt: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(Tags).default([]),
    ogImage: z.string().optional(),
  }),
});

export const collections = { posts };
