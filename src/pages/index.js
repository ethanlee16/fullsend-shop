import React from "react"
import { Link, graphql } from "gatsby"

import ProductCard from "../components/product"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    allAirtable: { edges: products },
  },
}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="cf flex flex-wrap">
      {products.map(prod => (
        <ProductCard key={prod.node.recordId} product={prod} />
      ))}
    </div>

    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allAirtable {
      edges {
        node {
          recordId
          data {
            Price
            Name
            Images {
              localFiles {
                childImageSharp {
                  fixed(height: 100) {
                    base64
                    tracedSVG
                    aspectRatio
                    width
                    height
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    originalName
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
