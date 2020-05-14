const jdown = require('jdown')
const marked = require('marked')
const { startCase } = require('lodash')
const { singular } = require('pluralize')

const name = 'sourcebit-source-markdown'

module.exports.name = name

module.exports.getSetup = ({ currentOptions, inquirer }) => {
  const questions = [
    {
      type: 'input',
      name: 'contentPath',
      message: 'Where is your markdown content stored?',
      validate: value =>
        value.length > 0 ? true : 'Content path cannot be empty',
      default: currentOptions.contentPath
    }
  ]

  return async () => {
    const answers = await inquirer.prompt(questions)

    return answers
  }
}

module.exports.getOptionsFromSetup = ({ answers }) => {
  return {
    contentPath: answers.contentPath
  }
}

module.exports.options = {
  watch: {
    default: false,
    runtimeParameter: 'watch'
  },
  contentPath: {
    default: null
  }
}

module.exports.bootstrap = async ({
  getPluginContext,
  options,
  log,
  setPluginContext
}) => {
  const context = getPluginContext()

  if (context && context.entries) {
    log(`Loaded ${context.entries.length} entries from cache`)
  } else {
    const entries = []
    const models = []
    const content = await jdown(options.contentPath, { fileInfo: true })

    Object.keys(content).map(collection => {
      const modelName = singular(collection)

      models.push({
        source: name,
        modelName,
        modelLabel: startCase(collection),
        projectId: '',
        projectEnvironment: ''
      })

      entries.push(
        ...content[collection].map(
          ({ fileInfo: { path, createdAt, modifiedAt }, ...rest }) => {
            const slugRegEx = new RegExp(
              `^collections/${collection}/(.*).html`,
              'g'
            )
            const slug = path.replace(slugRegEx, '$1')

            return {
              slug,
              type: modelName,
              createdAt,
              modifiedAt,
              ...rest
            }
          }
        )
      )
    })

    setPluginContext({
      entries,
      models
    })
  }

  if (options.watch) {
    console.error('Watch mode is not supported at this time')
  }
}

module.exports.transform = ({ data, getPluginContext }) => {
  const { entries, models } = getPluginContext()

  const normalizedEntries = entries
    .sort((a, b) => b.date - a.date)
    .map(
      ({
        slug,
        type,
        date,
        title,
        excerpt,
        contents: content,
        createdAt,
        updatedAt
      }) => {
        const model = models.find(model => model.modelName === type)

        return {
          slug,
          date,
          title,
          excerpt: excerpt ? marked(excerpt) : content.split('\n')[0],
          content,
          __metadata: {
            ...model,
            createdAt,
            updatedAt
          }
        }
      }
    )

  return {
    ...data,
    models: data.models.concat(models),
    objects: data.objects.concat(normalizedEntries)
  }
}
