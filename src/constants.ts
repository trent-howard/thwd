export const menuItems: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
];

export type Config = {
  author: string;
  title: string;
  description: string;
  ogLocale: string;
};

export const config: Config = {
  author: "Trent",
  title: "thwd.dev",
  description:
    "Ramblings about tech, music, and anything else that takes my fancy",
  ogLocale: "en_AU",
};

export type Meta = {
  title: string;
  description?: string;
  ogImage?: string;
  publishedAt?: string;
};
