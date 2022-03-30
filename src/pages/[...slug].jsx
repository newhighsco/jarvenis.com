import React from 'react'
import { string } from 'prop-types'
import { sourcebitDataClient } from 'sourcebit-target-next'
import layouts from '../layouts'
import { getLayoutStaticProps } from '../layouts/utils'

const Page = props => {
  const { default: Layout } = layouts[props?.layout] || layouts.page

  return <Layout {...props} />
}

Page.propTypes = {
  layout: string
}

export async function getStaticProps({ params, locale }) {
  const slug = params?.slug.join('/')

  return await getLayoutStaticProps(slug, locale)
}

export async function getStaticPaths() {
  const paths = await sourcebitDataClient.getStaticPaths()

  return {
    paths: paths.filter(path => !['/', '/404'].includes(path)),
    fallback: false
  }
}

export default Page
