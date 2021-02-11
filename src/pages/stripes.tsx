import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

type StaticQuery = {
  site: {
    siteMetadata: {
      title: string;
    }
  }
  allS3Object: {
    nodes: Array<{
      localFile?: {
        childImageSharp: {
          fluid: FluidObject;
        }
        name: string;
      }
    }>
  }
  allGoogleStripesSheet: {
    nodes: Array<{
      aWSFile: string;
      description?: string;
      name: string;
      credit?: string;
    }>
  }
}

export default function Stripes() {
  const data = useStaticQuery<StaticQuery>(graphql`
    query StripesQuery {
      allS3Object {
        nodes {
          localFile {
            childImageSharp {
              fluid(maxWidth: 700) {
                ...GatsbyImageSharpFluid
              }
            }
            name
          }
        }
      }
      allGoogleStripesSheet {
        nodes {
          aWSFile
          description
          name
          credit
        }
      }
    }
  `)
  const [stripeSearch, setStripeSearch] = useState("");

  const s3images = data.allS3Object.nodes
  const sheetRows = data.allGoogleStripesSheet.nodes

  const s3sheetCombined = s3images
    .filter(i => i.localFile != null)
    .map(i => {
      const s3SheetMatch = sheetRows.find(
        r => i.localFile.name === r.aWSFile
      )

      if (!s3SheetMatch)
        console.error(`Failed to find row in Google Sheet with name ${i.localFile.name}`)

      return {
        ...i,
        ...s3SheetMatch,
      }
    })

  return (
    <Layout fullLayout={true}>
      <SEO title="Stripes Gallery" />
      <div className="d-flex justify-content-center">
        <div className="max-width-wrapper pb-3">
          <h1>Stripes Gallery</h1>
          <p>Learn more <a href="https://www.youtube.com/watch?v=Y1U4YkNkoG0">here</a>, or <a href="https://forms.gle/ZdmkHRQkJkmd7ARc8" target="_blank">submit your own</a>!</p>
          <NewsletterForm>
            Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
          </NewsletterForm>
        </div>
      </div>
      <div className="d-flex flex-column w-25 mb-2">
        <label htmlFor="stripeSearch">Stripe Search</label>
        <input
          className="border border-dark p-1"
          value={stripeSearch}
          onChange={e => setStripeSearch(e.currentTarget.value)}
          type="text"
          id="stripeSearch"
          name="stripeSearch" />
      </div>
      <div className="stripes-container">
        {s3sheetCombined
          .filter(image => image.name.toLowerCase().includes(stripeSearch.toLowerCase()))
          .map(image => (
            <div
              className="stripe-container position-relative"
              key={image.aWSFile}
              style={{
                width: `${image.localFile.childImageSharp.fluid.aspectRatio * 350
                  }px`,
                flexGrow: image.localFile.childImageSharp.fluid.aspectRatio * 350,
              }}
            >
              {image.name &&
                <div className="image-description p-2 bg-dark">
                  <p className="text-light mb-1">{image.name}</p>
                  <p className="text-light mb-0">{image.description}</p>
                  {image.credit && <p className="text-light mb-0">Contributed By: {image.credit}</p>}
                </div>}
              <div
                className="stripe-image-background"
                style={{
                  paddingBottom: `${100 / image.localFile.childImageSharp.fluid.aspectRatio
                    }%`,
                }}
              >
                <div className="stripe-image">
                  <div className="d-none">{image.aWSFile}</div>
                  <Img alt={image.name} fluid={image.localFile.childImageSharp.fluid} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout >
  )
}
