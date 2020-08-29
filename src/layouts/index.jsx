import React from 'react'
import { node, object } from 'prop-types'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'

export async function getStaticProps() {
  return { props: { foo: 'bar' } }
}

const DefaultLayout = ({ children, frontMatter, ...rest }) => {
  const { title, meta } = frontMatter

  return (
    <PageContainer meta={meta}>
      <Section size="desktopMedium">
        <Heading align="center">{title}</Heading>
        <Prose align="center">{children}</Prose>
        <pre>{JSON.stringify(rest, null, 2)}</pre>
      </Section>
    </PageContainer>
  )
}

DefaultLayout.propTypes = {
  frontMatter: object,
  children: node
}

export default DefaultLayout
