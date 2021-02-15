import React, { useEffect, useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Image from "gatsby-image";
import Patreon from "./icons/patreon";
import Reddit from "./icons/reddit";
import Twitter from "./icons/twitter";
import YouTube from "./icons/youtube";

export default function NavBar() {
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
                    reddit
                  }
                }
              }
        }`)
    const [isClicked, setIsClicked] = useState<boolean | null>(null);

    const handleClick = () => {
        document.body.style.overflow = isClicked ? "scroll" : "hidden";
        setIsClicked(!isClicked);
    }

    useEffect(() => {
        window.addEventListener("resize", () => setIsClicked(null))
        return () => window.removeEventListener("resize", () => setIsClicked(null));
    }, [])

    const avatar = data?.avatar?.childImageSharp?.fixed
    const author = data.site.siteMetadata?.author
    const social = data.site.siteMetadata?.social

    return (
        <div className="navbar-container">
            <Link to="/">
                {avatar && (
                    <Image
                        fixed={avatar}
                        alt={author?.name || ``}
                        className="bio-avatar mr-4"
                        imgStyle={{
                            borderRadius: `50%`,
                        }}
                    />
                )}</Link>
            <button onClick={handleClick} className="hamburger">
                <svg viewBox="0 0 100 80" width="30" height="30">
                    <rect width="90" height="7" rx="8"></rect>
                    <rect y="30" width="90" height="7" rx="8"></rect>
                    <rect y="60" width="90" height="7" rx="8"></rect>
                </svg>
            </button>
            <div
                className={`navbar-nav
                    ${isClicked === null
                        ? "hidden"
                        : isClicked
                            ? "active"
                            : "inactive"}`}>
                <div className="navbar-links">
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
                </div>
                <div className="icons-container">
                    <a className="icon-container" href={`https://youtube.com/${social?.youtube || ``}`} target="_blank" rel="noopener">
                        <YouTube />
                    </a>
                    <a className="icon-container" href={`https://patreon.com/${social?.patreon || ``}`} target="_blank" rel="noopener">
                        <Patreon />
                    </a>
                    <a className="icon-container" href={`https://twitter.com/${social?.twitter || ``}`} target="_blank" rel="noopener">
                        <Twitter />
                    </a>
                    <a className="icon-container" href={`https://reddit.com/r/${social?.reddit || ``}`} target="_blank" rel="noopener">
                        <Reddit />
                    </a>
                </div>
            </div>
        </div>
    )
}