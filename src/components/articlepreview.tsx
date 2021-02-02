import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
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
            previewImage: string;
        }
    }
}

type StaticQuery = {
    allFile: {
        nodes: Array<{
            relativePath: string;
            sourceInstanceName: string;
            childImageSharp: {
                fluid: FluidObject;
            };
        }>
    }
}

export default function ArticlePreview({ post }: Props) {
    // TODO: check to see if there's a solution to this: https://github.com/gatsbyjs/gatsby/issues/4123
    const allBlogImages = useStaticQuery<StaticQuery>(graphql`
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
    `);

    const previewImage = allBlogImages.allFile.nodes.find((f: { relativePath: string; }) => "/" + f.relativePath === (post.fields.slug + post.frontmatter?.previewImage))?.childImageSharp;

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
    );
}