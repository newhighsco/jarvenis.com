import Page from './[...slug]'
import { getLayoutStaticProps } from '../layouts/utils'

export async function getStaticProps() {
  return await getLayoutStaticProps('/')
}

export default Page
