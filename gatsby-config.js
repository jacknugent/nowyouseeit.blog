require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Now You See It`,
    author: {
      name: `Jack Nugent`,
      summary: `Media analysis that searches for meaning in unexpected places`,
    },
    description: `A blog for Now You See It`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.app/`,
    social: {
      twitter: `jacknugent27`,
    },
  },
  plugins: [
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
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@robinmetral/gatsby-source-s3`,
      options: {
        aws: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION,
        },
        buckets: ["nowyouseeitstripes"],
        expiration: 120,
      },
    },
    {
      resolve: "gatsby-source-google-spreadsheets",
      options: {
        spreadsheetId: "1GDXpnoc8ywPVlpN2qzO1s6Qelv8U4qWtnjA5AluDNpg",
        apiKey: process.env.GOOGLE_SHEETS_API,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_API, // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    "gatsby-plugin-catch-links",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
