import React from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { ThemeProvider } from '@newhighsco/chipset'
import componentTheme from '../src/theme'
import storybookTheme from './theme'

import './preview.scss'

addDecorator(storyFn => (
  <ThemeProvider theme={componentTheme}>{storyFn()}</ThemeProvider>
))

addParameters({
  options: {
    theme: storybookTheme
  }
})
