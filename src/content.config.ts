import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/project",
    pattern: "**/*.json",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      brief: z.string(),
      "soft-skill": z.string(),
      dialogues: z.array(z.string()),
      images: z.array(
        z.object({
          indexDialogue: z.string(),
          url: image(),
          caption: z.string(),
        }),
      ),
      link: z.string().optional(),
    }),
});

export const collections = { projects };