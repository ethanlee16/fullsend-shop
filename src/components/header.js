import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Logo from "../images/fs-logo-full.png"

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `0.5rem`,
    }}
    className="sans-serif"
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
      className="flex flex-wrap items-center"
    >
      <h1 style={{ margin: 0 }} className="mb1">
        <Link
          to="/"
          style={{
            textDecoration: `none`,
          }}
        >
          <img className="mr4" src={Logo} style={{ maxWidth: "200px" }} />
        </Link>
      </h1>
      <div>
        <h2 className="mv0">Shattuck Market</h2>
        <p className="gray mv0">
          Get snacks, drinks, and more delivered same-day from Shattuck Market.
        </p>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
