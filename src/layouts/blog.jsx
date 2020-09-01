import React from 'react'
import { array, object, string } from 'prop-types'
import hydrate from 'next-mdx-remote/hydrate'
import { Prose } from '@newhighsco/chipset'
import { BlogListing, Heading, PageContainer, Section } from '../components'

export const getCommonProps = ({ posts }) => ({
  posts: posts.sort((a, b) =>
    b.frontmatter?.date.localeCompare(a.frontmatter?.date)
  )
})

const BlogLayout = ({ title, markdown, meta, posts = [] }) => {
  const content = hydrate(markdown)

  return (
    <PageContainer meta={meta}>
      <Section size="desktopMedium">
        <Heading align="center">{title}</Heading>
        <Prose align="center">{content}</Prose>
        <BlogListing posts={posts} />
      </Section>
    </PageContainer>
  )
}

BlogLayout.propTypes = {
  title: string,
  markdown: object,
  meta: object,
  posts: array
}

export default BlogLayout
