import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { ChildImageSharpObject } from "../common/ChildImageSharpObject";
import { toKebabCase } from "../common/globalFunctions";
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
    allYoutubeVideo: {
      nodes: {
        id: string;
        publishedAt: Date;
        description: string;
        title: string;
        localThumbnail: ChildImageSharpObject;
      }[]
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
    previewImage?: ChildImageSharpObject;
  };
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

  const youtubePosts = data.allYoutubeVideo.nodes
    .map(v => (
      {
        excerpt: v.description,
        fields: {
          slug: `/${toKebabCase(v.title)}/`
        },
        frontmatter: {
          date: v.publishedAt,
          title: v.title,
          description: v.description,
          previewImage: v.localThumbnail
        }
      } as Post));

  const posts = youtubePosts
    .concat(data.allMarkdownRemark.nodes)
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));

  // const posts = data.allMarkdownRemark.nodes;
  const postsView = posts.slice(0, postCount);

  return (
    <Layout>
      <SEO title="Posts" />
      <div className="medium-layout">
        <h1>{siteTitle}</h1>
        <p>{summary}</p>
        <div className="ps-0" style={{ listStyle: `none` }}>
          {postsView?.map(post =>
            <ArticlePreview key={post.frontmatter.title} post={post} />
          )}
        </div>
      </div>
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
        }
      }
    }
    allYoutubeVideo(
      sort: { fields: publishedAt, order: ASC }
      limit: 1000,
      ) {
      nodes {
        description
        publishedAt(formatString: "MMMM DD, YYYY")
        title
        localThumbnail {
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
      }
    }
  }
`;
