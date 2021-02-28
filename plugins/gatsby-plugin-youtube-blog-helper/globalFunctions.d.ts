import { BlogSlug, YouTubeSlug } from "./index";
export declare const toKebabCase: (str: string) => string | undefined;
export declare const replaceURLs: (message: string) => string | undefined;
declare type LinkObject = {
    title: string;
    link: string;
};
export declare const generateLinkFromPost: (slug: BlogSlug | YouTubeSlug | null) => LinkObject | null;
export {};
//# sourceMappingURL=globalFunctions.d.ts.map