var configure = require("../../EbrcWebsiteCommon/Site/site.webpack.config");
var path = require("path");

module.exports = configure({
  entry: {
    "site-client": path.join(
      __dirname,
      "/webapp/wdkCustomization/js/client/main.ts"
    ),
  },
  optimization: {
    //runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          filename: '[name].bundle.js'
        },
      },
    },
  },
  stats: {
    children: false, // hide mini css plugin verbiage
  },
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              configFile: path.join(process.cwd(), ".babelrc"),
            },
          },
          {
            loader: "ts-loader",
            options: {
              reportFiles: ["./webapp/**/*.{ts,tsx}"],
            },
          },
        ],
      },
    ],
  },
});
