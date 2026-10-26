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
      tags: z.array(
        z.object({
          type: z.string(),
          icon: z.string(),
          content: z.array(z.string()),
        }),
      ),
      sections: z.array(
        z.object({
          title: z.string(),
          content: z.array(
            z.discriminatedUnion("type", [
              z.object({
                type: z.literal("text"),
                body: z.array(z.string()),
              }),
              z.object({
                type: z.literal("image"),
                body: z.array(
                  z.object({
                    url: image(),
                    caption: z.string(),
                  }),
                ),
              }),
            ]),
          ),
        }),
      ),
      link: z.string().optional(),
      banner: image(),
    }),
});

export const collections = { projects };
