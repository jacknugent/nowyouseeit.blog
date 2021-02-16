import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import ArticlePreview from "../components/articlepreview";
import Layout from "../components/layout";
import SEO from "../components/seo";

type Props = {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
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
  const [postCount, setPostCount] = useState(10);

  const infiniteScroll = () => {
    if (window !== undefined) {
      // logic from https://stackoverflow.com/a/22394544
      var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      var scrollHeight = ((document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight) || document.body.scrollHeight;
      var almostScrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight - 300;
      if (almostScrolledToBottom)
        setPostCount(postCount + 10)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  });

  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const summary = data.site.siteMetadata?.description;
  const posts = data.allMarkdownRemark.nodes;
  const postsView = posts.slice(0, postCount);

  return (
    <Layout>
      <SEO title="Posts" />
      <h1>{siteTitle}</h1>
      <p>{summary}</p>
      <ol className="ps-0" style={{ listStyle: `none` }}>
        {postsView?.map(post =>
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
        description
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
