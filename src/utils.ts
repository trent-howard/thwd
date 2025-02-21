import { getCollection } from "astro:content";
const isDev = import.meta.env.DEV;

/**
 * Fetches all posts filtering drafts if the app is PROD
 */
export async function getPosts() {
  return getCollection("posts", ({ data }) => isDev || !data.draft);
}
