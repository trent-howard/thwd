---
title: "Bootstrapping a TypeScript Node.js project in 2023"
description: "How I set up a new project in an ever changing landscape of tooling and a labyrinth of config."
publishedAt: "12 October 2023"
ogImage:
  src: "./modern-node-ts-og.png"
  alt: "post hero image retro-futuristic rocket space-scape"
---

Developing with Node and TypeScript is awesome - you can move fast, adapt to changing scope and requirements, all with a pretty great developer experience.

But setting up a new project _**sucks**_. You want good code quality from the get go, so you'll need a linter, and a formatter, and a decent baseline TypeScript config, and now there's new build tools like ESBuild and SWC so you should probably use those, but bun and deno are things too, and what's the best way to run my code in dev, is `ts-node` what the cool kids still use 🤯

It's probably the biggest barrier to starting a new project for me. I get paralysed with the options and spend so much time reading up on tooling, fighting with configuration, that I never really get started and let the idea fizzle out.

This is less of an exploratory post and more of a list of instructions and notes I can follow next time I need to do this. But it might be of some benefit to some poor dev who is overwhelmed with the enormity of the task. For me it's a pretty good baseline of modern and efficient tooling with reliability.

Maybe it should be a template repo or something, but then I'd have to maintain it 😅

A few of the tools we'll use:

- [git](https://git-scm.com/)
- [pnpm](https://pnpm.io)
- [Node.js](https://nodejs.org)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [ESBuild](https://esbuild.github.io/)
- [tsx](https://github.com/esbuild-kit/tsx)

## Initial setup

You'll want to use git from the get go. Set up and push to a remote if you want. If you're reasonably aggressive about committing you can decisively make bold changes without the fear of losing your code.

```sh
mkdir modern-node-typescript
cd modern-node-typescript
git init
```

Create a `.gitignore` file - I like to start pretty minimal and add to it as needed. This is a Typescript repo so we probably don't want to commit our compiled production bundle. I usually output this in a `dist` directory.

```txt title=".gitignore"
node_modules
dist
.env
```

Initialise a new package and create the entry point - you can name these folders/files however you like, this is just my preference.

```sh
pnpm init
mkdir src
touch src/index.ts
```

Update the [`main`](https://nodejs.org/api/packages.html#main) key in `package.json` and set [`type`](https://nodejs.org/api/packages.html#type) to `module` so our files are treated as ES modules.

```json title="package.json" del={5} ins={6-7}
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "main": "src/index.ts",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## Setup Typescript

Install typescript, type definitions for Node.js, and a base typescript configuration for the node version we're targeting (in this case 20), These are dev dependencies.

```sh
pnpm i -D typescript @types/node @tsconfig/node20
```

Now we need to set up our TypeScript config. We can use this to generate a starting point for us.

```sh
pnpm exec tsc --init
```

However, I'm not sure if this is actually the best way to go - in practice I usually end up the config I end up with is usually quite different. It's probably easier just to copy it from another project.

Whichever way you go, be sure to exclude your production build `dist` folder (or whatever you're calling it) and dependencies (`node_modules`).

```json title="tsconfig.json"
{
  "extends": "@tsconfig/node20/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "declaration": true,
    "sourceMap": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
}
```

## Linting and formatting

Why do we need two tools? Can't ESLint format our code too?

Sure, it has style rules - but it tends to perform better when checking for errors and code smells. Generally we want to think as little about formatting and code style as possible.

With an opinionated formatter like Prettier we remove all that mental overhead, and as a result get a code style that's reasonably consistent across our (and other) projects.

If you really feel strongly about a style choice, sparingly add the rule to your prettier config.

### ESLint

Install ESLint as a dev dependency and create a configuration. Happily there's a nice little tool to interactively create your ESLint config. The options I choose are outlined below.

```sh
pnpm i -D eslint

pnpm create @eslint/config

✔ How would you like to use ESLint? · To check syntax and find problems
✔ What type of modules does your project use? · JavaScript modules (import/export)
✔ Which framework does your project use? · None of these
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · Node
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · Yes
```

It'd be nice if it did this by default, but we can add type definitions to the ESLint config to get intellisense when making changes to it.

```js title=".eslintrc.cjs" ins={1}
/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
```

### Prettier

Install Prettier and the eslint config as dev dependencies.

```sh
pnpm i -D prettier eslint-config-prettier
```

The Prettier ESLint config disables some rules that can potentially conflict with Prettier's formatting rules. We need to extend our ESLint config with it like so.

```js title=".eslintrc.cjs" ins={10}
/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  r,
};
```

Now we can optionally create a configuration for Prettier if we want to override any of it's default rules. Be sure to add the type defs for intellisense on the config object.

```js title="prettier.config.cjs"
/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  arrowParens: "avoid",
};

module.exports = config;
```

You can optionally add the [`eslint-plugin-prettier``](https://github.com/prettier/eslint-plugin-prettier) so that Prettier is run _in_ ESLint and style issues are flagged as errors or warnings, but to me this is letting styling get in the way. Ideally we'll set up a CI job to ensure our code is formatted when we try to merge a PR.

Similarly, some folks set up git hooks to run formatting and linting on each push - I don't really dig blockers that prevent you from pushing. By all means, block on merge, but let me push my code.

### Add package scripts

We can configure scripts in our `package.json` so we can easily run our linter and formatter while developing or in CI. While we're at it let's add one for type checking too.

```json title="package.json" ins={8-10}
{
  "name": "modern-node-typescript",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.ts",
  "type": "module",
  "scripts": {
    "lint": "pnpm exec eslint ./src/** --fix",
    "format": "pnpm exec prettier . -w",
    "typecheck": "pnpm exec tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}
```

## Compilation, bundling, and a dev server

This is probably one of the more straightforward stages of our project setup.

We can leverage ESBuild for faster compilation and bundling than we'd get with the standard TypeScript compiler.

`tsx` allows us to run our code with ESBuild while in development without having to worry about the build step, and can even watch for changes to our files to restart/rerun automatically.

Install them as dev dependences

```sh
pnpm i -D esbuild tsx
```

Then add some scripts to the `package.json` and we're pretty much done!

```json title="package.json ins{8-9}"
{
  "name": "modern-node-typescript",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.ts",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "esbuild src/index.ts --bundle --packages=external --platform=node --format=esm --outdir=dist --sourcemap",
    "lint": "pnpm exec eslint ./src/** --fix",
    "format": "pnpm exec prettier . -w",
    "typecheck": "pnpm exec tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}
```

## What next?

Stay tuned, I'll update this with some github workflows for linting. I'd like to add a section for [`vitest`](https://vitest.dev/) too, but I want to play with the Node test runner before committing to it here.

Hopefully this is helpful to someone, it'll definitely be something I keep referencing and updating as I build out more projects.
