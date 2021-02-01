import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children, fullLayout }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <body
      className="global-wrapper"
      data-is-root-path={isRootPath}
      data-is-full-layout={!!fullLayout}
    >
      <header
        className="global-header"
        data-is-full-layout={!!fullLayout}
      >
        <h1 className="heading">
          <Link to="/">{title}</Link>
        </h1>
      </header>
      <main className="site-content">{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </body>
  )
}

export default Layout
