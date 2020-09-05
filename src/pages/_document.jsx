import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from '../../site.config'

import logoUrl from '../images/logo.svg'
import headingFontUrl from '../fonts/big-noodle-titling/regular.woff2'
import alternateFontUrl from '../fonts/lemon-milk/regular.woff2'

class DocumentPage extends Document {
  render() {
    return (
      <Html lang={config.lang}>
        <Head>
          <link rel="icon" href={logoUrl} />
          <link
            rel="preload"
            href={headingFontUrl}
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href={alternateFontUrl}
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default DocumentPage
