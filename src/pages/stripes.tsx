import React, { useEffect, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Img, { FluidObject } from "gatsby-image";
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";

type StaticQuery = {
  allStripeImageDescriptionsYaml: {
    nodes: Array<ImageYaml>
  }
  allFile: {
    nodes: Array<ImageFile>
  }
}

type ImageYaml = {
  title: string;
  file: string;
  description: string;
  credit: string;
}

type ImageFile = {
  fileName: string;
  extension: string;
  childImageSharp?: {
    fluid: FluidObject;
  }
}

export default function Stripes() {
  const data = useStaticQuery<StaticQuery>(graphql`
    query StripesQuery {
      allStripeImageDescriptionsYaml {
        nodes {
          title
          file
          description
          credit
        }
      }
      allFile(filter: {relativeDirectory: {eq: "stripe-images"}}) {
        nodes {
          fileName: name
          extension
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)
  const [stripeSearch, setStripeSearch] = useState("");
  const [imageCount, setImageCount] = useState(40);

  const infiniteScroll = () => {
    if (window !== undefined) {
      // logic from https://stackoverflow.com/a/22394544
      var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      var scrollHeight = ((document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight) || document.body.scrollHeight;
      var almostScrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight - 300;
      if (almostScrolledToBottom)
        setImageCount(imageCount + 40)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => window.removeEventListener("scroll", infiniteScroll);
  });

  const imageFiles = data.allFile.nodes;
  const imageYamls = data.allStripeImageDescriptionsYaml.nodes;

  imageFiles.forEach(i =>
    !imageYamls.find(y => y.file === `${i.fileName}.${i.extension}`)
    && console.error(`File ${i.fileName}.${i.extension} does not have an assocaited Yaml description`))

  const combinedInfoView = imageYamls
    .map(y => ({
      ...y,
      ...imageFiles.find(i => `${i.fileName}.${i.extension}` === y.file),
    }))
    .slice(0, imageCount);

  return (
    <Layout>
      <SEO title="Stripes Gallery" />
      <div className="stripes-intro justify-content-center">
        <div className="max-width-wrapper pb-3">
          <h1>Stripes Gallery</h1>
          <p>Learn more <a href="https://www.youtube.com/watch?v=Y1U4YkNkoG0">here</a>, or <a href="https://forms.gle/ZdmkHRQkJkmd7ARc8" target="_blank">submit your own</a>!</p>
          <NewsletterForm>
            Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
          </NewsletterForm>
        </div>
      </div>
      <div className="stripe-search-container mb-2">
        <label htmlFor="stripeSearch">Stripe Search</label>
        <input
          className="stripe-search-input p-1"
          value={stripeSearch}
          onChange={e => setStripeSearch(e.currentTarget.value)}
          type="text"
          id="stripeSearch"
          name="stripeSearch" />
      </div>
      <div className="stripes-container">
        {combinedInfoView
          .filter(image => image.title && (image.title?.toLowerCase() || "").includes(stripeSearch.toLowerCase()))
          .map(image => (
            !image.childImageSharp
              ? console.error(`Image not found for Yaml: ${JSON.stringify(image)}`)
              : <div
                className="stripe-container position-relative"
                key={image.fileName}
                style={{
                  width: `${image.childImageSharp.fluid.aspectRatio * 350
                    }px`,
                  flexGrow: image.childImageSharp.fluid.aspectRatio * 350,
                }}
              >
                {<div className="image-description p-2 bg-dark">
                  <p className="text-light mb-1">{image.title}</p>
                  <p className="text-light mb-0">{image.description}</p>
                  {image.credit && <p className="text-light mb-0">Contributed By: {image.credit}</p>}
                </div>}
                <div
                  className="stripe-image-background"
                  style={{
                    paddingBottom: `${100 / image.childImageSharp.fluid.aspectRatio
                      }%`,
                  }}
                >
                  <div className="stripe-image">
                    <Img alt={image.title} fluid={image.childImageSharp.fluid} />
                  </div>
                </div>
              </div>
          ))}
      </div>
    </Layout >
  )
}
