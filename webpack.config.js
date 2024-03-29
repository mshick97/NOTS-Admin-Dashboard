const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

module.exports = {
  // Enters into first index.js to bundle
  entry: path.join(__dirname, './client/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'functions/build'),
    filename: './js/bundle.js',
  },
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader?name=[name].[ext]'],
      },
      {
        test: /.(css|scss)$/,
        /* /\.s[ac]ss$/i */
        exclude: /(node_modules)/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html',
      favicon: './client/images/favicon.ico',
    }),
    new SourceMapDevToolPlugin({
      // filename: '[file].js',
      // sourceMapFilename: '[name].js.map',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'functions/build'),
    },
    port: 8080,
    compress: true,
    hot: true,
    proxy: {
      '/**': 'http://localhost:3000',
    },
    watchFiles: ['client/**'],
  },
};
