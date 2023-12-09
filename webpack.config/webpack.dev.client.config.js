const webpack = require("webpack");
const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const config = {
  mode: "development",
  entry: [
    // "webpack-hot-middleware/client",
    "./src/client.js",
  ],
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "client-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
              ],
              // plugins: ["react-refresh/babel"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          //style loader only works in client side
          // {
          //   loader: "style-loader",
          // },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[contenthash].[ext]",
              outputPath: "images",
              publicPath: "",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      __isBrowser__: true,
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./template/index.html",
      filename: "template.html",
    }),

    //webpack hot middleware and fast refresh dosent work with server refresh
    // new webpack.HotModuleReplacementPlugin(),
    // new ReactRefreshWebpackPlugin(),
  ],
};

module.exports = config;
