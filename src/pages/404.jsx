import React from 'react'
import { object } from 'prop-types'
import Link from 'next/link'
import { SmartLink } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'

const NotFoundPage = ({ meta }) => (
  <PageContainer meta={meta}>
    <Section>
      <Link href="/" passHref>
        <SmartLink>
          <Heading>
            Page <em>not</em> found
          </Heading>
          <Heading as="p" size="small" alternate>
            Return to homepage
          </Heading>
        </SmartLink>
      </Link>
    </Section>
  </PageContainer>
)

NotFoundPage.propTypes = {
  meta: object
}

export async function getStaticProps() {
  return {
    props: {
      meta: {
        title: 'Page not found',
        description: 'Sorry, this page could not be found',
        noindex: true,
        nofollow: true
      }
    }
  }
}

export default NotFoundPage
