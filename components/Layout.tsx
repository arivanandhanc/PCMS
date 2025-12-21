import "@/compstyles/Layout.css";

type LayoutProps = {
  header?: any;
  footer?: any;
  children: React.ReactNode;
};

const Layout = ({ header, footer, children }: LayoutProps) => {
  return (
    <div className="cs-layout">
      {header}
      <main className="cs-layout__main">{children}</main>
      {footer}
    </div>
  );
};

export default Layout;
