import React from 'react'
import { array, object } from 'prop-types'
import urlJoin from 'url-join'
import dynamic from 'next/dynamic'
import { sourcebitDataClient } from 'sourcebit-target-next'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { Button, ButtonGroup } from '@newhighsco/chipset'
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
      <LiveStream href={socialLinks.youtube} darkMode />
    </Section>
    {!!videos.length && (
      <Section>
        <Heading as="h2" align="center">
          Latest videos
        </Heading>
        <VideoListing videos={videos} summary />
      </Section>
    )}
    {!!posts.length && (
      <Section alternate>
        <Heading as="h2" align="center">
          Latest updates
        </Heading>
        <BlogListing posts={posts} summary />
      </Section>
    )}
    {!!products.length && (
      <Section>
        <Heading as="h2" align="center">
          Merchandise
        </Heading>
        <ProductListing products={products} summary />
      </Section>
    )}
    <Section alternate>
      <Heading align="center">Community Hub</Heading>
      <ButtonGroup>
        <Button href={socialLinks.discord} target="_blank">
          Join us on Discord
        </Button>
      </ButtonGroup>
    </Section>
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
