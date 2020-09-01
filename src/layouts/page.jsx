import React from 'react'
import { object, string } from 'prop-types'
import hydrate from 'next-mdx-remote/hydrate'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'

const PageLayout = ({ title, markdown, meta }) => {
  const content = hydrate(markdown)

  return (
    <PageContainer meta={meta}>
      <Section>
        <Heading align="center">{title}</Heading>
        <Prose align="center">{content}</Prose>
      </Section>
    </PageContainer>
  )
}

PageLayout.propTypes = {
  title: string,
  markdown: object,
  meta: object
}

export default PageLayout
