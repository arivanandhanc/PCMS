import "@/app/globals.css";
import "@/compstyles/Layout.css";

import { getHeader, getFooter, initLivePreview } from "@/lib/contentstack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  const [header, footer] = await Promise.all([
    getHeader(),
    getFooter(),
  ]);

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
