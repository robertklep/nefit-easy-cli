module.exports = (client, opts) => {
  var page = opts['<page>'];

  if (page === null) { // latest page
    return client.gasUsage();
  } else if (page === '?') { // query what the lastest page would be
    return client.gasUsagePage().then((page) => {
      return { value : page };
    });
  } else { // specific page
    return client.gasUsage(page);
  }
};
