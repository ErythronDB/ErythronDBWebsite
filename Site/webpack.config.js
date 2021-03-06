var configure = require("../../EbrcWebsiteCommon/Site/site.webpack.config");
var path = require("path");
module.exports = configure({
  entry: {
    "site-legacy": path.join(
      __dirname,
      "/webapp/wdkCustomization/js/client/main.ts"
    ),
    "site-client": path.join(
      __dirname,
      "/webapp/wdkCustomization/js/client/main.ts"
    )
  },
  stats: {
    children: false // hide mini css plugin verbiage
  },
  devtool: 'inline-source-map',
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
            }
          },
          {
            loader: "ts-loader",
            options: {
              reportFiles: ["./webapp/**/*.{ts,tsx}"]
            }
          }
        ]
      }
    ]
  }
});