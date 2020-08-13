import { sourcebitDataClient } from 'sourcebit-target-next'
import urlJoin from 'url-join'
import { config } from '../../../site.config'

export const getPageLayoutProps = async slug => {
  const {
    page,
    defaultMeta,
    ...commonProps
  } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)
  const { meta, title, ...rest } = page
  const canonical = slug ? urlJoin(config.url, slug) : null
  const props = {
    meta: {
      ...meta,
      canonical,
      title: meta?.title || title || defaultMeta?.title,
      description: meta?.description || defaultMeta?.description,
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
    ...commonProps
  }

  return { props }
}
