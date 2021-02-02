import React from "react"
import Header from "../components/header"

const Layout = ({ location, title, children, fullLayout }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div
      className="global-wrapper"
      data-is-root-path={isRootPath}
      data-is-full-layout={!!fullLayout}
    >
      <Header title={title} />
      <main className="site-content" data-is-full-layout={!!fullLayout}>
        {children}
      </main>
      <footer>© {new Date().getFullYear()} Now You See It</footer>
    </div>
  )
}

export default Layout
