# Ignite Life Bowen Therapy

## Technology

- React 19
- React Router v7 (framework mode)
- TypeScript
- TailwindCSS
- Vite
- ESLint
- Prettier (with Tailwind plugin)

## Recommendations

### VS Code

.vscode/ folder is included to set up Visual Studio Code with:

- Format on save (Prettier)
- ESLint auto-fix
- Tailwind class sorting
- Recommended extensions

VS Code will prompt to apply these settings and install extensions automatically.

If you use another editor or want to use your own settings:
Just delete the .vscode/ folder.

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Known Issues

Console log error – safe to ignore:

```js
main.js:46 Uncaught Error
    at _.Nc (main.js:46:290)
    at oaa (main.js:64:239)
    at Re (main.js:63:172)
    at new _.G (main.js:286:2267)
    at new _.gB (common.js:139:2282)
    at Object.Uvb [as Dg] (search_impl.js:3:23)
    at search.js:3:536
```

This error is caused by an embedded third-party script from Google.

It does **not affect the app’s core functionality** and can be safely ignored for now.
