/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Script from "react-load-script"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
          className="sans-serif"
        >
          <main>{children}</main>
          <footer />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
           fbq('init', '2022541791380890'); 
          fbq('track', 'PageView');
        `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=2022541791380890&ev=PageView
&noscript=1"
          />
        </noscript>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window["_fs_debug"] = false
              window["_fs_host"] = "fullstory.com"
              window["_fs_org"] = "KNJE6"
              window["_fs_namespace"] = "FS"
              ;(function(m, n, e, t, l, o, g, y) {
                if (e in m) {
                  if (m.console && m.console.log) {
                    m.console.log(
                      'FullStory namespace conflict. Please set window["_fs_namespace"].'
                    )
                  }
                  return
                }
                g = m[e] = function(a, b, s) {
                  g.q ? g.q.push([a, b, s]) : g._api(a, b, s)
                }
                g.q = []
                o = n.createElement(t)
                o.async = 1
                o.src = "https://" + window._fs_host + "/s/fs.js"
                y = n.getElementsByTagName(t)[0]
                y.parentNode.insertBefore(o, y)
                g.identify = function(i, v, s) {
                  g(l, { uid: i }, s)
                  if (v) g(l, v, s)
                }
                g.setUserVars = function(v, s) {
                  g(l, v, s)
                }
                g.event = function(i, v, s) {
                  g("event", { n: i, p: v }, s)
                }
                g.shutdown = function() {
                  g("rec", !1)
                }
                g.restart = function() {
                  g("rec", !0)
                }
                g.consent = function(a) {
                  g("consent", !arguments.length || a)
                }
                g.identifyAccount = function(i, v) {
                  o = "account"
                  v = v || {}
                  v.acctId = i
                  g(o, v)
                }
                g.clearUserCookie = function() {}
              })(window, document, window["_fs_namespace"], "script", "user")
            })
            `,
          }}
        />
        <script
          type="text/javascript"
          src="https://downloads.mailchimp.com/js/signup-forms/popup/unique-methods/embed.js"
          data-dojo-config="usePlainJson: true, isDebug: false"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
            L.start({
              "baseUrl":"mc.us2.list-manage.com",
              "uuid":"1e290880b18142ef918562aaf",
              "lid":"1f9fd7feb4",
              "uniqueMethods":true
            })
          })`,
          }}
        />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
