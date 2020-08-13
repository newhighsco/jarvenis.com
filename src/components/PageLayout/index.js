import * as DefaultPageLayout from './Default'
import * as BlogPostPageLayout from './Blog/Post'
import * as BlogListingPageLayout from './Blog/Listing'
import * as HomePageLayout from './Home'

export default {
  default: DefaultPageLayout,
  blog: BlogListingPageLayout,
  post: BlogPostPageLayout,
  home: HomePageLayout
}
