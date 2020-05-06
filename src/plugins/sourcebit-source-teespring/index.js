const fetch = require('node-fetch')
const urlJoin = require('url-join')

const BASE_URL = 'https://teespring.com/'
const API_BASE_URL = `${BASE_URL}api/stores/`
const STOREFRONT_BASE_URL = `${BASE_URL}stores/`
const name = 'sourcebit-source-teespring'

module.exports.name = name

module.exports.getSetup = ({ currentOptions, inquirer, ora }) => {
  const questions = [
    {
      type: 'input',
      name: 'permaLink',
      message: 'What is your Teespring storefront URL permalink?',
      validate: value =>
        value.length > 0 ? true : 'The URL permalink cannot be empty',
      default: currentOptions.permaLink
    }
  ]

  return async () => {
    const answers = await inquirer.prompt(questions)
    const spinner = ora(
      `Looking for Teespring storefront ${urlJoin(
        STOREFRONT_BASE_URL,
        answers.permaLink
      )}`
    ).start()

    try {
      await fetch(urlJoin(API_BASE_URL, answers.permaLink))
    } catch (error) {
      spinner.fail()

      return module.exports.getSetup({
        currentOptions,
        inquirer,
        ora
      })()
    }

    spinner.succeed()

    return answers
  }
}

module.exports.getOptionsFromSetup = ({ answers }) => {
  return {
    permaLink: answers.permaLink
  }
}

module.exports.options = {
  watch: {
    default: false,
    runtimeParameter: 'watch'
  },
  permaLink: {
    default: null
  }
}

module.exports.bootstrap = async ({
  debug,
  getPluginContext,
  options,
  log,
  setPluginContext
}) => {
  const context = getPluginContext()

  if (context && context.entries) {
    log(`Loaded ${context.entries.length} entries from cache`)
  } else {
    const { products: entries } = await fetch(
      urlJoin(API_BASE_URL, options.permaLink, 'store_products')
    ).then(response => response.json())

    log(`Loaded ${entries.length} entries`)
    debug('Initial entries: %O', entries)

    setPluginContext({
      entries
    })
  }

  // if (options.watch) {
  //   setInterval(() => {
  //     const { entries } = getPluginContext()
  //     const entryIndex = Math.floor(Math.random() * entries.length)

  //     entries[entryIndex].body = entries[entryIndex].body + ' (updated)'

  //     log(`Updated entry #${entryIndex}`)
  //     debug('Updated entries: %O', entries)

  //     // 👉 We take the new entries array and update the plugin context.
  //     setPluginContext({ entries })

  //     // 👉 After updating the context, we must communicate the change and
  //     // the need for all plugins to re-run in order to act on the new data.
  //     refresh()
  //   }, 3000)
  // }
}

module.exports.transform = ({
  data,
  debug,
  getPluginContext,
  log,
  options
}) => {
  const { entries } = getPluginContext()

  const model = {
    source: name,
    modelName: 'product',
    modelLabel: 'Teespring Products',
    projectId: options.permaLink,
    projectEnvironment: ''
  }

  const normalizedEntries = entries.map(
    ({
      id,
      url: slug,
      name: heading,
      product_name: kicker,
      image_url: image,
      price
    }) => {
      return {
        id,
        slug: slug.replace(/([^?]+)\?.*/g, '$1'),
        href: urlJoin(BASE_URL, slug),
        heading,
        kicker,
        image,
        price,
        __metadata: model
      }
    }
  )

  return {
    ...data,
    models: data.models.concat(model),
    objects: data.objects.concat(normalizedEntries)
  }
}
