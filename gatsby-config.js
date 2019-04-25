module.exports = {
  siteMetadata: {
    title: `Fullsend Shop`,
    description: `Same-day local delivery for small business`,
    author: `@FullsendDelivery`,
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        tables: [
          {
            baseId: `appYDeGxhK1CzEJt8`,
            tableName: `Products`,
            tableView: `Grid view`,
            mapping: { Images: "fileNode" },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
