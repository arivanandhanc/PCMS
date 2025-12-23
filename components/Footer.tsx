"use client";

import "@/compstyles/Footer.css";
import type { Footer as FooterEntry } from "@/contentstack/generated";

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
