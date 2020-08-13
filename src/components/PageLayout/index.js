import DefaultPageLayout from './Default'
import BlogPostPageLayout from './Blog/Post'
import BlogListingPageLayout from './Blog/Listing'
import HomePageLayout from './Home'

export default {
  default: DefaultPageLayout,
  blog: BlogListingPageLayout,
  post: BlogPostPageLayout,
  home: HomePageLayout
}
