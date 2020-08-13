import React from 'react'
import { string } from 'prop-types'
import { sourcebitDataClient } from 'sourcebit-target-next'
import pageLayouts from '../components/PageLayout'
import { getPageLayoutProps } from '../components/PageLayout/utils'

const Page = props => {
  const PageLayout = pageLayouts[props?._layout] || pageLayouts.default

  return <PageLayout {...props} />
}

Page.propTypes = {
  _layout: string
}

export async function getStaticProps({ params }) {
  const slug = params?.slug.join('/')

  return await getPageLayoutProps(slug)
}

export async function getStaticPaths() {
  const paths = await sourcebitDataClient.getStaticPaths()

  return {
    paths: paths.filter(path => !['/', '/404'].includes(path)),
    fallback: false
  }
}

export default Page
