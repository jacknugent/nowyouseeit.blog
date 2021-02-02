const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      image: String
    }
  `)
}
