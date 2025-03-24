const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const webpack = require("webpack");

// https://webpack.js.org/configuration/
module.exports = {
  // jekyll-webpack requires the webpack/main.js entrypoint. This is what the
  // npm webpack setup was using.
  // entry: {
  //   main: path.join(__dirname, '_webpack', 'main'),
  // },
  entry: "./webpack/main.js",
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name]-bundle.js',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
    ],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, // https://webpack.js.org/loaders/postcss-loader/
            },
          },
          {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: function () {
                      return [
                        require('autoprefixer'),
                        require('cssnano'),
                      ];
                  },
                },
            },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
