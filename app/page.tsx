// Importing function to fetch page data from Contentstack
import { getPage } from "@/lib/contentstack";

// Importing the Page component to render page content
import Page from "@/components/Page";

// Home page (Server Component)
export default async function Home() {
  // Fetch the home page entry (URL = "/")
  const page = await getPage("/");

  // Safety fallback (prevents blank screen)
  if (!page) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        ❌ No Page entry found for URL "/"
      </div>
    );
  }

  // Render UI (NOT JSON)
  return <Page page={page} />;
}
