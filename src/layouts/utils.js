import { sourcebitDataClient } from 'sourcebit-target-next'
import urlJoin from 'url-join'
import { serialize } from 'next-mdx-remote/serialize'
import config from '../../site.config'
import layouts from '.'
import { meta as defaultMeta } from '../content/index.md'

export const getLayoutStaticProps = async (slug, locale) => {
  const { page, ...commonProps } =
    await sourcebitDataClient.getStaticPropsForPageAtPath(slug)
  const { frontmatter, markdown } = page
  const { meta, title, ...rest } = frontmatter
  const canonical = !['/404'].includes(slug) ? urlJoin(config.url, slug) : null
  const { getCommonProps, getPageProps } =
    layouts[frontmatter?.layout] || layouts.page
  const props = {
    meta: {
      ...meta,
      canonical,
      title: meta?.title || title || defaultMeta?.title,
      description: meta?.description || defaultMeta?.description,
      ...(meta?.image && {
        images: [
          { url: urlJoin(config.url, require(`../../public/${meta.image}`)) }
        ]
      })
    },
    title,
    markdown: await serialize(markdown),
    locale,
    ...rest,
    ...(getPageProps ? getPageProps(slug, page) : {}),
    ...(getCommonProps ? getCommonProps(commonProps) : {})
  }

  return { props }
}
