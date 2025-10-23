import { Button } from '@newhighsco/chipset'
import dynamic from 'next/dynamic'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { array, object } from 'prop-types'
import React from 'react'
import urlJoin from 'url-join'

import config from '../../site.config'
import Heading from '../components/Heading'
import PageContainer from '../components/PageContainer'
import ProductListing from '../components/ProductListing'
import Section from '../components/Section'
import SponsorListing from '../components/SponsorListing'
import VideoListing from '../components/VideoListing'
import { ReactComponent as DiscordIcon } from '../images/icons/discord.svg'

const { name, url, logo, socialLinks } = config

export const getCommonProps = ({ videos, products }) => ({
  videos: videos.slice(0, 4),
  products: products.slice(0, 4)
})

const LiveStream = dynamic(
  () => import('@newhighsco/chipset').then(({ LiveStream }) => LiveStream),
  { ssr: false }
)

const HomeLayout = ({ meta, videos = [], products = [] }) => {
  const hasVideos = !!videos.length
  const hasProducts = !!products.length

  return (
    <PageContainer meta={meta}>
      <SocialProfileJsonLd
        type="Organization"
        name={name}
        url={url}
        sameAs={[socialLinks.twitter]}
      />
      {logo?.bitmap && (
        <LogoJsonLd url={url} logo={urlJoin(url, logo.bitmap)} />
      )}
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
      {hasProducts && (
        <Section size="desktop" alternate>
          <Heading as="h2" align="center">
            Merchandise
          </Heading>
          <ProductListing products={products} summary />
        </Section>
      )}
      <Section size="desktopMedium">
        <Heading as="h2" align="center" icon={<DiscordIcon />}>
          Community Hub
        </Heading>
        <Button.Group>
          <Button href={socialLinks.discord} target="_blank">
            Join us on Discord
          </Button>
        </Button.Group>
      </Section>
      <Section size="desktopMedium" alternate highlight>
        <Heading as="h2" align="center">
          Sponsored by
        </Heading>
        <SponsorListing />
      </Section>
    </PageContainer>
  )
}

HomeLayout.propTypes = { meta: object, videos: array, products: array }

export default HomeLayout
