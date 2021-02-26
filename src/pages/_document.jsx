import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { config } from '../../site.config'

import logoUrl from '../images/logo.svg'

class DocumentPage extends Document {
  render() {
    return (
      <Html lang={config.lang}>
        <Head>
          <link rel="icon" href={logoUrl} />
          <link
            rel="preload"
            href="/fonts/big-noodle-titling/regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin=""
          />
          <link
            rel="preload"
            href="/fonts/lemon-milk/regular.woff2"
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
