import React from 'react'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const SEO = () => {
  return (
    <StaticQuery
      query={query}
      render={({
        site: {
          siteMetadata: {
            defaultTitle,
            titleTemplate,
            defaultDescription,
            siteUrl,
            defaultImage
          }
        }
      }) => {
        return (
          <Helmet title={defaultTitle} titleTemplate={titleTemplate}>
            <html lang="en" />
            <title>{defaultTitle}</title>
            <description>{defaultDescription}</description>
            <meta name="description" content={defaultDescription} />
            <meta name="image" content={defaultImage} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={defaultTitle} />
            <meta property="og:description" content={defaultDescription} />
            <meta property="og:image" content={defaultImage} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={defaultTitle} />
            <meta name="twitter:description" content={defaultDescription} />
            <meta name="twitter:image" content={defaultImage} />
          </Helmet>
        )
      }}
    />
  )
}

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: siteUrl
        defaultImage: image
      }
    }
  }
`
