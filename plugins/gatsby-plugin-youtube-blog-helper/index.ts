import { FluidObject } from "gatsby-image";

export type Post = {
  id: string;
  isYouTube: boolean;
  excerpt: string;
  html: string;
  fields: {
    slug: string;
  }
  frontmatter: {
    date: Date;
    title: string;
    description: string;
    titleImage?: {
      publicURL: string;
    };
  };
}

export type YouTubeNode = {
    id: string;
    isYouTube: boolean;
    html: string;
    publishedAt: Date;
    description?: string;
    title: string;
    localThumbnail?: ChildImageSharpObject;
}

export type ChildImageSharpObject = {
  publicURL?: string;
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

export const toKebabCase = (str: string) =>
    str && str
        ?.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.map(x => x.toLowerCase())
        .join('-');

export const replaceURLs = (message: string) => {
    if (!message) return "";
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
        var hyperlink = url;
        if (!hyperlink.match('^https?:\/\/')) {
            hyperlink = 'http://' + hyperlink;
        }
        return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>'
    });
}

type LinkObject = {
    title: string;
    link: string;
}

export const generateLinkFromPost = (slug: BlogSlug | YouTubeSlug | null ): LinkObject | null => {
    if (slug === null) return null;

    if(slug.hasOwnProperty("fields")) {
        const blogSlug = slug as BlogSlug;
        return {
            title: blogSlug.frontmatter.title,
            link: blogSlug.fields.slug
        } as LinkObject
    }

    const youTubeSlug = slug as YouTubeSlug
    return {
        title: youTubeSlug.title,
        link: "/" + toKebabCase(youTubeSlug.title)
    } as LinkObject
}

export const combineYouTubePostsAndBlogPosts = (youtubePosts: YouTubeNode[], blogPosts: Post[]): Post[] =>
  youtubePosts
    .map(v => (
      {
        id: v.id,
        isYouTube: true,
        fields: {
          slug: `/${toKebabCase(v.title)}/`
        },
        html: (v.description || "")
          .split("\n")
          .map(d => `<p> ${replaceURLs(d) } <p/>`)
          .join(""),
        frontmatter: {
          date: v.publishedAt,
          title: v.title,
          description: v.description,
          titleImage: {
            publicURL: v.localThumbnail?.publicURL
          }
        }
      } as Post))
    .concat(blogPosts)
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));