import React from 'react'
import { object, string } from 'prop-types'
import { sourcebitDataClient } from 'sourcebit-target-next'
import { Heading, PageContainer, Section } from '../../components'
import { config } from '../../../site.config'

const BlogPostPage = ({ title, date, content, meta }) => {
  return (
    <PageContainer meta={meta}>
      <Section>
        <Heading>{title}</Heading>
        <time dateTime={date}>
          {new Date(date).toLocaleDateString(config.lang)}
        </time>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Section>
    </PageContainer>
  )
}

BlogPostPage.propTypes = {
  title: string,
  date: string,
  content: string,
  meta: object
}

export async function getStaticProps({ params }) {
  const slug = '/blog/' + params?.slug?.join('/')
  const { page } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)
  const { title, date, content } = page

  return {
    props: {
      meta: { slug, title },
      title,
      date,
      content
    }
  }
}

export async function getStaticPaths() {
  const paths = await sourcebitDataClient.getStaticPaths()

  return {
    paths: paths.filter(path => path !== '/' && !path.startsWith('/blog/')),
    fallback: false
  }
}

export default BlogPostPage
