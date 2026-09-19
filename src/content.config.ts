import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Optional overrides for the <head> only; the article keeps the full title.
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
  }),
})

const blogFr = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog-fr" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Optional overrides for the <head> only; the article keeps the full title.
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
  }),
})

export const collections = { blog, blogFr }
