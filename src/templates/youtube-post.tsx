import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { BlogSlug } from "../common/BlogSlug";
import { ChildImageSharpObject } from "../common/ChildImageSharpObject";
import { generateLinkFromPost, replaceURLs } from "../common/globalFunctions";
import { YouTubeSlug } from "../common/YouTubeSlug";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

type Props = {
  location: {
    pathname: string;
  }
  data: {
    youtubeVideo: {
      id: string;
      title: string;
      description: string;
      publishedAt: string;
      videoId: string;
      localThumbnail: ChildImageSharpObject;
    }
    previousBlog?: BlogSlug;
    nextBlog?: BlogSlug;
    previousVideo?: YouTubeSlug;
    nextVideo?: YouTubeSlug;
  }
}

const YouTubePostTemplate = ({ data, location }: Props) => {
  const video = data.youtubeVideo
  const { previousVideo, nextVideo, previousBlog, nextBlog } = data

  const image = video.localThumbnail.childImageSharp;

  const previousLink = generateLinkFromPost(previousBlog || previousVideo || null);
  const nextLink = generateLinkFromPost(nextBlog || nextVideo || null);

  return (
    <Layout>
      <SEO
        title={video.title}
        description={video.description}
        image={image?.resize}
        pathname={location.pathname}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="large-layout">
          <div className="youtube-iframe mt-2 mb-2">
            <iframe
              width="1920"
              height="1080"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              frameBorder="0"
              allowFullScreen />
          </div>
        </div>
        <header>
          <h1 itemProp="headline" className="headline medium-layout">{video.title}</h1>
          <p className="medium-layout">{video.publishedAt}</p>
        </header>
        <section
          className="mb-4 medium-layout"
          itemProp="articleBody">
          {video.description.split("\n")
            .map((d, i) => <p key={i} dangerouslySetInnerHTML={{ __html: replaceURLs(d) }} />)}
        </section>
        <hr />
        <div className="pt-3 pb-3 medium-layout">
          <NewsletterForm>
            Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
          </NewsletterForm>
        </div>
      </article>
      <hr />
      <nav className="blog-post-nav mt-5 mb-5 medium-layout">
        <h4>See More</h4>
        <ul>
          <li>
            {previousLink && (
              <Link to={previousLink.link} rel="prev">
                ← {previousLink.title}
              </Link>
            )}
          </li>
          <li className={nextLink && "mt-3"}>
            {nextLink && (
              <Link to={nextLink.link} rel="next">
                {nextLink.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default YouTubePostTemplate

export const pageQuery = graphql`
  query YouTubePostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    youtubeVideo(id: { eq: $id }) {
      title
      description
      publishedAt(formatString: "MMMM DD, YYYY")
      videoId
      localThumbnail {
        childrenImageSharp {
          fluid(maxWidth: 896) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    previousBlog: markdownRemark(id: { eq: $previousPostId }) {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
      nextBlog: markdownRemark(id: { eq: $nextPostId }) {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
      previousVideo: youtubeVideo(id: {eq: $previousPostId}) {
        title
      }
      nextVideo: youtubeVideo(id: {eq: $nextPostId}) {
        title
      }
  }
`
