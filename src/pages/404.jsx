import Page from './[...slug]'
import { getLayoutStaticProps } from '../layouts/utils'

export async function getStaticProps() {
  return await getLayoutStaticProps('/404')
}

export default Page
