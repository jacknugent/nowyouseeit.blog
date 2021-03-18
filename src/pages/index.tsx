import React, { useState } from "react";
import { graphql } from "gatsby";
import { combineYouTubePostsAndBlogPosts, Post, YouTubeNode } from "../../plugins/gatsby-plugin-youtube-blog-helper";
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
      nodes: YouTubeNode[]
    }
  };
};

const BlogIndex = ({ data }: Props) => {
  const [postCount, setPostCount] = useState(10);

  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const summary = data.site.siteMetadata?.description;

  const posts = combineYouTubePostsAndBlogPosts(data.allYoutubeVideo.nodes, data.allMarkdownRemark.nodes);

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
        {postCount < posts.length &&
          <div className="load-more-button-container">
            <button className="load-more-button" onClick={() => setPostCount(postCount + 10)}>Load More</button>
          </div>}
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {draft: {ne: true}}}
      ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
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
