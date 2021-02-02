import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { graphql, Link, useStaticQuery } from "gatsby";
import Image from "gatsby-image";
import Patreon from "./icons/patreon";
import Twitter from "./icons/twitter";
import YouTube from "./icons/youtube";

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
                    patreon
                    youtube
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
            <Navbar.Toggle className="border-0" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/"
                            activeClassName="active">
                            Posts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/newsletter"
                            activeClassName="active">
                            Newsletter
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            to="/stripes"
                            activeClassName="active">
                            Stripes
                        </Link>
                    </li>
                </Nav>
                <div>
                    <a className="icon-container" href={`https://twitter.com/${social?.twitter || ``}`} target="_blank">
                        <YouTube />
                    </a>
                    <a className="icon-container" href={`https://patreon.com/${social?.patreon || ``}`} target="_blank">
                        <Patreon />
                    </a>
                    <a className="icon-container" href={`https://youtube.com/${social?.youtube || ``}`} target="_blank">
                        <Twitter />
                    </a>
                </div>
            </Navbar.Collapse>
        </Navbar >
    )
}