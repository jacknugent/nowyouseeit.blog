import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsletterForm from "../components/newsletterform"

export default function Stripes({ location }) {
  const data = useStaticQuery(graphql`
    query StripesQuery {
      site {
        siteMetadata {
          title
        }
      }
      allS3Object {
        nodes {
          localFile {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
            url
          }
        }
      }
      allGoogleStripesSheet {
        nodes {
          aWSLink
          description
          name
          id
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const s3images = data.allS3Object.nodes
  const sheetRows = data.allGoogleStripesSheet.nodes

  const s3sheetCombined = s3images.map(i => ({
    ...i,
    ...sheetRows.find(
      r => new URL(r.aWSLink).pathname === new URL(i.localFile.url).pathname
    ),
  }))

  return (
    <Layout location={location} title={siteTitle} fullLayout={true}>
      <SEO title="Stripes Gallery" />
      <div className="d-flex justify-content-center">
        <div className="max-width-wrapper pb-3">
          <h1>Stripes Gallery</h1>
          <p>Learn more <a href="https://www.youtube.com/watch?v=Y1U4YkNkoG0">here</a>.</p>
          <NewsletterForm>
            Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting ad-free, algorithm-free media criticism.
          </NewsletterForm>
        </div>
      </div>
      <div className="stripes-container">
        {s3sheetCombined.map(image => (
          <div
            className="stripe-container position-relative"
            key={image.id}
            style={{
              width: `${image.localFile.childImageSharp.fluid.aspectRatio * 350
                }px`,
              flexGrow: image.localFile.childImageSharp.fluid.aspectRatio * 350,
            }}
          >
            <div className="image-description p-2 bg-dark w-100">
              <p className="text-light mb-1">{image.name}</p>
              <p className="text-light mb-0">{image.description}</p>
            </div>
            <div
              className="stripe-image-background"
              style={{
                paddingBottom: `${100 / image.localFile.childImageSharp.fluid.aspectRatio
                  }%`,
              }}
            >
              <div className="stripe-image">
                <Img fluid={image.localFile.childImageSharp.fluid} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout >
  )
}