import React from 'react'
import { bool, node, string } from 'prop-types'
import urlJoin from 'url-join'
import { NextSeo } from 'next-seo'
import { config } from '../../../site.config'

const Meta = ({
  children,
  slug,
  customTitle,
  title,
  titleTemplate,
  description,
  image,
  ...rest
}) => {
  const canonical = slug ? urlJoin(config.url, slug) : null
  const meta = {
    title,
    titleTemplate: customTitle ? `%s` : titleTemplate,
    description,
    canonical,
    openGraph: {
      title,
      description,
      url: canonical,
      images: image ? [{ url: urlJoin(config.url, image) }] : null
    }
  }

  return (
    <>
      <NextSeo {...meta} {...rest} />
      {children}
    </>
  )
}

Meta.propTypes = {
  children: node,
  slug: string,
  customTitle: bool,
  title: string,
  titleTemplate: string,
  description: string,
  image: string
}

export default Meta
export { Meta }
