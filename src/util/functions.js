export const onlyRunWhen = (func, testFunc) => {
  return function (...args) {
    if (testFunc()) {
      return func(...args);
    }
  }
};
