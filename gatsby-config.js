const { combineYouTubePostsAndBlogPosts } = require("./plugins/gatsby-plugin-youtube-blog-helper");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `Now You See It`,
    author: {
      name: `Jack Nugent`,
      summary: `Media critic, software engineer, silly boy`,
    },
    description: `Media criticism that searches for meaning in unexpected places.`,
    siteUrl: `https://www.nowyouseeit.com`,
    social: {
      twitter: `jacknugent27`,
      youtube: `nowyouseeit`,
      patreon: `nowyouseeit`,
      reddit: `nowyouseeit`
    },
  },
  plugins: [
    `gatsby-plugin-youtube-blog-helper`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // The option defaults to true
        checkSupportedExtensions: false,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/stripe-gallery`,
        name: `stripeImageDescriptions`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/stripe-gallery/stripe-images`,
        name: `stripeImages`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark, allYoutubeVideo } }) =>
              combineYouTubePostsAndBlogPosts(allYoutubeVideo.nodes, allMarkdownRemark.nodes).map(post =>
                Object.assign({}, post.frontmatter, {
                  description: post.excerpt,
                  date: post.frontmatter.date,
                  url: site.siteMetadata.siteUrl + post.fields.slug,
                  guid: site.siteMetadata.siteUrl + post.fields.slug,
                  custom_elements: [{ "content:encoded": post.html }],
                })),
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                    nodes {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
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
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Now You See It",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/profile-pic.png`,
      },
    },
    {
      resolve: `gatsby-source-youtube-v2`,
      options: {
        channelId: "UCWTFGPpNQ0Ms6afXhaWDiRw",
        apiKey: process.env.GATSBY_YOUTUBE_API,
        maxVideos: 1000 // Defaults to 50
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: "https://nowyouseeit.us1.list-manage.com/subscribe/post?u=638bf16b8cac50f7b4e79c737&amp;id=a91812393e",
        timeout: 3500,
      },
    },
    "gatsby-plugin-catch-links",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
