module.exports = function override(config, env) {
  config.devServer = {
    ...config.devServer,
    historyApiFallback: true,
  };
  return config;
};
