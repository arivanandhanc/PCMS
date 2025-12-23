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
  const [headerRaw, footerRaw] = await Promise.all([
    getHeader(),
    getFooter(),
  ]);

  // 🔽 Map CMS footer → UI footer (IMPORTANT)
  const footer = footerRaw
    ? {
        copyright: footerRaw.copyright,
        cta: footerRaw.cta?.map((item: any) => ({
          name: item.name,
          link: {
            href: item.link?.href,
            title: item.link?.title,
          },
        })),
      }
    : null;

  return (
    <html lang="en">
      <body>
        <div className="cs-layout">
          {headerRaw && <Header header={headerRaw} />}

          <main className="cs-layout__main">
            {children}
          </main>

          {footer && <Footer footer={footer} />}
        </div>
      </body>
    </html>
  );
}
