function getRemoteFunc(options, execute, methodName) {
  if (typeof methodName != 'string') {
    const result = {};
    for (const name in methodName) {
      const noptions = Object.assign({}, options);
      const methodInfo = methodName[name];
      if (typeof methodInfo == 'object') {
        Object.assign(noptions, methodInfo);
        noptions.path = noptions.path || methodInfo.url;
      } else {
        noptions.path = methodInfo;
      }

      if (noptions.baseUrl) {
        noptions.path = noptions.baseUrl + noptions.path;
      }

      noptions.method = noptions.method || 'POST';
      result[name] = execute.bind(null, noptions);
    }

    return result;
  } else {
    options = Object.assign({}, options);
    options.method = options.method || 'POST';
    options.path = methodName;
    if (options.baseUrl) {
      options.path = options.baseUrl + options.path;
    }

    return execute.bind(null, options);
  }
}

export { getRemoteFunc };
