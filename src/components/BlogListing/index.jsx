import React from 'react'
import Link from 'next/link'
import { array, bool } from 'prop-types'
import { marked } from 'marked'
import { Button, Grid, Prose, SmartLink } from '@newhighsco/chipset'
import { config } from '../../../site.config'

import styles from './BlogListing.module.scss'

const BlogListing = ({ posts = [], summary }) => {
  if (!posts?.length) return null

  return (
    <>
      <Grid className={styles.root}>
        {posts.map(({ slug, frontmatter }) => {
          const { date, title, excerpt } = frontmatter

          return (
            <Grid.Item
              key={slug}
              sizes={['tablet-one-half', 'desktop-one-quarter']}
              className={styles.item}
            >
              <div className={styles.content}>
                <time dateTime={date} className={styles.date}>
                  {new Date(date).toLocaleDateString(
                    config.lang,
                    config.dateFormat
                  )}
                </time>
                <Link href={slug} passHref>
                  <SmartLink className={styles.heading}>
                    <h2>{title}</h2>
                  </SmartLink>
                </Link>
                {excerpt && (
                  <Prose className={styles.excerpt} html={marked(excerpt)} />
                )}
              </div>
            </Grid.Item>
          )
        })}
      </Grid>
      {summary && (
        <Button.Group className={styles.buttons}>
          <Link href="/blog" passHref>
            <Button>Read the blog</Button>
          </Link>
        </Button.Group>
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
