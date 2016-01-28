module.exports = (client, opts) => {
  var page = opts['<page>'];

  if (page === '?') { // query what the lastest page would be
    return client.gasUsagePage().then((page) => {
      return { value : page };
    });
  } else {
    return client.gasUsage(page).map((d) => {
      d.date = new Date(d.date).toDateString();
      return d;
    });
  }
};
