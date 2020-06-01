async function loop(items, callback) {
  for (var a = 0; a < items.length; a++) {
    // eslint-disable-next-line
    await callback(items[a]);
  }
}
module.exports = async function(items, callback) {
  await loop(Object.keys(items), async key => {
    await callback(key);
  });
};
