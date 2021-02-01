import React from "react"
import { Nav, Navbar } from "react-bootstrap"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

export default function Header() {
    const data = useStaticQuery(graphql`
        query HeaderQuery {
            avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
                childImageSharp {
                fixed(width: 50, height: 50, quality: 95) {
                    ...GatsbyImageSharpFixed
                    }
                }
            }
            site {
                siteMetadata {
                  author {
                    name
                    summary
                  }
                  social {
                    twitter
                  }
                }
              }
        }`)

    const avatar = data?.avatar?.childImageSharp?.fixed
    const author = data.site.siteMetadata?.author
    const social = data.site.siteMetadata?.social

    return (
        <Navbar className="header-container w-100 d-flex m-auto pt-3 pb-4" bg="none" expand="lg">
            <Link to="/">
                {avatar && (
                    <Image
                        fixed={avatar}
                        alt={author?.name || ``}
                        className="bio-avatar"
                        imgStyle={{
                            borderRadius: `50%`,
                        }}
                    />
                )}</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav>
                    <li class="nav-item">
                        <Link
                            className="nav-link"
                            to="/"
                            activeClassName="active">
                            Posts
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link
                            className="nav-link"
                            to="/newsletter"
                            activeClassName="active">
                            Newsletter
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link
                            className="nav-link"
                            to="/stripes"
                            activeClassName="active">
                            Stripes
                        </Link>
                    </li>
                </Nav>
                <a href={`https://twitter.com/${social?.twitter || ``}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                </a>
            </Navbar.Collapse>
        </Navbar>
    )
}