import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string;
      }
    }
    allMarkdownRemark: {
      nodes: Array<Post>
    }
  }
}

type Post = {
  fields: {
    slug: string;
  }
}

const NotFoundPage = ({ data }: Props) => {
  const post = data.allMarkdownRemark.nodes && data.allMarkdownRemark.nodes[0]

  return (
    <Layout>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist. How about viewing my <a href={post.fields.slug}>latest post instead?</a></p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
{
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 1) {
    nodes {
      fields {
        slug
      }
    }
  }
}
`
