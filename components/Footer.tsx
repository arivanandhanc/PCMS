import "@/compstyles/Footer.css";

type FooterProps = {
  footer: any;
};

const Footer = ({ footer }: FooterProps) => {
  return (
    <footer className="cs-footer">
      <p>{footer.copyright}</p>

      {footer.url && (
        <a href={footer.url}>
          {footer.url}
        </a>
      )}
    </footer>
  );
};

export default Footer;
