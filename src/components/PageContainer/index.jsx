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
        ...['big-noodle-titling', 'lemon-milk'].map(font => ({
          rel: 'preload',
          href: `/fonts/${font}/regular.woff2`,
          as: 'font',
          type: 'font/woff2',
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
