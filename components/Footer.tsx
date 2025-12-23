import "@/compstyles/Footer.css";

type FooterProps = {
  footer: {
    copyright: string;
    cta?: {
      name: string;
      link: {
        href: string;
        title?: string;
      };
    }[];
  };
};

const Footer = ({ footer }: FooterProps) => {
  return (
    <footer className="cs-footer">
      <div className="cs-footer__inner">
        {/* Left / Bottom: Copyright */}
        <p className="cs-footer__copyright">
          {footer.copyright}
        </p>

        {/* Right: Links */}
        {footer.cta && footer.cta.length > 0 && (
          <ul className="cs-footer__links">
            {footer.cta.map((item, index) => (
              <li key={index}>
                <a href={item.link.href}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
};

export default Footer;
