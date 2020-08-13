import React from 'react'
import { array, object } from 'prop-types'
import dynamic from 'next/dynamic'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { Button, ButtonGroup } from '@newhighsco/chipset'
import {
  BlogListing,
  Heading,
  PageContainer,
  ProductListing,
  Section,
  VideoListing
} from '..'
import icons from '../../images/icons'
import { config, socialLinks } from '../../../site.config'

const DiscordSvg = icons('discord')

const LiveStream = dynamic(
  () => import('@newhighsco/chipset').then(module => module.LiveStream),
  { ssr: false }
)

export const getCommonProps = ({ videos, products, posts }) => ({
  videos: videos.slice(0, 4),
  products: products.slice(0, 4),
  posts: posts.slice(0, 4)
})

const HomePageLayout = ({ meta, videos = [], products = [], posts = [] }) => (
  <PageContainer meta={meta}>
    <SocialProfileJsonLd
      type="Organization"
      name={config.name}
      url={config.url}
      sameAs={[socialLinks.twitter]}
    />
    <LogoJsonLd url={config.url} logo={config.logo} />
    <Section size="desktopMedium">
      <LiveStream href={socialLinks.youtube} />
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
      <Section alternate size="desktopMedium">
        <Heading as="h2" align="center">
          Latest updates
        </Heading>
        <BlogListing posts={posts} summary />
      </Section>
    )}
    {!!products.length && (
      <Section size="desktop">
        <Heading as="h2" align="center">
          Merchandise
        </Heading>
        <ProductListing products={products} summary />
      </Section>
    )}
    <Section alternate size="desktopMedium">
      <Heading align="center" icon={<DiscordSvg />}>
        Community Hub
      </Heading>
      <ButtonGroup>
        <Button href={socialLinks.discord} target="_blank">
          Join us on Discord
        </Button>
      </ButtonGroup>
    </Section>
  </PageContainer>
)

HomePageLayout.propTypes = {
  meta: object,
  videos: array,
  products: array,
  posts: array
}

export default HomePageLayout
