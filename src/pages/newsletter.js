import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsletterForm from "../components/newsletterform"

export default function Newsletter({ data, location }) {
    const siteTitle = data.site.siteMetadata.title
    const post = data.allMarkdownRemark.nodes && data.allMarkdownRemark.nodes[0]

    return (
        <Layout location={location} title={siteTitle}>
            <SEO title="Newsletter" />
            <div className="mt-5">
                <NewsletterForm>
                    Get access to Now You See It articles and videos by joining our newsletter. No spam, ever. Enter your email to join hundreds of others getting ad-free, algorithm-free media criticism.
                </NewsletterForm>
                <p>Not convinced? See if you like our <a href={post.fields.slug}>latest post.</a></p>
            </div>
        </Layout>
    )
}

export const pageQuery = graphql`
{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1) {
    nodes {
      fields {
        slug
      }
    }
  }
}
`