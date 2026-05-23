import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    id: z.string(),
    title: z.string(),
    tag: z.string(),
    year: z.string(),
    role: z.string(),
    size: z.string(),
    accent: z.enum(['green', 'dark', 'gray']),
    summary: z.string(),
    problem: z.string(),
    approach: z.string(),
    outcome: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    featured: z.boolean().optional(),
    order: z.number().default(99),
  }),
});

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    readTime: z.string(),
    description: z.string(),
    notionUrl: z.string().url(),
  }),
});

export const collections = { work, writing };
