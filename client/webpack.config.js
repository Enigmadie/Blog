// @ts-check

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
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
      components: path.resolve(__dirname, 'src/components/index.tsx'),
      slices: path.resolve(__dirname, 'src/slices/index.tsx'),
      interfaces: path.resolve(__dirname, 'src/interfaces/index.ts'),
      utils: path.resolve(__dirname, 'src/utils/index.ts'),
    },
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin([
      { from: '../uploads', to: './uploads' },
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
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
