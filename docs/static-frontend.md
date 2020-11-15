# MKTS – Static Frontend (React)

Yaay! You just created a static frontend app with `mkts`. These are simple websites that contain fixed content and do
not need a server to run.

The following guide walks you through the directory structure of the project you just created.

## Directory structure

### src

This folder should contain all your Typescript-React source code. By default, it contains three (3) files:

-   **index.tsx**

    This file is the entry point to your app. During bundling, this is the file the bundler starts with.

-   **app.tsx**

    This file is start of your actual app. The boilerplate code is very minimal here. Hence, you are free to architect
    your app however you want.

-   **app.scss**

    This is the app-level stylesheet of your application. This file should ideally contain styles that are applied
    across the application. Page specific styles should be stored in stylesheets of those pages.

### dist

This folder contains the built sources and the index file for your app.

-   **index.html**

This is the default entry page to your application when it is loaded

-   **bundle.js**

This file is the built source file, created by the bundler tool. This file exists when you start up the bundler command

### .babelrc.js

Contains configurations for the [Babel](https://babeljs.io/) transpiler. Babel is a tool that transpiles (converts)
your ES6 Typescript-React source into ES5 which all browsers can execute. Normally, you’ll never have to edit this file.

### .eslintrc

Contains configurations for the [ESlint](https://eslint.org/) linter. ESlint is a tool that works in conjunction with
your IDE (Webstorm, VSCode, Atom, etc.) to highlight and reporting issues with ECMAScript compatible languages (i.e.
Javascript, Typescript). Normally, you’ll never have to edit this file.

### .gitignore

Contains a list of paths to be ignored by the Git versioning tool

### .prettierrc

Contains configuration for the [Prettier](https://prettier.io/) formatter. Prettier is a tool that reformats your code
according to specified rules. You can configure to break lines at specified widths, force semi colons, force double
quoted strings and lots more.

### index.d.ts

This is a typescript declarations file. This is used to declare global types for variables and functions that do not
have types. Not declaring a type for an object may cause the Typescript compiler to throw type errors.

### package.json

Contains project and dependency information used by [Yarn](https://yarnpkg.com/) or [NPM](http://npmjs.com/) package
managers.

### postcss.config.js

Contains configuration for [PostCSS](https://postcss.org/). PostCSS adds vendor prefixes to your CSS code. An example
is when you add the `:fullscreen` pseudo class, PostCSS will inject the `:webkit-full-screen` and `:ms-fullscreen`
pseudo classes into the final CSS file automatically. Normally, you’ll never have to edit this file.

### tsconfig.json

Contains configuration for the [Typescript](https://typescriptlang.org/) compiler. Normally, you’ll never have to edit
this file.

### webpack.common.js

Contains configuration for the [Webpack](https://webpack.js.org/) module bundler. Webpack is a tool that uses most of
the tools mentioned before, (Babel, PostCSS, ESlint, Typescript, etc) to bundle your source code into one or more JS
file(s) that you can include in your HTML (`dist/index.html`).

## Moving forward...

This section contains actions you can perform in your newly created project

### Starting Webpack in watch mode

As mentioned previously, Webpack is a module bundler and uses the other configured tools to bundle your source code and
assets into one or more files that you can include in your html. By starting webpack in watch mode, it will
automatically rebuild when you make a change in the source code.

To start webpack in watch mode, you can run either `yarn dev` or `npm run dev` at the project root. This starts a
daemon process that you can end using `Ctrl+C`.

### Building distribution files in production mode

In the previous section, webpack runs in watch mode, but it builds the files in development mode. In this mode, the
files will be much larger in size, since they contain a lot of assertion code. When you are ready to deploy, you need
to build in production mode.

To build in production mode, run `yarn build` or `npm run build` at the project root.

### Previewing

Webpack builds your source codes into a single `dist/bundle.js` file with an `dist/assets/` folder at the root of your
project. This file is already referenced in your `dist/index.html` file as a script tag.

To preview your app, open the `dist/index.html` file in your browser.

### Upgrading dependencies

`mkts` installs project with the last known stable major versions of dependencies. If you'd like to upgrade the
dependencies, you can use `yarn outdated` or `npm outdated` to find which dependencies need upgrading. Then you can use
`yarn upgrade` or `npm update` to run upgrade.
