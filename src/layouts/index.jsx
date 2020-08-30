import React from 'react'
import { node, object } from 'prop-types'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'

const DefaultLayout = ({ children, frontMatter }) => {
  const { title, meta } = frontMatter

  return (
    <PageContainer meta={meta}>
      <Section size="desktopMedium">
        <Heading align="center">{title}</Heading>
        <Prose align="center">{children}</Prose>
      </Section>
    </PageContainer>
  )
}

DefaultLayout.propTypes = {
  frontMatter: object,
  children: node
}

export default DefaultLayout
