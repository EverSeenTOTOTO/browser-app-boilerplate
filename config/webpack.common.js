const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { VueLoaderPlugin } = require('vue-loader');

const { isDevelopment, paths } = require('./utils');

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
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    'index.client': paths.clientEntry,
  },
  output: {
    clean: false,
    path: paths.dist,
  },
  target: 'browserslist',
  devtool: 'source-map',
  resolve: {
    alias: {
      '@': paths.src,
    },
    extensions: [
      '.vue',
      '.mjs',
      '.js',
      '.ts',
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true,
        },
      },
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
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: paths.template,
      minify: {
        removeComments: false, // do not remove placeholders
      },
    }),
  ],
};
