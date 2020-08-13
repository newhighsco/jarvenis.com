import React from 'react'
import { object } from 'prop-types'
import Link from 'next/link'
import { Prose, SmartLink } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'

const NotFoundPage = ({ meta }) => (
  <PageContainer meta={meta}>
    <Section>
      <Heading align="center">Page not found</Heading>
      <Prose align="center">
        <p>We’re sorry but we couldn’t find the page you were looking for</p>
        <p>
          Please try another address or{' '}
          <Link href="/" passHref>
            <SmartLink>return to homepage</SmartLink>
          </Link>
        </p>
      </Prose>
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
