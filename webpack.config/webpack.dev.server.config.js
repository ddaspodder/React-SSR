const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { DefinePlugin } = require("webpack");

const config = {
  mode: "development",
  entry: ["./src/server.js"],
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "server-bundle.js",
  },
  target: "node",
  externals: [nodeExternals()],
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
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
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
  watch: true,
  plugins: [
    new DefinePlugin({
      __isBrowser__: false,
    }),
    new NodemonPlugin(),
  ],
};

module.exports = config;
