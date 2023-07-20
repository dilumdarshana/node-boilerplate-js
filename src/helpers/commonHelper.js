const purifyStringForRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export {
  purifyStringForRegex,
}
