const purifyStringForRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const test = () => console.log('test');

export {
  purifyStringForRegex,
  test,
};
