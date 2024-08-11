'use strict';

/* eslint-disable no-unused-vars */
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config
  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /.cache\/admin\/src\/pages\/HomePage\/index\.js/,
      path.resolve(__dirname, "components/Home.tsx")
    )
  );
  return config;
};
