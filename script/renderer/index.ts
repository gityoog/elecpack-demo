import { ElecpackConfigFile } from "elecpack"

const config: ElecpackConfigFile = {
  base() {
    return {
      stats: 'errors-warnings',
      externals: ({ request }, callback) => {
        if (request && /^node\:/.test(request)) {
          return callback(undefined, 'commonjs2 ' + request.slice(5))
        }
        callback()
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader',
          }
        ]
      }
    }
  }
}

export default config