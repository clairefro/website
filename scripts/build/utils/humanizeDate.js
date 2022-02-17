function humanizeDate(yyyyMmDd) {
  const date = new Date(yyyyMmDd);
  return date.toLocaleString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

module.exports = { humanizeDate };
