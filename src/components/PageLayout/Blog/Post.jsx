import React from 'react'
import { object, string } from 'prop-types'
import { ArticleJsonLd } from 'next-seo'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../..'
import { config } from '../../../../site.config'

const BlogPostPageLayout = ({ title, date, content, meta }) => (
  <PageContainer meta={meta}>
    <ArticleJsonLd
      url={meta.canonical}
      datePublished={date}
      title={title}
      description={meta.description}
      images={meta?.images?.map(image => image.url)}
      authorName={config.shortName}
      publisherName={config.name}
      publisherLogo={config.logo}
    />
    <Section size="desktopMedium">
      <Heading
        align="center"
        kicker={
          <time dateTime={date}>
            {new Date(date).toLocaleDateString(config.lang, config.dateFormat)}
          </time>
        }
      >
        {title}
      </Heading>
      <Prose html={content} />
    </Section>
  </PageContainer>
)

BlogPostPageLayout.propTypes = {
  title: string,
  date: string,
  content: string,
  meta: object
}

export default BlogPostPageLayout
