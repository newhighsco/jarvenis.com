import React from 'react'
import { array, bool, node, string } from 'prop-types'
import { NextSeo } from 'next-seo'

const Meta = ({
  children,
  canonical,
  customTitle,
  title,
  titleTemplate,
  description,
  images,
  ...rest
}) => {
  const meta = {
    title,
    titleTemplate: customTitle ? `%s` : titleTemplate,
    description,
    canonical,
    openGraph: {
      title,
      description,
      url: canonical,
      images
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
  canonical: string,
  customTitle: bool,
  title: string,
  titleTemplate: string,
  description: string,
  images: array
}

export default Meta
export { Meta }
