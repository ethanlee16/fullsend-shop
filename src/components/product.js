import React, { useState, useEffect } from "react"
import Img from "gatsby-image"

const ProductCard = ({ product, onCartUpdate }) => {
  const {
    node: {
      recordId,
      data: { Name, Price, Images },
    },
  } = product

  let cart
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    try {
      cart = JSON.parse(localStorage.getItem("cart"))
      if (!cart) {
        throw new Error()
      } else if (cart[recordId]) {
        setQuantity(cart[recordId])
      }
    } catch (e) {
      cart = { [recordId]: 0 }
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [])

  useEffect(() => {
    cart = JSON.parse(localStorage.getItem("cart"))
    cart[recordId] = quantity
    localStorage.setItem("cart", JSON.stringify(cart))
    onCartUpdate()
  }, [quantity])

  return (
    <div className="fl br2 ba dark-gray b--black-10 w-100 w-30-l w-40-m mr2 mb2 flex flex-column items-center justify-end">
      {Images &&
        Images.localFiles
          .slice(0, 1)
          .map(
            (file, i) =>
              file.childImageSharp && (
                <Img
                  key={i}
                  className="center mt2"
                  fixed={file.childImageSharp.fixed}
                  style={{ display: "block" }}
                />
              )
          )}
      <div className="pa2 ph3-ns pb3-ns w-100">
        <div className="dt w-100 mv2">
          <div className="dtc tc">
            <h1 className="f5 f5-ns mv0">{Name}</h1>
            <h2 className="f6 mv1 mid-gray">${Price}</h2>
          </div>
        </div>
        {quantity === 0 ? (
          <a
            className="f6 link dim br2 ph3 pv2 mb2 dib white bg-navy w-100 tc"
            onClick={() => setQuantity(quantity + 1)}
          >
            Add to cart
          </a>
        ) : (
          <div className="flex items-center justify-center">
            <a
              className="db link br2 ph3 pv2 white bg-navy b dim"
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </a>
            <h2 className="f6 w-50 tc">{quantity} added</h2>
            <a
              className="db link br2 ph3 pv2 white bg-navy b dim"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
