import { Button, Grid, Prose, SmartLink } from '@newhighsco/chipset'
import { marked } from 'marked'
import { array, bool, string } from 'prop-types'
import React from 'react'

import Timestamp from '../Timestamp'
import styles from './BlogListing.module.scss'

const BlogListing = ({ locale, posts = [], summary }) => {
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
                <Timestamp date={date} locale={locale} />
                <SmartLink href={slug} className={styles.heading}>
                  <h2>{title}</h2>
                </SmartLink>
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
          <Button href="/blog">Read the blog</Button>
        </Button.Group>
      )}
    </>
  )
}

BlogListing.propTypes = { locale: string, posts: array, summary: bool }

export default BlogListing
export { BlogListing }
