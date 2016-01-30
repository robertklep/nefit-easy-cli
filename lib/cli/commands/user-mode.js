module.exports = (client, opts) => {
  if (opts.manual || opts.clock) {
    return client.setUserMode(opts.manual ? 'manual' : 'clock');
  } else {
    return client.userMode();
  }
};
