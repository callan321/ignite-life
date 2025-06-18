import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/rootlayout/RootLayout.tsx", [
    index("routes/home/Index.tsx"),
    route("About", "routes/about/Index.tsx"),
    route("Heather", "routes/heather/Index.tsx"),
  ]),
] satisfies RouteConfig;
