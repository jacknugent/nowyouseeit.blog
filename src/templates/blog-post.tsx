import React from "react";
import { graphql, Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

type Props = {
  data: {
    allFile: {
      nodes: Array<{
        relativePath: string;
        sourceInstanceName: string;
        childImageSharp?: {
          fluid: FluidObject;
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

const BlogPostTemplate = ({ data }: Props) => {
  const post = data.markdownRemark
  const { previous, next } = data

  const previewImage = data.allFile.nodes.find(f => "/" + f.relativePath === (post.fields.slug + post.frontmatter?.titleImage))?.childImageSharp;

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {previewImage && <Img fluid={previewImage.fluid} />}
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
            Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting ad-free, algorithm-free media criticism.
          </NewsletterForm>
        </div>
      </article>
      <hr />
      <nav className="blog-post-nav">
        <h4>See More</h4>
        <ul className="d-flex flex-wrap justify-content-between list-unstyled p-0">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
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