/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const isDev = process.env.NODE_ENV !== 'production';

function createPath() {
  const packageName = isDev ? 'effector-logger' : 'effector';
  return path.resolve(__dirname, `node_modules/${packageName}`);
}

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/scss/_mixins.scss";
        `,
      },
    },
  },

  chainWebpack: (config) => {
    const effector = createPath();

    config.resolve.alias.set('effector-logger', effector);
    config.plugins.delete('prefetch');
  },
};
