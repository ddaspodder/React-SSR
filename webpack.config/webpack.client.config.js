const path = require("path");
const { DefinePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: "production",
  entry: ["./src/client.js"],
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
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
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
  ],
};

module.exports = config;
