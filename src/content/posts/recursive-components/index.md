---
title: "Building a table of contents with recursive components"
description: "or: How I learned to stop worrying and love algorithms in my UI"
publishedAt: "23 August 2023"
ogImage:
  src: "./recursive-components-og.png"
  alt: "recursive components post hero image"
draft: true
---

I _finally_ did the thing! After weeks of putting it off, countless hours staring at other people's sites in the name of _"research"_, I did it - I built a blog!

## Yay?

Verily.

I'm using [Astro's Content Collections](https://docs.astro.build/en/guides/content-collections) to handle organisation and metadata (frontmatter) validation of my posts.

Handily, an entry from a content collection has access to a `render()` method which returns the rendered `Content`, a list of `headings` in the entry, and our frontmatter

```md
## First heading, an H2

### H3 a sub heading of the first

#### An H4 nested even further

## New H2, section two

### Sub heading of section 2
```

It'll spit out an array that looks something like this

```ts
[
  {
    depth: 2,
    slug: "first-heading-an-h2",
    text: "First heading, an H2",
  },
  {
    depth: 3,
    slug: "h3-a-sub-heading-of-the-first",
    text: "H3 a sub heading of the first",
  },
  {
    depth: 4,
    slug: "an-h4-nested-even-further",
    text: "an H4 nested even further",
  },
  {
    depth: 2,
    slug: "a-new-top-level-heading",
    text: "A new top level heading",
  },
  {
    depth: 3,
    slug: "its-subsection",
    text: "it’s subsection",
  },
];
```

The keen eyed among you have probably already noted the `depth` key, and that it correlates to the heading levels we specified in our markdown. And it's ordered!

With a little munging we should be able to transform this into a tree structure that we can work with more easily when feeding data to our components.

This is a classic

````ts
function buildHeadingTree(headings: MarkdownHeading[]): MarkdownHeadingTree {
  const root = { depth: 0, slug: "", text: "", children: [] };
  const stack: MarkdownHeadingWithChildren[] = [root];

  for (const item of headings) {
    if (item.depth > maxDepth) {
      continue;
    }
    while (item.depth <= stack[stack.length - 1]!.depth) {
      stack.pop();
    }

    const newNode = { ...item, children: [] } as MarkdownHeadingWithChildren;
    stack[stack.length - 1]!.children!.push(newNode);
    stack.push(newNode);
  }

  return root.children;
}```

```tsx
<ul>
  {headings.map((h) => (
    <li>
      <div>
        <a href={`#${h.slug}`}>{h.text}</a>
      </div>
      {!!h.children?.length && <Astro.self headings={h.children} />}
    </li>
  ))}
</ul>
````
