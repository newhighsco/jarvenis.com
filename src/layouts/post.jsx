import React from 'react'
import { node, object } from 'prop-types'
import { ArticleJsonLd } from 'next-seo'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'
import { config } from '../../site.config'

const PostLayout = ({ frontMatter, children }) => {
  const { title, date, meta } = frontMatter

  return (
    <PageContainer
      meta={{
        ...meta,
        openGraph: {
          type: 'article',
          article: {
            publishedTime: date,
            section: 'Blog'
          }
        }
      }}
    >
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
              {new Date(date).toLocaleDateString(
                config.lang,
                config.dateFormat
              )}
            </time>
          }
        >
          {title}
        </Heading>
        <Prose>{children}</Prose>
      </Section>
    </PageContainer>
  )
}

PostLayout.propTypes = {
  frontMatter: object,
  children: node,
  meta: object
}

export default PostLayout
