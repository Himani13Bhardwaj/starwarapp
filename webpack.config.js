const webpack = require('webpack');
const path = require('path');
module.exports = {
   mode: "production",
   devtool: "inline-source-map",
  entry: [
  './src/index.js'
  ],
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
  },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.json'],
       unsafeCache: true
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    devServer: {
        contentBase: './build',
    },
    module: {
        rules: [
        {
          test: /\.jsx$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
              presets: ["babel-preset-es2015", "babel-preset-react"]
          }
        },
        {
            test: /\.html$/,
            loader: "file?name=[name].[ext]"
        },
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ["babel-preset-es2015", "babel-preset-react"]
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file',
          query: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
            test: /\.css$/,
            loaders: [
                'style-loader',
                'css-loader'
            ]
        }
        ]
    }
};

//const path = require('path');
//const webpack = require('webpack');
//
//// Use webpack-manifest-plugin to generate asset manifests with a mapping from source files to their corresponding outputs. Webpack uses IDs instead of module names to keep generated files small in size. IDs get generated and mapped to chunk filenames before being put in the chunk manifest (which goes into our entry chunk). Unfortunately, any changes to our code update the entry chunk including the new manifest, invalidating our caching.
//const ManifestPlugin = require('webpack-manifest-plugin');
//
//// We fix this with chunk-manifest-webpack-plugin, which puts the manifest in a completely separate JSON file of its own.
//const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
//
//module.exports = {
//  mode: "production",
//  entry: {
//    main: './src/index.js'
//  },
//  output: {
//    path: path.join(__dirname, 'build'),
//    filename: '[name].[chunkhash].js',
//    chunkFilename: '[name].[chunkhash].js'
//  },
//  optimization: {
//    splitChunks: {
//      cacheGroups: {
//        vendor: {
//          chunks: "initial",
//          test: path.resolve(__dirname, "node_modules"),
//          name: "main",
//          enforce: true
//        }
//      }
//    }
//  },
//  plugins: [
//    new ManifestPlugin(),
//    new ChunkManifestPlugin({
//      filename: "chunk-manifest.json",
//      manifestVariable: "webpackManifest"
//    })
//  ]
//};
