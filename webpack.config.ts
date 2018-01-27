// const path              = require( 'path' );
// const webpack           = require( 'webpack' );
// const merge             = require( 'webpack-merge' );
// const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
// const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
// const PurifyCSSPlugin   = require( 'purifycss-webpack-plugin' );
// const OptimizeCSSPlugin = require( 'optimize-css-assets-webpack-plugin' );
// const CleanDistPlugin   = require( 'clean-webpack-plugin' );
// const { CheckerPlugin } = require( 'awesome-typescript-loader' );
// const entryPath         = path.join( __dirname, 'src/static/index.ts' );
// const outputPath        = path.join( __dirname, 'dist' );

// console.log( 'WEBPACK GO!');

import { CheckerPlugin } from 'awesome-typescript-loader'
import * as CleanDistPlugin from 'clean-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import * as path from 'path'
import * as PurifyCSSPlugin from 'purifycss-webpack-plugin'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

const entryPath = path.join(__dirname, 'src/index.ts')
const outputPath = path.join(__dirname, 'dist')

interface Config extends webpack.Configuration {
  module: {
    rules: webpack.NewUseRule[],
  }
}

// determine build env
const TARGET_ENV = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development'

// and output files based on build env
const outputFilename = TARGET_ENV === 'production' ? '[name].[hash].js' : '[name].js'
const vendorCSSName = TARGET_ENV === 'production' ? 'vendor.[contenthash].css' : 'vendor.css'

// common webpack config
const commonConfig: Config = {
  module: {
    rules: [
        {
        test: /\.(png|jpg)$/,
        use: 'url-loader?limit=25000',
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  output: {
    filename: outputFilename,
    path: outputPath,
    publicPath: TARGET_ENV === 'development' ? 'http://localhost:8080/' : '/kurt-web/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/static/index.template.ejs',
      title: 'Kurt Lippert',
    }),
    new CheckerPlugin(),
  ],
  resolve: {
    alias: {
      libs: path.resolve(__dirname, 'libs'),
    },
    extensions: ['.js', '.ts'],
  },
}

// additional webpack settings for local env (when invoked by 'npm start')
if (TARGET_ENV === 'development') {
  // tslint:disable-next-line:no-console
  console.log('Serving locally...')

  module.exports = merge(commonConfig, {
    devServer: {
      // serve index.html in place of 404 responses
      historyApiFallback: true,

      stats: {
        assets: false,
        children: false,
        chunks: false,
        colors: true,
        errorDetails: false,
        errors: true,
        hash: false,
        modules: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        version: false,
        warnings: false,
      },
    },
    devtool: 'eval-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      entryPath,
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: 'style-loader!css-loader?sourceMap',
        },
        {
          test:   /\.(eot|ttf|woff|woff2|svg)(\?\S*)?$/,
          use: 'file-loader',
        },
      ],
    },
    // suppress perf hints in browser devtools
    performance: { hints: false },
  })
}

// additional webpack settings for prod env (when invoked via 'npm run build')
if (TARGET_ENV === 'production') {
  // tslint:disable-next-line:no-console
  console.log('Building for prod...')

  module.exports = merge(commonConfig, {
    entry: entryPath,
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader',
          }),    
        },
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          use: 'url-loader?limit=50000',
        },
      ],
    },
    plugins: [
      new CleanDistPlugin('dist', {
        root: __dirname,
      }),
      new ExtractTextPlugin(vendorCSSName),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false },
          // minimize: true,
          // mangle:  true
      }),
      new PurifyCSSPlugin({
        basePath: outputPath,
        paths: ['index.html'],
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true }},
      }),
    ],
  })
}
