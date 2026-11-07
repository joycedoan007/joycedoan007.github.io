import { defineCollection, z } from 'astro:content';

const workSchema = z.object({
    title: z.string(),
    subtitle: z.string(),          // e.g. "Document Management System"
    description: z.string(),
    skills: z.array(z.string()),   // e.g. ["BRANDING", "WEB DESIGN", "WEBFLOW"]
    role: z.string().default('UI/UX Designer'),
    company: z.string().default('Consortia Group'),
    year: z.string().optional(),
    category: z.string().optional(),
    hasImage: z.boolean().default(false),
    order: z.number().default(99),
});

const work = defineCollection({ type: 'content', schema: workSchema });

const writingSchema = z.object({
    title: z.string(),
    date: z.string(),
    readTime: z.string(),
    description: z.string(),
    notionUrl: z.string().url(),
    category: z.string().optional(),
    popular: z.boolean().optional(),
    tocGroups: z.array(z.object({
      label: z.string(),
      slugs: z.array(z.string()),
    })).optional(),
});

const writing = defineCollection({ type: 'content', schema: writingSchema });

// Vietnamese copies: same filenames and schema as the English entries.
const workVi = defineCollection({ type: 'content', schema: workSchema });
const writingVi = defineCollection({ type: 'content', schema: writingSchema });

export const collections = { work, writing, 'work-vi': workVi, 'writing-vi': writingVi };
