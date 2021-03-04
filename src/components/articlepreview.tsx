import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { Post } from "../pages";

export type Props = { post: Post }

export default function ArticlePreview({ post }: Props) {
    const titleImage = post.frontmatter.titleImage.childImageSharp;

    return (
        post &&
        <article
            className="post-list-item mt-2"
            itemScope
            itemType="http://schema.org/Article"
        >
            <hr />
            <header>
                <h2 className="mt-4">
                    <Link to={post.fields.slug} itemProp="url">
                        {titleImage && <Img className="mb-2" fluid={titleImage.fluid} />}
                        <div itemProp="headline">
                            <span className="title-container">{post.frontmatter.title || post.fields.slug}</span>
                            <span className="badge">{post.excerpt ? "Article" : "Video"}</span>
                        </div>
                    </Link>
                </h2>
                <small>{post.frontmatter.date}</small>
            </header>
            <section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: post.excerpt || "",
                    }}
                    itemProp="description"
                />
            </section>
        </article>
    );
}