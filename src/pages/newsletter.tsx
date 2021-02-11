import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string;
      }
    }
    allMarkdownRemark: {
      nodes: {
        fields: {
          slug: string;
        }
      }
    }
  }
}

export default function Newsletter({ data }: Props) {
  const post = data.allMarkdownRemark.nodes && data.allMarkdownRemark.nodes[0]

  return (
    <Layout>
      <SEO title="Newsletter" />
      <div className="mt-5">
        <NewsletterForm>
          Get access to Now You See It articles and videos by joining our newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
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