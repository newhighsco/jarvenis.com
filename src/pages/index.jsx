import React from 'react'
import { array, object } from 'prop-types'
import urlJoin from 'url-join'
import dynamic from 'next/dynamic'
import { sourcebitDataClient } from 'sourcebit-target-next'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import {
  BlogListing,
  Heading,
  PageContainer,
  ProductListing,
  Section,
  VideoListing
} from '../components'
import { config, socialLinks } from '../../site.config'

import logoUrl from '../images/logo.jpg'

const LiveStream = dynamic(
  () => import('@newhighsco/chipset').then(module => module.LiveStream),
  { ssr: false }
)

const HomePage = ({ meta, videos = [], products = [], posts = [] }) => (
  <PageContainer meta={meta}>
    <SocialProfileJsonLd
      type="Organization"
      name={config.name}
      url={config.url}
      sameAs={[socialLinks.twitter]}
    />
    <LogoJsonLd url={config.url} logo={urlJoin(config.url, logoUrl)} />
    <Section>
      <Heading as="h2" alternate>
        Live
      </Heading>
      <LiveStream href={socialLinks.youtube} darkMode />
    </Section>
    {!!videos.length && (
      <Section alternate>
        <Heading as="h2">
          Latest <em>videos</em>
        </Heading>
        <VideoListing videos={videos} summary />
      </Section>
    )}
    {!!posts.length && (
      <Section>
        <Heading as="h2">
          Latest <em>updates</em>
        </Heading>
        <BlogListing posts={posts} summary />
      </Section>
    )}
    {!!products.length && (
      <Section alternate>
        <Heading as="h2">Merchandise</Heading>
        <ProductListing products={products} summary />
      </Section>
    )}
  </PageContainer>
)

HomePage.propTypes = {
  meta: object,
  videos: array,
  products: array,
  posts: array
}

export async function getStaticProps() {
  const slug = '/'
  const {
    videos,
    products,
    posts
  } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)

  return {
    props: {
      meta: {
        slug,
        customTitle: true,
        title: config.title
      },
      videos: videos.slice(0, 4),
      products: products.slice(0, 4),
      posts: posts.slice(0, 4)
    }
  }
}

export default HomePage
