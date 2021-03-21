import React, { useEffect, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { FluidObject } from "gatsby-image";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import Layout from "../components/layout";
import NewsletterForm from "../components/newsletterform";
import SEO from "../components/seo";
import useOnOutsideClick from "../hooks/useOnOutsideClick";
import ReactDOM from "react-dom";
import useStateRef from "../hooks/useStateRef";

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
    gatsbyImageData: IGatsbyImageData;
    fluid: FluidObject;
  }
}

type StripeImage = ImageFile & ImageYaml;

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
            gatsbyImageData(
              layout: FULL_WIDTH
              quality: 100)
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)
  const [scrollTop, setScrollTop] = useState(0);
  const [showDetails, setShowDetails, showDetailsRef] = useStateRef(-1);
  const [domImageIndexes, setDomImageIndexes, domImageIndexesRef] = useStateRef<number[]>([]);
  const documentEls = useRef<(HTMLDivElement | null)[]>([]);
  const stripeContainerRef = useRef(null);
  useOnOutsideClick(stripeContainerRef, () => setShowDetails(-1));

  const handleDomRecycle = () => {
    var domIndexes = [...domImageIndexesRef.current];
    console.log(domIndexes);
    documentEls?.current.forEach((d, i) => {
      if (d) {
        const inDomRange = (d.getBoundingClientRect().top + d.clientHeight) > -300 && d.getBoundingClientRect().bottom < window.innerHeight + d.clientHeight + 300;

        if (inDomRange) {
          if (!domIndexes.includes(i)) {
            domIndexes.push(i);
          }
          return;
        }
        if (domIndexes.includes(i))
          domIndexes.splice(domIndexes.indexOf(i), 1);
      }
    });
    setDomImageIndexes(domIndexes);
  }

  useEffect(() => {
    handleDomRecycle();
  }, [scrollTop])

  const debounce = (func: (param?: any) => void, wait: number, immediate?: boolean) => {
    var timeout: NodeJS.Timeout;
    return function () {
      var context = this, args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  useEffect(() => {
    handleDomRecycle();
    window.addEventListener("scroll", debounce(() => setScrollTop(document.documentElement.scrollTop), 100));
    window.addEventListener("resize", debounce(() => setScrollTop(document.documentElement.scrollTop), 100));

    return () => {
      window.removeEventListener("scroll", debounce(() => setScrollTop(document.documentElement.scrollTop), 100));
      window.removeEventListener("resize", debounce(() => setScrollTop(document.documentElement.scrollTop), 100));
    }
  }, []);

  const imageFiles = data.allFile.nodes;
  const imageYamls = data.allStripeImageDescriptionsYaml.nodes;
  imageFiles.forEach(i =>
    !imageYamls.find(y => y.file === `${i.fileName}.${i.extension}`)
    && console.error(`File ${i.fileName}.${i.extension} does not have an assocaited Yaml description`));
  const images = imageYamls
    .map(y => ({
      ...y,
      ...imageFiles.find(i => `${i.fileName}.${i.extension}` === y.file),
    })) as StripeImage[];

  return (
    <Layout>
      <SEO title="Stripes Gallery" />
      <div className="stripes-intro justify-content-center">
        <div className="max-width-wrapper pb-3">
          <h1>Stripes Gallery</h1>
          <p>Click each image for details.</p>
          <p>Learn more <a href="https://www.youtube.com/watch?v=Y1U4YkNkoG0">here</a>, or <a href="https://forms.gle/ZdmkHRQkJkmd7ARc8" target="_blank">submit your own</a>!</p>
          <NewsletterForm>
            Like what you See? You can get more articles and videos by joining the Now You See It newsletter. No spam, ever. Enter your email to join hundreds of others getting algorithm-free media criticism.
          </NewsletterForm>
        </div>
      </div>
      {images.map((image, i) =>
        domImageIndexes.includes(i) &&
        <div key={i} className={`${showDetailsRef.current === i && "show"} image-description p-2 bg-dark`}>
          <p className="text-light mb-1">{image.title}</p>
          <p className="text-light mb-0">{image.description}</p>
          {image.credit && <p className="text-light mb-0">Contributed By: {image.credit}</p>}
        </div>)}
      <div ref={stripeContainerRef} className="position-relative stripes-container">
        {images
          .map((image, i) => {
            const aspectRatio = image.childImageSharp.gatsbyImageData.width / image.childImageSharp.gatsbyImageData.height
            return (
              !image.childImageSharp
                ? console.log(`Image not found for Yaml: ${JSON.stringify(image)}`)
                : <button
                  onClick={() => setShowDetails(showDetails !== i ? i : -1)}
                  className="stripe-container"
                  key={image.fileName}
                  style={{
                    width: `${aspectRatio * 350}px`,
                    flexGrow: aspectRatio * 350,
                  }}
                >
                  <div
                    className="stripe-image-background"
                    id={`stripeImage${i}`}
                    ref={(element) => { !documentEls.current.includes(element) && documentEls.current.push(element) }}
                    style={{
                      paddingBottom: `${100 / aspectRatio}%`
                    }}>
                    {domImageIndexes.includes(i) &&
                      <div
                        className="stripe-image">
                        <GatsbyImage alt={image.title} image={image.childImageSharp.gatsbyImageData} />
                      </div>}
                  </div>
                </button>
            )
          })}
      </div>
    </Layout >
  )
}
