import React from "react";
import { Link } from "gatsby";
import Img, { FluidObject } from "gatsby-image";

type Props = {
    post: {
        excerpt: string;
        fields: {
            slug: string;
        }
        frontmatter: {
            title: string;
            date: Date;
            description: string;
            previewImage?: {
                childImageSharp?: {
                    fluid: FluidObject;
                    resize: {
                        src: string;
                        width: string;
                        height: string;
                    }
                }
            };
        }
    }
}

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
                        <span itemProp="headline">{post.frontmatter.title || post.fields.slug}</span>
                    </Link>
                </h2>
                <small>{post.frontmatter.date}</small>
            </header>
            <section>
                <p
                    dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                />
            </section>
        </article>
    );
}