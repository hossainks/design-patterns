module.exports = {
  default: `
  --require ./support/**/*.js
  --require ./step-definations/**/*.js
  --format json:./reports/cucumber.json
  ./features/**/*.feature`,
};
