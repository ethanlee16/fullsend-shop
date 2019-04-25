import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import ProductCard from "../components/product"
import Layout from "../components/layout"
import SEO from "../components/seo"

import loadFullstory from "../utils/fullstory"

const IndexPage = ({
  data: {
    allAirtable: { edges: products },
  },
}) => {
  useEffect(() => {
    loadFullstory()
  }, [])
  const [cart, setCart] = useState({})

  const findRecForId = id => {
    const matches = products.filter(prod => prod.node.recordId === id)
    return matches.shift().node.data
  }

  const nonEmptyCart = Object.keys(cart).filter(rid => cart[rid])
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {nonEmptyCart.length > 0 ? (
        <div className="fixed left-0 bottom-0 bg-white z-1 w-100 shadow-2 ph4 pv2 tc">
          <h2 className="mv1">
            Cart{" "}
            <span className="blue">
              ($
              {nonEmptyCart
                .reduce(
                  (total, rid) => total + findRecForId(rid).Price * cart[rid],
                  0
                )
                .toFixed(2)}
              )
            </span>
          </h2>
          <p className="mv2">
            {nonEmptyCart
              .slice(0, 3)
              .map(
                rid =>
                  /* <span className="b mh1">{cart[rid]}</span> */
                  findRecForId(rid).Name
              )
              .join(", ")}
            {nonEmptyCart.length > 3
              ? `, and ${nonEmptyCart.length - 3} more ${
                  nonEmptyCart.length > 4 ? "items" : "item"
                }`
              : null}
          </p>
          <Link to="/checkout">
            <a className="f6 link dim br2 ph3 pv2 mb2 dib white bg-navy tc">
              Check out
            </a>
          </Link>
        </div>
      ) : null}

      <div className="cf flex flex-wrap justify-around">
        {products.map(prod => (
          <ProductCard
            key={prod.node.recordId}
            product={prod}
            onCartUpdate={() => {
              setCart(JSON.parse(localStorage.getItem("cart")))
            }}
          />
        ))}
      </div>
    </Layout>
  )
}

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
