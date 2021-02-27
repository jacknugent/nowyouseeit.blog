import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { Post } from "../pages";

export type Props = { post: Post }

export default function ArticlePreview({ post }: Props) {
    const previewImage = post.frontmatter.previewImage.childImageSharp;

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
                        {previewImage && <Img className="mb-2" fluid={previewImage.fluid} />}
                        <div itemProp="headline">
                            {post.frontmatter.title || post.fields.slug}
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