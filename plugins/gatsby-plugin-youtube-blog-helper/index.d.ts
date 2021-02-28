import { FluidObject } from "gatsby-image";
import { generateLinkFromPost, replaceURLs, toKebabCase } from "./globalFunctions";
export declare type ChildImageSharpObject = {
    childImageSharp?: {
        fluid: FluidObject;
        resize: {
            src: string;
            width: string;
            height: string;
        };
    };
};
export declare type BlogSlug = {
    fields: {
        slug: string;
    };
    frontmatter: {
        title: string;
    };
};
export declare type YouTubeSlug = {
    title: string;
};
export { toKebabCase, replaceURLs, generateLinkFromPost };
//# sourceMappingURL=index.d.ts.map