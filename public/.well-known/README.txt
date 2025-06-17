TODO: Patch this workaround

Error: No route matches URL "/.well-known/appspecific/com.chrome.devtools.json"

Chrome DevTools triggers this request automatically.
This empty static file is a workaround to suppress the error.
Remove when React Router or Chrome stops requesting it.

See: https://github.com/remix-run/react-router/issues/13516
