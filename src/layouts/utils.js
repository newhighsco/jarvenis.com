import { sourcebitDataClient } from 'sourcebit-target-next'
import urlJoin from 'url-join'
import renderToString from 'next-mdx-remote/render-to-string'
import { config } from '../../site.config'
import layouts from '.'
import { meta as defaultMeta } from '../content/index.md'

export const getLayoutStaticProps = async slug => {
  const {
    page,
    ...commonProps
  } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)
  const { frontmatter, markdown } = page
  const { meta, title, ...rest } = frontmatter
  const canonical = slug ? urlJoin(config.url, slug) : null
  const { getCommonProps } = layouts[frontmatter?.layout] || layouts.page
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
    markdown: await renderToString(markdown),
    ...rest,
    ...(getCommonProps ? getCommonProps(commonProps) : {})
  }

  return { props }
}
