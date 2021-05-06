import React from 'react'
import { object, string } from 'prop-types'
import { MDXRemote } from 'next-mdx-remote'
import { ArticleJsonLd } from 'next-seo'
import { Prose } from '@newhighsco/chipset'
import { Heading, PageContainer, Section } from '../components'
import { config } from '../../site.config'
import { postsDir } from '../../next-rss'

export const getPageProps = (slug, { frontmatter }) => {
  const { meta, title, date } = frontmatter

  return {
    postData: {
      id: slug.replace(`${postsDir}/`, ''),
      title: meta?.title || title,
      date
    }
  }
}

const PostLayout = ({ title, date, markdown, meta }) => (
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
            {new Date(date).toLocaleDateString(config.lang, config.dateFormat)}
          </time>
        }
      >
        {title}
      </Heading>
      <Prose>
        <MDXRemote {...markdown} />
      </Prose>
    </Section>
  </PageContainer>
)

PostLayout.propTypes = {
  title: string,
  date: string,
  markdown: object,
  meta: object
}

export default PostLayout
