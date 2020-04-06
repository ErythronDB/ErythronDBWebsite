var configure = require('../../EbrcWebsiteCommon/Site/site.webpack.config');
const path = require('path');

module.exports = configure({
  entry: {
    'site-legacy': [
      './webapp/wdkCustomization/js/client/main.ts',
      require.resolve('../../EbrcWebsiteCommon/Site/webapp/wdkCustomization/js/common.js')
    ],
    'site-client': './webapp/wdkCustomization/js/client/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        },
        {
          loader: 'ts-loader',
          options: {
            reportFiles: ['./webapp/**/*.{ts,tsx}']
          }
        }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
 
  resolve: {
    alias: {
      edb: "./webapp/*"
    }
  },
});
