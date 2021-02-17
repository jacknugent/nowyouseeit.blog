import React from "react";
import NavBar from "./navbar";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {

  return (
    <div className="global-wrapper">
      <NavBar />
      <main className="site-content">
        {children}
      </main>
      <footer>© {new Date().getFullYear()} Now You See It </footer>
    </div>
  )
}

export default Layout
