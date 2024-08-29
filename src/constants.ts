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
  description: "A Melbourne dev's thoughts on programming, music, food, and more.",
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
  ogImageSrc?: string;
  publishedAt?: string;
};

// markdown headings that will be converted to links
// and added to the post outline
export const linkableMdHeadings = ["h1", "h2", "h3"];

export const tehSocials = [
  {
    name: "Github",
    iconName: "mdi:github",
    url: "https://github.com/trent-howard",
  },
  {
    name: "LinkedIn",
    iconName: "mdi:linkedin",
    url: "https://linkedin.com/in/thwrd",
  },
  {
    name: "bandcamp",
    iconName: "fa-brands:bandcamp",
    url: "https://bandcamp.com/trenthoward",
  },
];
