/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { Helmet } from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

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
  const { site } = useStaticQuery<StaticQueryProps>(
    graphql`
      query {
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

  const image = metaImage && metaImage.src
    ? `${site.siteMetadata.siteUrl}${metaImage.src}`
    : null

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
          metaImage
            ? [
              {
                property: "og:image",
                content: image,
              },
              {
                property: "og:image:width",
                content: metaImage.width,
              },
              {
                property: "og:image:height",
                content: metaImage.height,
              },
              {
                name: "twitter:card",
                content: "summary_large_image",
              },
            ]
            : [
              {
                name: "twitter:card",
                content: "summary",
              },
            ]
        )
        .concat(meta || [])}
    />
  )
}

export default SEO
