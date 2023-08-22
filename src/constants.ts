export const menuItems: Array<{ title: string; path: string }> = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Posts",
    path: "/posts",
  },
];

export type Config = {
  author: string;
  title: string;
  description: string;
  ogLocale: string;
  date: {
    locale: string;
    options: Intl.DateTimeFormatOptions;
  };
};

export const config: Config = {
  author: "Trent",
  title: "thwd.dev",
  description:
    "Ramblings about tech, music, and anything else that takes my fancy",
  ogLocale: "en_AU",
  date: {
    locale: "en-AU",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
};

export type Meta = {
  title: string;
  description?: string;
  ogImage?: {
    src: string;
    alt: string;
  };
  publishedAt?: string;
};
