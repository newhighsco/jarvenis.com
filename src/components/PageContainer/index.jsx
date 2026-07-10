import { PageContainer as ThemedPageContainer } from '@newhighsco/chipset'
import { Meta } from '@newhighsco/press-start'
import { node, object } from 'prop-types'
import React from 'react'

import Footer from '../Footer'
import Header from '../Header'

const PageContainer = ({ meta, children }) => (
  <ThemedPageContainer header={<Header />} footer={<Footer />}>
    <Meta {...meta} />
    {children}
  </ThemedPageContainer>
)

PageContainer.propTypes = { meta: object, children: node }

export default PageContainer
export { PageContainer }
