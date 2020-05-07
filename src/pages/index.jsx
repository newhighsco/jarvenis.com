import React from 'react'
import { array, object } from 'prop-types'
import urlJoin from 'url-join'
import { sourcebitDataClient } from 'sourcebit-target-next'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import {
  ContentContainer,
  Grid,
  GridItem,
  List,
  SmartLink,
  TwitchEmbed,
  ResponsiveMedia
} from '@newhighsco/chipset'
import { Heading } from '../components/Heading'
import { PageContainer } from '../components/PageContainer'
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
    <ContentContainer size="desktopMedium" gutter>
      <Heading as="h2" alternate>
        Live
      </Heading>
      <TwitchEmbed channel={config.twitterHandle} alwaysOnline />
    </ContentContainer>
    {!!videos.length && (
      <ContentContainer size="desktopMedium" gutter>
        <Heading as="h2">
          Latest <em>videos</em>
        </Heading>
        <List>
          {videos.map(({ id, heading }) => (
            <li key={id}>{heading}</li>
          ))}
        </List>
      </ContentContainer>
    )}
    {!!products.length && (
      <ContentContainer size="desktopMedium" gutter>
        <Heading as="h2">Merchandise</Heading>
        <Grid>
          {products.map(({ id, slug, href, heading, kicker, image, price }) => (
            <GridItem key={id} sizes={['one-half', 'tablet-one-quarter']}>
              <SmartLink href={href} target="_blank">
                <ResponsiveMedia>
                  <img src={image} alt="" />
                </ResponsiveMedia>
                {heading} {kicker} {slug}
                {price}
              </SmartLink>
            </GridItem>
          ))}
        </Grid>
      </ContentContainer>
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
