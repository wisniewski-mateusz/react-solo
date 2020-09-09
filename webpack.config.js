const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: isDev ? 'cheap-module-source-map' : false,
  entry: './src/index.js',
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: isDev
          ? ['style-loader', 'css-loader', 'sass-loader']
          : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
    ],
  },
  output: {
    filename: isDev ? '[name].bundle.js' : '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin(), new TerserPlugin()],
  },

  plugins: isDev
    ? [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
        }),
      ]
    : [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          favicon: './src/favicon.ico',
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            removeEmptyAttributes: true,
          },
        }),
        new MiniCssExtractPlugin({
          filename: '[name].[contentHash].css',
        }),
      ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
