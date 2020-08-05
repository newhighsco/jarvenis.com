import React from 'react'
import { array, object } from 'prop-types'
import { sourcebitDataClient } from 'sourcebit-target-next'
import { BlogListing, Heading, PageContainer, Section } from '../../components'

const BlogListingPage = ({ meta, posts = [] }) => (
  <PageContainer meta={meta}>
    <Section>
      <Heading align="center">Latest updates from Jarv</Heading>
      <BlogListing posts={posts} />
    </Section>
  </PageContainer>
)

BlogListingPage.propTypes = {
  meta: object,
  posts: array
}

export async function getStaticProps() {
  const slug = '/blog'
  const { posts } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)

  return {
    props: {
      meta: { slug, title: 'Latest updates' },
      posts
    }
  }
}

export default BlogListingPage
