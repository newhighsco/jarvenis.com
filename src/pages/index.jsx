import Page from './[...slug]'
import { getLayoutStaticProps } from '../layouts/utils'

export async function getStaticProps({ locale }) {
  return await getLayoutStaticProps('/', locale)
}

export default Page
