import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projectWebProto = defineCollection({
  loader: glob({
    base: "./src/content/project/eva-and-redes-works",
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
    }),
});

export const collections = { projectWebProto };
