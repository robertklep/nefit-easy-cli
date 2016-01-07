var fs     = require('fs');
var path   = require('path');
var docopt = require('docopt').docopt;
var Client = require('nefit-easy-commands');

// Parse command line options.
var opts = docopt(fs.readFileSync(__dirname + '/docopt.txt', 'utf8'), {
  version : require('../../package').version
});

module.exports = function() {
  // Determine which command to perform.
  var cmd = process.argv.slice(2).filter((arg) => {
    return arg[0] !== '-';
  })[0];

  // Load command module.
  try {
    var mod = require('./commands/' + cmd);
  } catch(e) {
    console.error('Unknown or unimplemented command `%s`', cmd);
    process.exit(1);
  }

  // Set and check required parameters.
  var params = {
    serialNumber   : opts['--serial']     || process.env.NEFIT_SERIAL_NUMBER,
    accessKey      : opts['--access-key'] || process.env.NEFIT_ACCESS_KEY,
    password       : opts['--password']   || process.env.NEFIT_PASSWORD,
    requestTimeout : Number(opts['--timeout']) * 1000,
  };
  var error = null;
  if (! params.serialNumber) error = 'missing serial number';
  if (! params.accessKey)    error = 'missing access key';
  if (! params.password)     error = 'missing password';
  if (error) {
    console.error('Error: %s', error);
    process.exit(1);
  }

  // Instantiate client.
  const client = Client(params);

  // Perform command.
  return client.connect().then(() => mod(client, opts)).then((r) => {
    if (typeof r === 'string') {
      console.log(r);
    } else if (opts['--pretty']) {
      console.log(JSON.stringify(r, null, 2));
    } else {
      console.log('%j', r);
    }
  }).catch((err) => {
    console.error(err);
    if (opts['--verbose'] && err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  }).finally(() => {
    client.end();
  });
};
