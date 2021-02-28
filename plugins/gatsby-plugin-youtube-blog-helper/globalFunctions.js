"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLinkFromPost = exports.replaceURLs = exports.toKebabCase = void 0;
var toKebabCase = function (str) {
    var _a;
    return str && ((_a = str === null || str === void 0 ? void 0 : str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)) === null || _a === void 0 ? void 0 : _a.map(function (x) { return x.toLowerCase(); }).join('-'));
};
exports.toKebabCase = toKebabCase;
var replaceURLs = function (message) {
    if (!message)
        return;
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.replace(urlRegex, function (url) {
        var hyperlink = url;
        if (!hyperlink.match('^https?:\/\/')) {
            hyperlink = 'http://' + hyperlink;
        }
        return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + '</a>';
    });
};
exports.replaceURLs = replaceURLs;
var generateLinkFromPost = function (slug) {
    if (slug === null)
        return null;
    if (slug.hasOwnProperty("fields")) {
        var blogSlug = slug;
        return {
            title: blogSlug.frontmatter.title,
            link: blogSlug.fields.slug
        };
    }
    var youTubeSlug = slug;
    return {
        title: youTubeSlug.title,
        link: "/" + exports.toKebabCase(youTubeSlug.title)
    };
};
exports.generateLinkFromPost = generateLinkFromPost;
//# sourceMappingURL=globalFunctions.js.map