import React from "react"
import { Link } from "gatsby"

export default function ArticlePreview({ post }) {
    return (
        post && <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
        >
            <header>
                <h2>
                    <Link to={post.fields.slug} itemProp="url">
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
    )
}