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

    try {
      const markdown = await jdown(options.contentPath, { fileInfo: true })

      Object.keys(markdown).map(key => {
        const content = markdown[key]

        const processContent = ({
          fileInfo: { path, createdAt, modifiedAt },
          _type = 'page',
          ...rest
        }) => {
          const modelName = singular(_type)
          const modelLabel = startCase(_type)

          if (!models.find(model => model.modelName === _type)) {
            models.push({
              source: name,
              modelName,
              modelLabel,
              projectId: options.contentPath,
              projectEnvironment: ''
            })
          }

          const slug = path
            .replace(/^(collections\/)?(.*).html$/, '/$2')
            .replace(/\/index$/, '')

          return {
            _type: modelName,
            slug: slug || '/',
            createdAt,
            modifiedAt,
            ...rest
          }
        }

        if (Array.isArray(content)) {
          entries.push(...content.map(child => processContent(child)))
        } else if (content.fileInfo) {
          entries.push(processContent(content))
        } else {
          entries.push(
            ...Object.keys(content).map(key => processContent(content[key]))
          )
        }
      })
    } catch (e) {
      log(e)
    }

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
        _type,
        excerpt,
        contents: content = '',
        createdAt,
        modifiedAt: updatedAt,
        ...rest
      }) => {
        const model = models.find(model => model.modelName === _type)

        return {
          ...rest,
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
