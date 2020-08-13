import React from 'react'
import { object, string } from 'prop-types'
import { ArticleJsonLd } from 'next-seo'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../..'
import { config } from '../../../../site.config'

const BlogPostPageLayout = ({ title, date, content, meta }) => (
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
