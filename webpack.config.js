const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env = {}) => {
  const isProd = env.production === true || env.env === 'production';

  return {
    mode: isProd ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      // Use [name] for dev so runtime and main don't collide on a fixed filename
      filename: isProd ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
      assetModuleFilename: 'static/media/[name].[hash][ext][query]',
      clean: true,
      publicPath: '/',
    },
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      alias: {
        src: path.resolve(__dirname, 'src'),
        '@': path.resolve(__dirname, 'src')
      },
    },
    module: {
      rules: [
        {
          test: /\.([jt])sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i,
          type: 'asset',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      }),
      new ForkTsCheckerWebpackPlugin({ async: !isProd }),
      new MiniCssExtractPlugin({ filename: isProd ? 'static/css/[name].[contenthash:8].css' : 'static/css/bundle.css' }),
    ],
    devServer: {
      static: { directory: path.resolve(__dirname, 'public') },
      historyApiFallback: true,
      port: 3000,
      open: false,
      hot: true,
      compress: true,
    },
    optimization: {
      splitChunks: { chunks: 'all' },
      runtimeChunk: 'single',
    },
  };
};
