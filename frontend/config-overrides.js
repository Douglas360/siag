module.exports = function override(config, env) {
    // Do stuff with the webpack config...
  
    config.resolve.fallback = {
      url: require.resolve('url'),
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      buffer: require.resolve('buffer/'),
      stream: require.resolve('stream-browserify'),
    };
  
    // Remove the ResizeObserver-related fallback modules
    delete config.resolve.fallback.ResizeObserver;
    delete config.resolve.fallback.ResizeObserverLoopErr;
  
    return config;
  }
  