import { sourcebitDataClient } from 'sourcebit-target-next'
import urlJoin from 'url-join'
import { config } from '../../../site.config'
import pageLayouts from '../PageLayout'

export const getPageLayoutProps = async slug => {
  const {
    page,
    defaultMeta,
    ...commonProps
  } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)
  const { meta, title, ...rest } = page
  const canonical = slug ? urlJoin(config.url, slug) : null
  const { getCommonProps } = pageLayouts[page?._layout] || pageLayouts.default
  const props = {
    meta: {
      ...meta,
      canonical,
      title: meta?.title || title || defaultMeta?.title || null,
      description: meta?.description || defaultMeta?.description || null,
      images: [
        {
          url: meta?.image
            ? urlJoin(config.url, require(`../../../public/${meta.image}`))
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
