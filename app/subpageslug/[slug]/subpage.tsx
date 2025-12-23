import { getPage } from "@/lib/contentstack";
import SubPage from "@/components/subpage";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ unwrap params FIRST
  const { slug } = await params;

  const url = `/subpage/${slug}`;

  const page = await getPage(url);

  if (!page) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        ❌ No Page entry found for URL "{url}"
      </div>
    );
  }
if (slug === "about-us") {
  return <SubPage page={page} />;
}
}
