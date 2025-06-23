# Ignite Life Bowen Therapy

The frontend repository for Ignite Life Bowen Therapy

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

VS Code will prompt to apply these settings and install extensions
automatically.

If you use another editor or want to use your own settings: Just delete the
.vscode/ folder.

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

### Chrome DevTools Issue – Temporary Patch in `/public`

**Error:**

```txt
No route matches URL "/.well-known/appspecific/com.chrome.devtools.json"
```

Chrome DevTools triggers this request automatically. React Router does not
handle this path by default.

**Temporary Fix:**  
An empty static file has been placed in the `public/.well-known/appspecific/`
folder as a workaround to suppress the error in the console.

You can **safely delete** this file once the issue is resolved in Chrome or
React Router.

**Reference:**  
[https://github.com/remix-run/react-router/issues/13516](https://github.com/remix-run/react-router/issues/13516)
