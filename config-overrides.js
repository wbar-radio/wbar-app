module.exports = function override(config, env) {
    config.devServer = {
      ...config.devServer,
      allowedHosts: "all", // Allow all hosts during development
    };
    return config;
  };
  