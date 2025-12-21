import { getPage } from "@/lib/contentstack";
import Page from "@/components/Page";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ unwrap params FIRST
  const { slug } = await params;

  const url = `/${slug}`;

  const page = await getPage(url);

  if (!page) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        ❌ No Page entry found for URL "{url}"
      </div>
    );
  }

  return <Page page={page} />;
}
