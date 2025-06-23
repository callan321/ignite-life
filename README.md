# Ignite Life Bowen Therapy

The frontend repository for Ignite Life Bowen Therapy

## Technology

- React 19
- React Router v7 (framework mode)
- TypeScript
- TailwindCSS
- Vite
- ESLint
- Prettier

## Recommendations

### VS Code

This project includes a `.vscode/` folder to improve the developer experience in Visual Studio Code.

#### Core Features

- Prettier + ESLint on save: Auto-format and auto-fix files when saving.
- No need to manually run `npm run lint` or `npm run format` — it's handled automatically in the editor.

#### Recommended Extensions (optional)

When you open the project in VS Code, it will prompt you to install a few recommended extensions that improve the development experience — including Tailwind CSS IntelliSense, class sorting, markdown preview/linting, auto-closing/renaming tags, and spell checking.

If you're using a different editor or prefer your own setup, you can safely remove or ignore the `.vscode/` folder. Just make sure to manually run `npm run lint` and `npm run format` before committing code.

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
