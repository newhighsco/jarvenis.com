import React from 'react'
import { array, object } from 'prop-types'
import dynamic from 'next/dynamic'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { Button } from '@newhighsco/chipset'
import {
  BlogListing,
  Heading,
  PageContainer,
  ProductListing,
  Section,
  VideoListing
} from '../components'
import { ReactComponent as DiscordIcon } from '../images/icons/discord.svg'
import { config, socialLinks } from '../../site.config'

export const getCommonProps = ({ videos, products, posts }) => ({
  videos: videos.slice(0, 4),
  products: products.slice(0, 4),
  posts: posts
    .sort((a, b) => b.frontmatter?.date.localeCompare(a.frontmatter?.date))
    .slice(0, 4)
})

const LiveStream = dynamic(
  () => import('@newhighsco/chipset').then(({ LiveStream }) => LiveStream),
  { ssr: false }
)

const HomeLayout = ({ meta, videos = [], products = [], posts = [] }) => {
  const hasVideos = !!videos.length
  const hasPosts = !!posts.length
  const hasProducts = !!products.length

  return (
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
      {hasVideos && (
        <Section>
          <Heading as="h2" align="center">
            Latest videos
          </Heading>
          <VideoListing videos={videos} summary />
        </Section>
      )}
      {hasPosts && (
        <Section alternate={hasVideos} size="desktopMedium">
          <Heading as="h2" align="center">
            Latest updates
          </Heading>
          <BlogListing posts={posts} summary />
        </Section>
      )}
      {hasProducts && (
        <Section size="desktop">
          <Heading as="h2" align="center">
            Merchandise
          </Heading>
          <ProductListing products={products} summary />
        </Section>
      )}
      <Section alternate={hasProducts} size="desktopMedium">
        <Heading as="h2" align="center" icon={<DiscordIcon />}>
          Community Hub
        </Heading>
        <Button.Group>
          <Button href={socialLinks.discord} target="_blank">
            Join us on Discord
          </Button>
        </Button.Group>
      </Section>
    </PageContainer>
  )
}

HomeLayout.propTypes = {
  meta: object,
  videos: array,
  products: array,
  posts: array
}

export default HomeLayout
