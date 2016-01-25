module.exports = (client, opts) => {
  if (opts.temperature) {
    return client.setTemperature(opts['<value>']);
  }
  if (opts['active-program']) {
    return client.put('/ecus/rrc/userprogram/activeprogram', {
      value : Number(opts['<value>'])
    });
  }
  throw new Error('UNKNOWN_PARAMETER');
};
