import React from 'react'
import { array, object, string } from 'prop-types'
import { MDXRemote } from 'next-mdx-remote'
import { Prose } from '@newhighsco/chipset'
import BlogListing from '../components/BlogListing'
import Heading from '../components/Heading'
import PageContainer from '../components/PageContainer'
import Section from '../components/Section'

export const getCommonProps = ({ posts }) => ({
  posts: posts.sort((a, b) =>
    b.frontmatter?.date.localeCompare(a.frontmatter?.date)
  )
})

const BlogLayout = ({ title, markdown, meta, posts = [] }) => (
  <PageContainer meta={meta}>
    <Section size="desktopMedium">
      <Heading align="center">{title}</Heading>
      <Prose align="center">
        <MDXRemote {...markdown} />
      </Prose>
      <BlogListing posts={posts} />
    </Section>
  </PageContainer>
)

BlogLayout.propTypes = {
  title: string,
  markdown: object,
  meta: object,
  posts: array
}

export default BlogLayout
