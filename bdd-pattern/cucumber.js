module.exports = {
  default: `
  --require ./step-definations/**/*.js
  --format json:./reports/cucumber.json
  ./features/**/*.feature`,
};
