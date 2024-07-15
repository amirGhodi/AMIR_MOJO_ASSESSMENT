const fs = require('fs');
const path = require('path');

const sslConfig = {
  key: fs.readFileSync(path.join(__dirname, '../ssl/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../ssl/server.cert'))
};

module.exports = sslConfig;
