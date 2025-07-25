/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "auto",
  singleAttributePerLine: true,
  proseWrap: "always",
  plugins: ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
  tailwindFunctions: ["clsx", "cn"],
  tailwindStylesheet: "./app/app.css",
};
