module.exports = (client, opts) => {
  if (opts.on || opts.off) {
    return client.setHotWaterSupply(opts.off ? 'off' : 'on');
  } else {
    return client.hotWaterSupply();
  }
};
