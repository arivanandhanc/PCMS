import "@/app/globals.css";
import "@/compstyles/Layout.css";

import { getHeader, getFooter } from "@/lib/contentstack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [headerEntry, footerEntry] = await Promise.all([
    getHeader(),
    getFooter(),
  ]);

  const header = headerEntry
    ? {
        links_group: headerEntry.links_group,
      }
    : null;

  const footer = footerEntry
    ? {
        copyright: footerEntry.copyright,
        cta: footerEntry.cta,
      }
    : null;

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
