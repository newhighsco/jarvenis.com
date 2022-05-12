import React from 'react'
import urlJoin from 'url-join'
import { object, string } from 'prop-types'
import { MDXRemote } from 'next-mdx-remote'
import { ArticleJsonLd } from 'next-seo'
import { Prose } from '@newhighsco/chipset'
import Heading from '../components/Heading'
import PageContainer from '../components/PageContainer'
import Section from '../components/Section'
import Timestamp from '../components/Timestamp'
import config from '../../site.config'
import { postsDir } from '../../next-rss'

const { name, shortName, url, logo } = config

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

const PostLayout = ({ locale, title, date, markdown, meta }) => (
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
      authorName={shortName}
      publisherName={name}
      publisherLogo={urlJoin(url, logo.bitmap)}
    />
    <Section size="desktopMedium">
      <Heading
        align="center"
        kicker={<Timestamp date={date} locale={locale} />}
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
  locale: string,
  title: string,
  date: string,
  markdown: object,
  meta: object
}

export default PostLayout
