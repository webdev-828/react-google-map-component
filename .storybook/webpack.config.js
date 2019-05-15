const path = require('path');

const sassVars = require(__dirname + '/../src/theme.js');

const sass = require( 'node-sass' );

const sassUtils = require('node-sass-utils')(sass);

module.exports = ( config, env, defaultConfig ) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.
  // Make whatever fine-grained changes you need
  // Slice out default sass rules and replace them with our own.
  sassRemovedConfig = [ ...defaultConfig.module.rules.slice( 0, -3 ), ...defaultConfig.module.rules.slice( -1 ) ] ;
  let newConfig = { ...defaultConfig };
  newConfig.module.rules = sassRemovedConfig;
  newConfig.module.rules.push({
    test: /\.scss$/,
    exclude: /\.module\.scss$/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: false,
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [ 'src' ],
          functions: {
            "get($keys)": function(keys) {
              keys = keys.getValue().split(".");
              let result = sassVars;
              let i;
              for (i = 0; i < keys.length; i++) {
                result = result[keys[i]];
              }
              result = sassUtils.castToSass(result);
              return result;
            }
          }
        },
      },
    ],
  }),
  newConfig.module.rules.push({
    test: /\.module\.scss$/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          localIdentName: '[local]__[hash:base64:5]',
        },
      },
      {
        loader: 'sass-loader',
        options: {
          includePaths: [ 'src' ],
          functions: {
            "get($keys)": function(keys) {
              keys = keys.getValue().split(".");
              let result = sassVars;
              let i;
              for (i = 0; i < keys.length; i++) {
                result = result[keys[i]];
              }
              result = sassUtils.castToSass(result);
              return result;
            }
          }
        },
      },
    ],
  }),
  newConfig.module.rules.push({
    test: /\.less$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  });
  // Return the altered config
  return newConfig;
};
