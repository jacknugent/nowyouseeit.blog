import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default function ArticlePreview({ post }) {
    // TODO: check to see if there's a solution to this: https://github.com/gatsbyjs/gatsby/issues/4123
    const allBlogImages = useStaticQuery(graphql`
    query {
        allFile(filter: {sourceInstanceName: {eq: "blog"}, childImageSharp: {fixed: {width: {gt: 0}}}}) {
        nodes {
          relativePath
          sourceInstanceName
          childImageSharp {
            fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
                }
            }
          }
        }
      }
    `)

    const previewImage = allBlogImages.allFile.nodes.find(f => "/" + f.relativePath === (post.fields.slug + post.frontmatter?.previewImage))?.childImageSharp;
    console.log(previewImage);

    return (
        post &&
        <article
            className="post-list-item"
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
    )
}