import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/rootlayout/root-layout.tsx", [
    index("routes/home/index.tsx"),
    route("About", "routes/about/index.tsx"),
    route("Heather", "routes/heather/index.tsx"),
  ]),
] satisfies RouteConfig;
