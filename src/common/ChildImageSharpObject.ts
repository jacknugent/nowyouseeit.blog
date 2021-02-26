import { FluidObject } from "gatsby-image";

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