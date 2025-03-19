import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layouts/RootLayout.tsx",
        [
            index("routes/Home.tsx"),
            route("About", "routes/About.tsx"),
            route("Heather", "routes/Heather.tsx"),
        ])
] satisfies RouteConfig;
