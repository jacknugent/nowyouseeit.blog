import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { BlogSlug } from "../common/BlogSlug";
import { ChildImageSharpObject } from "../common/ChildImageSharpObject";
import { generateLinkFromPost } from "../common/globalFunctions";
import { YouTubeSlug } from "../common/YouTubeSlug";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

type Props = {
  location: {
    pathname: string;
  }
  data: {
    site: {
      siteMetadata: {
        siteURL: string;
      }
    }
    markdownRemark: {
      fields: {
        slug: string;
      }
      id: string;
      excerpt: string;
      html: string;
      frontmatter: {
        title: string;
        date: string;
        description: string;
        titleImage?: ChildImageSharpObject;
        previewImage?: ChildImageSharpObject;
        youtubeLink: string;
      }
    }
    previousBlog?: BlogSlug;
    nextBlog?: BlogSlug;
    previousVideo?: YouTubeSlug;
    nextVideo?: YouTubeSlug;
  }
}

const BlogPostTemplate = ({ data, location }: Props) => {
  const post = data.markdownRemark
  const { previousBlog, nextBlog, previousVideo, nextVideo } = data

  const titleImage = data.markdownRemark.frontmatter.titleImage?.childImageSharp;
  const previewImage = data.markdownRemark.frontmatter.previewImage?.childImageSharp

  const image = titleImage || previewImage || null;

  const previousLink = generateLinkFromPost(previousBlog || previousVideo || null);
  const nextLink = generateLinkFromPost(nextBlog || nextVideo || null);

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image?.resize}
        pathname={location.pathname}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {titleImage && <Img className="mt-2 mb-2 large-layout" fluid={titleImage.fluid} />}
        {post.frontmatter.youtubeLink &&
          <div className="large-layout">
            <div className="youtube-iframe mt-2 mb-2">
              <iframe
                width="1920"
                height="1080"
                src={post.frontmatter.youtubeLink}
                frameBorder="0"
                allowFullScreen />
            </div>
          </div>}
        <header>
          <h1 itemProp="headline" className="headline medium-layout">{post.frontmatter.title}</h1>
          <p className="medium-layout">{post.frontmatter.date}</p>
        </header>
        <section
          className="mb-4 medium-layout"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
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
                ← {previousVideo.title}
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        titleImage {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
            fluid(maxWidth: 896) {
                ...GatsbyImageSharpFluid
                }
            }
          }
        previewImage {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
            fluid(maxWidth: 896) {
                ...GatsbyImageSharpFluid
                }
            }
          }
          youtubeLink
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
