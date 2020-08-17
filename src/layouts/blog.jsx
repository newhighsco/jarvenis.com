import React from 'react'
import { array, object, string } from 'prop-types'
import { Prose } from '@newhighsco/chipset'
import { BlogListing, Heading, PageContainer, Section } from '../components'

export const getCommonProps = ({ posts }) => ({ posts })

const BlogLayout = ({ title, content, meta, posts = [] }) => (
  <PageContainer meta={meta}>
    <Section size="desktopMedium">
      <Heading align="center">{title}</Heading>
      <Prose html={content} align="center" />
      <BlogListing posts={posts} />
    </Section>
  </PageContainer>
)

BlogLayout.propTypes = {
  title: string,
  content: string,
  meta: object,
  posts: array
}

export default BlogLayout
