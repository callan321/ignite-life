import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/RootLayout.tsx",
        [
            index("routes/home.tsx"),
            route("About", "routes/About.tsx"),
            route("heather", "routes/heather.tsx"),
        ])
] satisfies RouteConfig;
