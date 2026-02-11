"use client";

import "@/compstyles/page.css";
import "@/compstyles/Footer.css";
import type { IFooter as FooterEntry } from "@/contentstack/generated";

import "@/compstyles/Layout.css";
type FooterProps = {
  footer: Pick<FooterEntry, "copyright" | "cta">;
};

const Footer = ({ footer }: FooterProps) => {
  return (
    <footer className="cs-footer">
      <div className="cs-footer__inner">
        {footer.copyright && (
          <p className="cs-footer__copyright">
            {footer.copyright}
          </p>
        )}

        {footer.cta?.length && (
          <ul className="cs-footer__links">
            {footer.cta.map((item, index) => (
              <li key={index}>
                {item.link && (
                  <a href={item.link.href}>
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
};

export default Footer;
