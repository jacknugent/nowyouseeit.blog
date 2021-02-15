import React from "react";
import { graphql, Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
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
    allFile: {
      nodes: Array<{
        relativePath: string;
        sourceInstanceName: string;
        childImageSharp?: {
          fluid: FluidObject;
          resize: {
            src: string;
            height: string;
            width: string;
          }
        }
      }>
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
        titleImage: string;
        previewImage: string;
      }
    }
    previous: {
      fields: {
        slug: string;
      }
      frontmatter: {
        title: string;
      }
    }
    next: {
      fields: {
        slug: string;
      }
      frontmatter: {
        title: string;
      }
    }
  }
}

const BlogPostTemplate = ({ data, location }: Props) => {
  const post = data.markdownRemark
  const { previous, next } = data

  const titleImage = data.allFile.nodes.find(f => "/" + f.relativePath === (post.fields.slug + post.frontmatter?.titleImage))?.childImageSharp;
  const previewImage = data.allFile.nodes.find(f => "/" + f.relativePath === (post.fields.slug + post.frontmatter?.previewImage))?.childImageSharp;
  const image = titleImage || previewImage || null;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={image.resize}
        pathname={location.pathname}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {titleImage && <Img fluid={titleImage.fluid} />}
        <header>
          <h1 itemProp="headline" className="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          className="mb-4"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <div className="pt-3 pb-3">
          <NewsletterForm>
            Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
          </NewsletterForm>
        </div>
      </article>
      <hr />
      <nav className="blog-post-nav mt-5 mb-5">
        <h4>See More</h4>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li className={next && "mt-3"}>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
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
    allFile(filter: {sourceInstanceName: {eq: "blog"}, childImageSharp: {fixed: {width: {gt: 0}}}}) {
      nodes {
        relativePath
        sourceInstanceName
        childImageSharp {
          resize(width: 1200) {
            src
            height
            width
          }
          fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
              }
          }
        }
      }
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
        titleImage
        previewImage
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
