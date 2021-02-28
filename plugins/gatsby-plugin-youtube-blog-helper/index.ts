import { FluidObject } from "gatsby-image";
import { generateLinkFromPost, replaceURLs, toKebabCase } from "./globalFunctions";

export type ChildImageSharpObject = {
  childImageSharp?: {
      fluid: FluidObject;
      resize: {
        src: string;
        width: string;
        height: string;
      }
  }
}

export type BlogSlug = {
    fields: {
      slug: string;
    }
    frontmatter: {
      title: string;
    }
  }

export type YouTubeSlug = {
    title: string;
}

export {
    toKebabCase,
    replaceURLs,
    generateLinkFromPost
};
