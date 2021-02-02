import React from "react";
import Header from "./header";

type Props = {
  location: any;
  children: React.ReactChild;
  fullLayout?: boolean;
}

const Layout = ({ location, children, fullLayout }: Props) => {
  const isRootPath = location.pathname === "/"

  return (
    <div
      className="global-wrapper"
      data-is-root-path={isRootPath}
      data-is-full-layout={!!fullLayout}
    >
      <Header />
      <main className="site-content" data-is-full-layout={!!fullLayout}>
        {children}
      </main>
      <footer>© {new Date().getFullYear()} Now You See It </footer>
    </div>
  )
}

export default Layout
