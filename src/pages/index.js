import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const BlogIndex = ({ data }) => {
  return (
    <Img fluid={data.markdownRemark.image.childImageSharp.fluid}></Img>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    markdownRemark {
        frontmatter {
          image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
`
