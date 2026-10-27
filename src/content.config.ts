import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Deliberately small.
 *
 * This is a portfolio, not a disclosure. Everything here is written at the
 * altitude a hiring manager reads at: what the problem was, what got built, and
 * what happened. No internal architecture, no code identifiers, no client names.
 */

const companies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/companies' }),
  schema: z.object({
    order: z.number().int(),
    name: z.string().min(1),
    slug: z.string().min(1),
    role: z.string().min(1),
    location: z.string().min(1),
    start: z.coerce.date(),
    end: z.coerce.date().nullable(),
    /** One line. What the place was. */
    summary: z.string().min(1),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    order: z.number().int(),
    company: reference('companies'),
    name: z.string().min(1),
    slug: z.string().min(1),
    start: z.coerce.date(),
    end: z.coerce.date().nullable(),
    /** The one line on the card. */
    tagline: z.string().min(1).max(160),
    stack: z.array(z.string().min(1)).min(1),
    /** Where it ended up. Plain words, good news and bad at the same weight. */
    status: z.string().min(1),
    live: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

export const collections = { companies, projects };
