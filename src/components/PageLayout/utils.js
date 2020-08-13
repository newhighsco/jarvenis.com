import { sourcebitDataClient } from 'sourcebit-target-next'

export const getPageLayoutProps = async slug => {
  const {
    page,
    defaultMeta,
    ...commonProps
  } = await sourcebitDataClient.getStaticPropsForPageAtPath(slug)
  const { meta, title, ...rest } = page
  const props = {
    meta: {
      ...meta,
      slug,
      title: meta?.title || title || defaultMeta?.title,
      description: meta?.description || defaultMeta?.description
    },
    title,
    ...rest,
    ...commonProps
  }

  return { props }
}
