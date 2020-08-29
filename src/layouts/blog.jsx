import React from 'react'
import { node, object } from 'prop-types'
import { Prose } from '@newhighsco/chipset'
import { BlogListing, Heading, PageContainer, Section } from '../components'
import { frontMatter as posts } from '../pages/blog/*.mdx'

const BlogLayout = ({ frontMatter, children }) => {
  const { title, meta } = frontMatter

  return (
    <PageContainer meta={meta}>
      <Section size="desktopMedium">
        <Heading align="center">{title}</Heading>
        <Prose align="center">{children}</Prose>
        <BlogListing posts={posts} />
      </Section>
    </PageContainer>
  )
}

BlogLayout.propTypes = {
  frontMatter: object,
  children: node
}

export default BlogLayout
