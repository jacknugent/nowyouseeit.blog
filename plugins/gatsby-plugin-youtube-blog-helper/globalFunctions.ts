import { BlogSlug, YouTubeSlug } from "./index";

export const toKebabCase = (str: string) =>
    str && str
        ?.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        ?.map(x => x.toLowerCase())
        .join('-');

export const replaceURLs = (message: string) => {
    if (!message) return;
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