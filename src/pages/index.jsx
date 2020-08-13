import Page from './[...slug]'
import { getPageLayoutProps } from '../components/PageLayout/utils'

export async function getStaticProps() {
  return await getPageLayoutProps('/')
}

export default Page
