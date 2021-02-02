import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticlePreview from "../components/articlepreview"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const summary = data.site.siteMetadata?.author.summary
  const images = data.allImageSharp.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <h1>{siteTitle}</h1>
      <p>{summary}</p>
      <h2 className="pt-3">Posts</h2>
      <ol className="ps-0" style={{ listStyle: `none` }}>
        {posts.map(post =>
          <ArticlePreview
            key={post.frontmatter.title}
            post={post}
            previewImage={images.find(i => i.fluid.originalName === post.frontmatter.previewImage)} />
        )}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          summary
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          previewImage
        }
      }
    }
    allImageSharp {
      nodes {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
          originalName
        }
      }
    }
  }
`
