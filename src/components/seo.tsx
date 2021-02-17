/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import { FixedObject } from "gatsby-image";

type Props = {
  title: string;
  description?: string;
  meta?: Array<any>;
  image?: {
    src: string;
    width: string;
    height: string;
  };
  pathname?: string;
}

type StaticQueryProps = {
  avatar: {
    childImageSharp: {
      fixed: FixedObject
    }
  }
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: {
        name: string;
        summary: string;
      }
      siteUrl: string;
      social: {
        twitter: string;
      }
    }
  }
}

const SEO = ({ description, meta, image: metaImage, title, pathname }: Props) => {
  const { avatar, site } = useStaticQuery<StaticQueryProps>(
    graphql`
      query {
        avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
          childImageSharp {
              fixed(width: 800, height: 800, quality: 100) {
                  ...GatsbyImageSharpFixed
              }
          }
        }
        site {
          siteMetadata {
            title
            description
            author {
              name
              summary
            }
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description;

  const image = metaImage || avatar.childImageSharp.fixed;

  const canonical = pathname
    ? `${site.siteMetadata.siteUrl}${pathname}`
    : null;

  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang: "en"
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      link={
        canonical
          ? [
            {
              rel: "canonical",
              href: canonical,
            },
          ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.social?.twitter || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          [
            {
              property: "og:image",
              content: `${site.siteMetadata.siteUrl}${image.src}`,
            },
            {
              property: "og:image:width",
              content: image.width.toString(),
            },
            {
              property: "og:image:height",
              content: image.height.toString(),
            },
            {
              name: "twitter:card",
              content: "summary_large_image",
            },
          ])
        .concat(meta || [])}
    />
  )
}

export default SEO
