import { FluidObject } from "gatsby-image";
export declare type Post = {
    id: string;
    isYouTube: boolean;
    excerpt: string;
    html: string;
    fields: {
        slug: string;
    };
    frontmatter: {
        date: Date;
        title: string;
        description: string;
        titleImage?: ChildImageSharpObject;
    };
};
export declare type YouTubeNode = {
    id: string;
    isYouTube: boolean;
    html: string;
    publishedAt: Date;
    description?: string;
    title: string;
    localThumbnail?: ChildImageSharpObject;
};
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
export declare const toKebabCase: (str: string) => string | undefined;
export declare const replaceURLs: (message: string) => string;
declare type LinkObject = {
    title: string;
    link: string;
};
export declare const generateLinkFromPost: (slug: BlogSlug | YouTubeSlug | null) => LinkObject | null;
export declare const combineYouTubePostsAndBlogPosts: (youtubePosts: YouTubeNode[], blogPosts: Post[]) => Post[];
export {};
//# sourceMappingURL=index.d.ts.map