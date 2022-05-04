import React from 'react'
import { node, object } from 'prop-types'
import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import { Footer, Header } from '..'

const PageContainer = ({ meta, children }) => (
  <ThemedPageContainer header={<Header />} footer={<Footer />}>
    <Meta
      {...meta}
      additionalLinkTags={[
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'Feed',
          href: '/rss.xml'
        },
        ...[
          { path: 'primal', extension: 'woff' },
          { path: 'blender-pro', weight: 'bold' }
        ].map(({ path, weight = 'regular', extension = 'woff2' }) => ({
          rel: 'preload',
          href: `/fonts/${path}/${weight}.${extension}`,
          as: 'font',
          type: `font/${extension}`,
          crossOrigin: 'anonymous'
        }))
      ]}
    />
    {children}
  </ThemedPageContainer>
)

PageContainer.propTypes = {
  meta: object,
  children: node
}

export default PageContainer
export { PageContainer }
