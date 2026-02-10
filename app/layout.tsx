import "@/app/globals.css";
import "@/compstyles/Layout.css";
import { getHeader, getFooter } from "@/lib/contentstack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

//this force dynamic have added to avoid static to serve duirng build
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode; // any react renderable content
}) 
{
  //used array detruction and parellel fetcing
  const [headerEntry, footerEntry] = await Promise.all([ getHeader(), getFooter(), ]);
  // sanitising fetched data using data normalization to maintain strict data to match ui
  const header = headerEntry? 
  {
      links_group: headerEntry.links_group? 
      {
            links: Array.isArray(headerEntry.links_group.links)
              ? headerEntry.links_group.links
              : headerEntry.links_group.links
              ? [headerEntry.links_group.links]
              : [],
          }
        : undefined,
    }
  : null;


  const footer = footerEntry
    ? {
        copyright: footerEntry.copyright,
        cta: footerEntry.cta,
      }
    : null;

    //line 10 calls a next function which ensures the suitable pages wil fit inside this, and by default /
  return (
    <html lang="en">
      <body>
        <div className="cs-layout">
          {header && <Header header={header} />}

          <main className="cs-layout__main">
            {children} 
          </main>

          {footer && <Footer footer={footer} />}
        </div>
      </body>
    </html>
  );
}
