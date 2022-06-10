import React from 'react'
import { string } from 'prop-types'
import config from '../../../site.config'

import styles from './Timestamp.module.scss'

const Timestamp = ({ date, locale }) => {
  return (
    <time dateTime={date} className={styles.root}>
      {new Date(date).toLocaleDateString(locale, config.dateFormat)}
    </time>
  )
}

Timestamp.propTypes = {
  date: string,
  locale: string
}

export default Timestamp
export { Timestamp }
