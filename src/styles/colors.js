import { startCase } from 'lodash'
import colors from './_colors.module.scss'

const parsedColors = Object.keys(colors).map(key => ({
  key,
  name: startCase(key),
  values: [colors[key]]
}))

export default parsedColors
