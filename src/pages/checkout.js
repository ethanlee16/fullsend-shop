import React, { useState, useEffect } from "react"
import Script from "react-load-script"
import { Link, graphql } from "gatsby"
import moment from "moment"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Checkout = ({
  data: {
    allAirtable: { edges: products },
  },
}) => {
  const [cart, setCart] = useState({})
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")))
  }, [])
  const findRecForId = id => {
    const matches = products.filter(prod => prod.node.recordId === id)
    return matches.shift().node.data
  }
  const nonEmptyCart = Object.keys(cart).filter(rid => cart[rid])
  const price = nonEmptyCart.reduce(
    (total, rid) => total + findRecForId(rid).Price * cart[rid],
    0
  )
  let firstAvailDate = false

  if (finished) {
    return (
      <Layout>
        <SEO title="Something went wrong" />
        <div>
          <h1>Shattuck Market is temporarily closed</h1>
          <p className="gray">
            We received your order, but Shattuck Market is closed for deliveries
            right now. We'll text you when we can fulfill your order.
          </p>
        </div>
      </Layout>
    )
  }

  const hasPassed = moment().isAfter(
    moment()
      .hour(17)
      .minute(0)
      .second(0)
  )

  return (
    <Layout>
      <SEO title="Checkout" />
      <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbz1_Rjx_2zl1RK1v0WF_dtJjchE8P1Jk&libraries=places"
        onLoad={() => {
          const autocomplete = new window.google.maps.places.Autocomplete(
            document.getElementById("address"),
            {
              types: ["address"],
              strictBounds: new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(37.888391, -122.295042),
                new window.google.maps.LatLng(37.857824, -122.2525437)
              ),
            }
          )
        }}
      />
      <h1>Checkout</h1>
      {nonEmptyCart.map(rid => (
        <div className="flex justify-between mb1 items-center" key={rid}>
          <p className="mv0">
            <span className="b mr1">{cart[rid]}</span>
            {findRecForId(rid).Name}
          </p>
          <p className="blue b mv0">${findRecForId(rid).Price}</p>
        </div>
      ))}
      <div className="flex justify-between mv2">
        <p className="mv0 gray b">Delivery</p>
        <p className="mv0 b gray">$1.00</p>
      </div>
      <div className="flex justify-between mv2">
        <h3>Total</h3>
        <h3>${(price + 1).toFixed(2)}</h3>
      </div>
      <h1>Delivery</h1>
      <form
        className="black-80 w-100"
        autoComplete="off"
        onSubmit={async e => {
          e.preventDefault()
          const { name, phone, address, time } = e.target.elements
          await fetch("https://aspiring-delivery.glitch.me", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              address: address.value,
              phone: phone.value,
              time: time.value,
              cart: nonEmptyCart.reduce((obj, rid) => {
                obj[rid] = cart[rid]
                return obj
              }, {}),
            }),
          })
          setFinished(true)
        }}
      >
        <input type="hidden" autoComplete="off" value="off" />
        <div className="measure">
          <label className="f6 b db mb1">Name</label>
          <input
            className="input-reset ba b--black-20 pa2 mb3 db w-100"
            type="text"
            id="name"
          />
        </div>
        <div className="measure">
          <label className="f6 b db mb1">Phone Number</label>
          <input
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="tel"
            id="phone"
          />
          <small className="f6 black-60 db mb3">
            We'll use this for delivery status updates only.
          </small>
        </div>
        <div className="measure">
          <label className="f6 b db mb1">Address</label>
          <input
            className="input-reset ba b--black-20 pa2 mb3 db w-100"
            type="text"
            id="address"
            autoComplete="new-password"
          />
        </div>
        <div className="measure">
          <label className="f6 b db mb1">Delivery time</label>
          <select className="ba b--black-20 pa2 mb2 db w-100" id="time">
            {["7:00 PM", "8:00 PM", "9:00 PM"].map(time => {
              // const hasPassed = !moment()
              //   .add(2, "hours")
              //   .isBefore(`${new Date().toLocaleDateString()} ${time}`)
              let selected = false
              if (!firstAvailDate && !hasPassed) {
                firstAvailDate = true
                selected = true
              }
              return (
                <option
                  value={time}
                  key={time}
                  disabled={hasPassed}
                  selected={selected}
                >
                  {time}
                </option>
              )
            })}
            {hasPassed
              ? [
                  "7:00 PM (tomorrow)",
                  "8:00 PM (tomorrow)",
                  "9:00 PM (tomorrow)",
                ].map(time => (
                  <option value={time} key={time}>
                    {time}
                  </option>
                ))
              : null}
            <option value="asap" disabled={price < 20}>
              Within 30 minutes (minimum $20 order, +$6 delivery fee)
            </option>
          </select>
          <small className="f6 black-60 db mb3">
            Orders placed before 5 PM are eligible for same-day delivery. Orders
            placed after 5 PM will be delivered the next day.
          </small>
        </div>
        <div className="flex mt4">
          <button className="f6 link dim br2 ph3 pv2 mb2 dib white bg-green tc mr2 shadow-hover">
            Confirm order
          </button>
          <Link to="/">
            <button className="f6 link dim br2 ph3 pv2 mb2 dib white bg-navy tc">
              Edit cart
            </button>
          </Link>
        </div>
      </form>
    </Layout>
  )
}

export default Checkout

export const query = graphql`
  {
    allAirtable {
      edges {
        node {
          recordId
          data {
            Price
            Name
          }
        }
      }
    }
  }
`
