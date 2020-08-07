import React from 'react'
import { object, string } from 'prop-types'
import { ArticleJsonLd } from 'next-seo'
import { sourcebitDataClient } from 'sourcebit-target-next'
import { Heading, PageContainer, Section } from '../../components'
import { config } from '../../../site.config'

const BlogPostPage = ({ title, date, content, meta }) => {
  return (
    <PageContainer meta={meta}>
      <ArticleJsonLd
        url=""
        title={title}
        datePublished={date}
        dateModified={date}
        authorName={config.shortName}
        description=""
      />
      <Section size="desktopMedium">
        <Heading
          align="center"
          kicker={
            <time dateTime={date}>
              {new Date(date).toLocaleDateString(
                config.lang,
                config.dateFormat
              )}
            </time>
          }
        >
          {title}
        </Heading>
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
  const slug = `/blog/${params?.slug?.join('/')}`
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
    paths: paths.filter(path => path.startsWith('/blog/')),
    fallback: false
  }
}

export default BlogPostPage
