import { getSubPage } from "@/lib/contentstack";
import SubPage from "@/components/SubPage";
import type { SubPages } from "@/contentstack/generated";

export default async function SubSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ unwrap params FIRST
  const { slug } = await params;

  const url = `/${slug}`;

  const page: SubPages | null = await getSubPage(url);

  if (!page) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        ❌ No SubPage entry found
      </div>
    );
  }

  // ✅ shape data exactly like Page / Header / Footer pattern
  const pageProps = {
    title: page.title,
    group: page.group,
    quote: page.quote,
  };

  return <SubPage page={pageProps} />;
}
