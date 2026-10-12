/** @type {import('next').NextConfig} */

const zones = [
    { path: "/talent", url: process.env.TALENT_URL },
    { path: "/pulse", url: process.env.PULSE_URL },
    { path: "/aspire", url: process.env.ASPIRE_URL },
    { path: "/design-template", url: process.env.DESIGN_TEMPLATE_URL },
];

const nextConfig = {
    reactStrictMode: true,

    async rewrites() {
        return zones
            .filter((zone) => zone.url)
            .flatMap((zone) => [
                { source: zone.path, destination: `${zone.url}${zone.path}` },
                { source: `${zone.path}/:path*`, destination: `${zone.url}${zone.path}/:path*` },
            ]);
    },
};

module.exports = nextConfig;