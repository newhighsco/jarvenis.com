import { getLayoutStaticProps } from '../layouts/utils'
import Page from './[...slug]'

export async function getStaticProps({ locale }) {
  return await getLayoutStaticProps('/404', locale)
}

export default Page
