import { getLayoutStaticProps } from '../layouts/utils'
import Page from './[...slug]'

export async function getStaticProps({ locale }) {
  return await getLayoutStaticProps('/', locale)
}

export default Page
