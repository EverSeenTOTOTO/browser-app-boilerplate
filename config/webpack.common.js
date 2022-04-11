const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const paths = {
  src: path.resolve(__dirname, '..', 'src'),
  entry: path.resolve(__dirname, '..', 'src/index.ts'),
  dist: path.resolve(__dirname, '..', 'dist'),
};

// thanks for CRA
const getStyleLoaders = () => [
  isDevelopment
    ? {
      loader: 'style-loader',
    }
    : {
      loader: MiniCssExtractPlugin.loader,
    },
  {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      sourceMap: isDevelopment,
    },
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
      },
      sourceMap: isDevelopment,
    },
  },
];

module.exports = {
  entry: paths.entry,
  output: {
    clean: true,
    filename: 'index.js',
    path: paths.dist,
  },
  target: 'web',
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': paths.src,
    },
    extensions: [
      '.mjs',
      '.js',
      '.ts',
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          ...getStyleLoaders(),
          require.resolve('sass-loader'),
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
  ],
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchFiles: [
      'package.json',
    ],
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  },
};
