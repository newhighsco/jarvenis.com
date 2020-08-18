import { sourcebitDataClient } from 'sourcebit-target-next'
import urlJoin from 'url-join'
import { config } from '../../site.config'
import layouts from '.'
import { meta as defaultMeta } from '../content/index.md'

export const getLayoutStaticProps = async slug => {
  const {
    page,
    ...commonProps
  } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)
  const { meta, title, __metadata, ...rest } = page
  const canonical = slug ? urlJoin(config.url, slug) : null
  const { getCommonProps } = layouts[page?.layout] || layouts.default
  const props = {
    meta: {
      ...meta,
      canonical,
      title: meta?.title || title || defaultMeta?.title || null,
      description: meta?.description || defaultMeta?.description || null,
      images: [
        {
          url: meta?.image
            ? urlJoin(config.url, require(`../../public/${meta.image}`))
            : config.openGraphImage
        }
      ]
    },
    title,
    ...rest,
    ...(getCommonProps ? getCommonProps(commonProps) : {})
  }

  return { props }
}
