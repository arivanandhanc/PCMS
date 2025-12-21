import "@/compstyles/Header.css";

type HeaderProps = {
  header: any;
};

const Header = ({ header }: HeaderProps) => {
  const group = header?.links_group;

  const links = [
    group?.links,
    group?.link1,
  ].filter((link) => link?.href && link?.title);

  return (
    <header className="cs-header">
      <div className="cs-header__logo">
        {header?.logo?.url && (
          <img src={header.logo.url} alt={header.title} />
        )}
      </div>

      <nav className="cs-header__nav">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
