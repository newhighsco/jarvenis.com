import React from 'react'
import { object, string } from 'prop-types'
import { MDXRemote } from 'next-mdx-remote'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'

const PageLayout = ({ title, markdown, meta }) => (
  <PageContainer meta={meta}>
    <Section>
      <Heading align="center">{title}</Heading>
      <Prose align="center">
        <MDXRemote {...markdown} />
      </Prose>
    </Section>
  </PageContainer>
)

PageLayout.propTypes = {
  title: string,
  markdown: object,
  meta: object
}

export default PageLayout
