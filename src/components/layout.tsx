import React from "react";
import NavBar from "./navbar";

type Props = {
  children: React.ReactNode;
  fullLayout?: boolean;
}

const Layout = ({ children, fullLayout }: Props) => {

  return (
    <div className="global-wrapper" data-is-full-layout={!!fullLayout}>
      <NavBar />
      <main className="site-content" data-is-full-layout={!!fullLayout}>
        {children}
      </main>
      <footer>© {new Date().getFullYear()} Now You See It </footer>
    </div>
  )
}

export default Layout
