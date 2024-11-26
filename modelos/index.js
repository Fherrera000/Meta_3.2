const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, './');
const models = {};

fs.readdirSync(modelsDir).forEach((file) => {
  if (file.endsWith('.js') && file !== 'index.js') {
    const controlerName = file.replace('.js', '');
    models[controlerName] = require(path.join(modelsDir, file));
  }
});

module.exports = models;