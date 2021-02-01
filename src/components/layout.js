import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children, customLayout }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div
      className={!customLayout && "global-wrapper"}
      data-is-root-path={isRootPath}
    >
      <header
        className={
          customLayout ? "global-header-custom-layout" : "global-header"
        }
      >
        {header}
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
