import { ElecpackBuilder } from 'elecpack'
import path from 'path'

const builder = new ElecpackBuilder({
  electronBuilder: {
    name: 'elecpack-example',
    version: '1.0.0',
    configuration: {
      asar: true,
    },
  },
  main: {
    context: path.resolve(process.cwd(), './src/main'),
    bytecode: true,
    entry: './index.ts',
  },
  preload: {
    context: path.resolve(process.cwd(), './src/preload'),
    bytecode: true,
    entry: {
      index: './index.ts'
    }
  },
  renderer: {
    context: path.resolve(process.cwd(), './src/renderer'),
    configFile: require.resolve('./renderer'),
    bytecode: true,
    entry: {
      index: {
        entry: './index.ts',
        html: {
          template: './index.html'
        }
      }
    }
  },
  files: {
    'test-worker': {
      context: path.resolve(process.cwd(), './src/workers'),
      entry: './test.ts',
      configFile: require.resolve('elecpack/def/main-worker')
    }
  }
})

const action = process.argv[2]
if (action === 'dev') {
  builder.startDev()
} else if (action === 'build') {
  builder.startBuild()
} else {
  console.error('unknown action', action)
}

process.on('unhandledRejection', (error) => {
  console.error(error)
  process.exit(1)
})