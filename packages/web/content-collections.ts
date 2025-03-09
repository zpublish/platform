import { defineCollection, defineConfig } from "@content-collections/core";
 
const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
  }),
  transform: ({ content: _, ...post }) => {
    return post;
  },
});
 
export default defineConfig({
  collections: [posts],
});
