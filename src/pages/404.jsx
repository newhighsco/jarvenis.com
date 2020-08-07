import React from 'react'
import { object } from 'prop-types'
import Link from 'next/link'
import { SmartLink } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'

const NotFoundPage = ({ meta }) => (
  <PageContainer meta={meta}>
    <Section>
      <Heading align="center">Page not found</Heading>
      <p>
        <Link href="/" passHref>
          <SmartLink>Return to homepage</SmartLink>
        </Link>
      </p>
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
