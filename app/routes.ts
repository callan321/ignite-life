import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/rootlayout/RootLayout.tsx", [
    index("routes/home/Home.tsx"),
    route("About", "routes/about/About.tsx"),
    route("Heather", "routes/heather/Heather.tsx"),
  ]),
] satisfies RouteConfig;
