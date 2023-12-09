const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { DefinePlugin } = require("webpack");

const config = {
  mode: "production",
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
  plugins: [
    new DefinePlugin({
      __isBrowser__: false,
    }),
  ],
};

module.exports = config;
