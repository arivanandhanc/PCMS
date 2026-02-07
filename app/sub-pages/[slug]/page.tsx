export const dynamic = "force-dynamic";
import { getSubPage } from "@/lib/contentstack";
import SubPage from "@/components/SubPage";
import type { SubPages } from "@/contentstack/generated";

export default async function SubSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const url = `/${slug}`;

  const page: SubPages | null = await getSubPage(url);

  if (!page) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        No SubPage entry found
      </div>
    );
  }

  const pageProps = {
    title: page.title,
    group: page.group,
    quote: page.quote,
  };

  return <SubPage page={pageProps} />;
}
