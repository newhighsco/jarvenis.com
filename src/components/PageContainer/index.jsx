import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import { node, object } from 'prop-types'
import React from 'react'

import Footer from '../Footer'
import Header from '../Header'

const PageContainer = ({ meta, children }) => (
  <ThemedPageContainer header={<Header />} footer={<Footer />}>
    <Meta
      {...meta}
      additionalLinkTags={[
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

PageContainer.propTypes = { meta: object, children: node }

export default PageContainer
export { PageContainer }
