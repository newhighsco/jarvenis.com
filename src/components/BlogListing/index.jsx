import React from 'react'
import Link from 'next/link'
import { array, bool } from 'prop-types'
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  SmartLink
} from '@newhighsco/chipset'
import { config } from '../../../site.config'

import styles from './styles.module.scss'

const BlogListing = ({ posts = [], summary }) => {
  if (!posts?.length) return null

  return (
    <>
      <Grid className={styles.wrapper}>
        {posts.map(({ slug, date, title, excerpt }) => (
          <GridItem
            key={slug}
            sizes={['tablet-one-half', 'desktop-one-quarter']}
            className={styles.item}
          >
            <Link href="/blog/[...slug]" as={`/blog/${slug}`} passHref>
              <SmartLink>
                <div className={styles.content}>
                  <time dateTime={date} className={styles.date}>
                    {new Date(date).toLocaleDateString(config.lang)}
                  </time>
                  <h2 className={styles.title}>{title}</h2>
                  {excerpt && (
                    <div
                      className={styles.excerpt}
                      dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                  )}
                  <div>Read more</div>
                </div>
              </SmartLink>
            </Link>
          </GridItem>
        ))}
      </Grid>
      {summary && (
        <ButtonGroup className={styles.buttons}>
          <Link href="/blog" passHref>
            <Button>Read the blog</Button>
          </Link>
        </ButtonGroup>
      )}
    </>
  )
}

BlogListing.propTypes = {
  posts: array,
  summary: bool
}

export default BlogListing
export { BlogListing }
