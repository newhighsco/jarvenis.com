import React from 'react'
import { array, object } from 'prop-types'
import urlJoin from 'url-join'
import { sourcebitDataClient } from 'sourcebit-target-next'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { TwitchEmbed } from '@newhighsco/chipset'
import {
  Heading,
  PageContainer,
  ProductListing,
  Section,
  VideoListing
} from '../components'
import { config, socialLinks } from '../../site.config'

import logoUrl from '../images/logo.jpg'

const HomePage = ({ meta, videos = [], products = [] }) => (
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
      <TwitchEmbed channel={config.twitterHandle} theme="dark" />
    </Section>
    {!!videos.length && (
      <Section alternate>
        <Heading as="h2">
          Latest <em>videos</em>
        </Heading>
        <VideoListing videos={videos.slice(0, 4)} />
      </Section>
    )}
    {!!products.length && (
      <Section alternate>
        <Heading as="h2">Merchandise</Heading>
        <ProductListing products={products} />
      </Section>
    )}
  </PageContainer>
)

HomePage.propTypes = {
  meta: object,
  videos: array,
  products: array
}

export async function getStaticProps() {
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath('/')

  return {
    props: {
      meta: {
        slug: '/',
        customTitle: true,
        title: config.title
      },
      ...props
    }
  }
}

export default HomePage
