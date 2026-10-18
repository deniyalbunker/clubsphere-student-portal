export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title: `${title} · ClubSphere MSOT` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} · ClubSphere MSOT` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
