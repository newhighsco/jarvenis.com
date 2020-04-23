import React from 'react'
import { object } from 'prop-types'
import urlJoin from 'url-join'
import { LogoJsonLd, SocialProfileJsonLd } from 'next-seo'
import { PageContainer } from '../components/PageContainer'
import { Heading } from '../components/Heading'
import { config, socialLinks } from '../../site.config'

import logoUrl from '../images/logo.jpg'

const HomePage = ({ meta }) => (
  <PageContainer meta={meta}>
    <SocialProfileJsonLd
      type="Organization"
      name={config.name}
      url={config.url}
      sameAs={[socialLinks.twitter]}
    />
    <LogoJsonLd url={config.url} logo={urlJoin(config.url, logoUrl)} />
    <Heading>
      News. <em>Guides.</em> Reviews
    </Heading>
    <Heading as="p" size="small" alternate>
      Coming soon
    </Heading>
  </PageContainer>
)

HomePage.propTypes = {
  meta: object
}

export async function getStaticProps() {
  return {
    props: {
      meta: {
        slug: '/',
        customTitle: true,
        title: config.title
      }
    }
  }
}

export default HomePage
