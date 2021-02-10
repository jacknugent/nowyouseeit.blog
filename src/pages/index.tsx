import React from "react";
import { graphql } from "gatsby";
import ArticlePreview from "../components/articlepreview";
import Layout from "../components/layout";
import SEO from "../components/seo";

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: {
          summary: string;
        };
      };
    };
    allMarkdownRemark: {
      nodes: Array<Post>
    }
  };
};

export type Post = {
  excerpt: string;
  fields: {
    slug: string;
  }
  frontmatter: {
    date: Date;
    title: string;
    description: string;
    previewImage: string;
  }
}

const BlogIndex = ({ data }: Props) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const summary = data.site.siteMetadata?.author.summary;

  return (
    <Layout>
      <SEO title="All posts" />
      <h1>{siteTitle}</h1>
      <p>{summary}</p>
      <ol className="ps-0" style={{ listStyle: `none` }}>
        {posts?.map(post =>
          <ArticlePreview key={post.frontmatter.title} post={post} />
        )}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

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
  }
`;
