import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/root-layout/root-layout.tsx", [
    index("routes/home/index.tsx"),
    route("about", "routes/about/index.tsx"),
    route("heather", "routes/heather/index.tsx"),
  ]),
] satisfies RouteConfig;
