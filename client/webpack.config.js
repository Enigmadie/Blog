// @ts-check

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.FRONT_ENV === 'production';
const isDevelopment = !isProduction;

const path = require('path');

console.log(isProduction)

module.exports = {
  // mode: process.env.FRONT_ENV || 'development',
  mode: 'production',
  entry: [
    `${__dirname}/src/init.tsx`,
  ],
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      slices: path.resolve(__dirname, 'src/slices/index.tsx'),
      interfaces: path.resolve(__dirname, 'src/interfaces/index.ts'),
      utils: path.resolve(__dirname, 'src/utils/index.ts'),
      pages: path.resolve(__dirname, 'src/pages/'),
    },
  },
  devtool: 'source-map',
  plugins: [
    new Webpack.DefinePlugin({
      'FRONT_ENV': JSON.stringify(process.env.FRONT_ENV),
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/images', to: './images' },
      ]},
    ),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
              sourceMap: isDevelopment,
              hmr: isDevelopment,
            },
          },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              reloadAll: true,
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: isDevelopment } },
          { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
      },
    ],
  },
};
