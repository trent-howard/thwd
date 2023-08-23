import { getCollection } from "astro:content";
const isDev = import.meta.env.DEV;

export async function getPosts() {
  return getCollection("posts", ({ data }) => isDev || !data?.draft);
}
