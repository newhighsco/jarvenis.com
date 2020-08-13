import React from 'react'
import { object, string } from 'prop-types'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '..'

const DefaultPageLayout = ({ title, content, meta }) => (
  <PageContainer meta={meta}>
    <Section>
      <Heading align="center">{title}</Heading>
      <Prose html={content} align="center" />
    </Section>
  </PageContainer>
)

DefaultPageLayout.propTypes = {
  title: string,
  content: string,
  meta: object
}

export default DefaultPageLayout
